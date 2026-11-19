#!/usr/bin/env python3
"""Convert a course-manual PDF into web sections for the online reader.

The manual is shown on the site as text (no PDF download). Content is written to
api/_content/ so it ships only inside the server function and is sent to a
browser only when the student is allowed to read that section.

Usage (needs: pip install pdfplumber):
    python3 scripts/build-manual.py Stage-1-Foundation.pdf stage-1

Writes:
    api/_content/manual-<stage>.ts   section HTML (server only)
    src/data/manual-<stage>.ts       table of contents (ids + titles, public)
"""
import html
import json
import re
import sys
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parent.parent
FOOTER_TOP = 795
CALLOUT_FILL = (0.956862745, 0.972549019, 0.960784313)
HEADER_FILL = (0.066666666, 0.066666666, 0.066666666)
ROW_FILL = (0.96862745, 0.96862745, 0.96862745)
SEP_FILL = (0.886274509, 0.886274509, 0.886274509)
GREEN = (0.043137254, 0.419607843, 0.196078431)


def close(a, b, tol=0.01):
    return a is not None and b is not None and len(a) == len(b) and all(abs(x - y) < tol for x, y in zip(a, b))


def is_bold(c):
    return "Bold" in c["fontname"]


def is_italic(c):
    return "Italic" in c["fontname"] or "Oblique" in c["fontname"]


def is_green(c):
    return close(tuple(c.get("non_stroking_color") or ()), GREEN)


def spans_html(chars):
    """Chars of one line (sorted by x) -> inline HTML with <strong>/<em>."""
    out, cur_style, buf = [], None, []

    def flush():
        if not buf:
            return
        text = html.escape("".join(buf))
        b, i = cur_style
        if i:
            text = f"<em>{text}</em>"
        if b:
            text = f"<strong>{text}</strong>"
        out.append(text)

    for c in chars:
        t = " " if c["text"] in ("\t", " ") else c["text"]
        style = (is_bold(c), is_italic(c)) if t.strip() else cur_style or (False, False)
        if style != cur_style:
            flush()
            buf, cur_style = [], style
        buf.append(t)
    flush()
    s = "".join(out)
    s = re.sub(r"\s+", " ", s)
    # Move spaces outside tags: "<strong>word </strong>" -> "<strong>word</strong> "
    s = re.sub(r" (</(?:strong|em)>)", r"\1 ", s)
    s = re.sub(r"(<(?:strong|em)>) ", r" \1", s)
    s = s.replace("</strong><strong>", "").replace("</em><em>", "")
    return re.sub(r"\s+", " ", s).strip()


def group_lines(chars):
    """Group chars into lines by vertical position."""
    lines = []
    for c in sorted(chars, key=lambda c: (round(c["top"], 1), c["x0"])):
        if lines and abs(c["top"] - lines[-1]["top"]) < 2.5:
            lines[-1]["chars"].append(c)
        else:
            lines.append({"top": c["top"], "chars": [c]})
    for ln in lines:
        ln["chars"].sort(key=lambda c: c["x0"])
        visible = [c for c in ln["chars"] if c["text"].strip()]
        first = visible[0] if visible else ln["chars"][0]
        ln["x0"] = first["x0"]
        ln["size"] = max(round(c["size"], 1) for c in visible) if visible else 0
        ln["bold"] = all(is_bold(c) for c in visible) if visible else False
        ln["green"] = bool(visible) and all(is_green(c) for c in visible)
        ln["text"] = re.sub(r"\s+", " ", "".join(" " if c["text"] == "\t" else c["text"] for c in ln["chars"])).strip()
        ln["html"] = spans_html(ln["chars"])
    return [ln for ln in lines if ln["text"]]


def inside(c, box):
    x0, top, x1, bottom = box
    mx, my = (c["x0"] + c["x1"]) / 2, (c["top"] + c["bottom"]) / 2
    return x0 - 1 <= mx <= x1 + 1 and top - 1 <= my <= bottom + 1


def find_tables(page, text_chars):
    cells = [r for r in page.rects
             if 12 <= r["height"] <= 120 and r["width"] > 15 and r["width"] < 500
             and (close(r["non_stroking_color"], HEADER_FILL) or close(r["non_stroking_color"], ROW_FILL))]
    seps = [r for r in page.rects if r["height"] <= 1.5 and close(r["non_stroking_color"], SEP_FILL)]
    if not cells and not seps:
        return []
    ys = sorted({round(r["top"], 1) for r in cells} | {round(r["bottom"], 1) for r in cells}
                | {round(r["top"], 1) for r in seps})
    merged = []
    for y in ys:
        if not merged or y - merged[-1] > 2:
            merged.append(y)
    # Split into separate tables wherever non-table text sits between boundaries
    non_table = [c for c in text_chars if c["text"].strip() and round(c["size"], 1) not in (6.9, 6.3)]
    header_ys = [round(r["top"], 1) for r in cells if close(r["non_stroking_color"], HEADER_FILL)]
    is_header = lambda y: any(abs(y - h) < 2 for h in header_ys)
    groups, cur = [], [merged[0]]
    for y in merged[1:]:
        between = any(cur[-1] + 1 < c["top"] < y - 1 for c in non_table)
        new_header = is_header(y) and any(is_header(v) for v in cur)
        if between or new_header or y - cur[-1] > 120:
            groups.append(cur)
            cur = [y]
        else:
            cur.append(y)
    groups.append(cur)

    tables = []
    for g in groups:
        if len(g) < 2:
            continue
        top, bottom = g[0], g[-1]
        in_band = [r for r in cells if r["top"] >= top - 2 and r["bottom"] <= bottom + 2]
        if not in_band:
            in_band_seps = [r for r in seps if top - 2 <= r["top"] <= bottom + 2]
            if not in_band_seps:
                continue
            xs = sorted({round(r["x0"]) for r in in_band_seps})
            x_right = max(r["x1"] for r in in_band_seps)
        else:
            xs = sorted({round(r["x0"]) for r in in_band})
            x_right = max(r["x1"] for r in in_band)
        cols = [x for i, x in enumerate(xs) if i == 0 or x - xs[i - 1] > 5]
        edges = cols + [x_right]
        header_tops = {round(r["top"], 1) for r in in_band if close(r["non_stroking_color"], HEADER_FILL)}
        rows = []
        for y0, y1 in zip(g, g[1:]):
            if y1 - y0 < 6:
                continue
            row = []
            for x0, x1 in zip(edges, edges[1:]):
                cs = [c for c in text_chars if inside(c, (x0, y0, x1, y1))]
                lines = group_lines(cs)
                row.append(" ".join(ln["html"] for ln in lines))
            head = any(abs(y0 - h) < 2 for h in header_tops)
            if any(row) or head:
                rows.append({"head": head, "cells": row})
        if rows and all(r["head"] for r in rows):
            rows.append({"head": False, "cells": [""] * (len(edges) - 1)})  # blank fill-in row
        if rows:
            tables.append({"box": (edges[0], top, x_right, bottom), "rows": rows})
    return tables


def page_items(page):
    chars = [c for c in page.chars if c["top"] < FOOTER_TOP]
    callout_boxes = [(r["x0"], r["top"], r["x1"], r["bottom"]) for r in page.rects
                     if close(r["non_stroking_color"], CALLOUT_FILL) and r["width"] > 200]
    in_callout = [c for c in chars if any(inside(c, b) for b in callout_boxes)]
    rest = [c for c in chars if not any(inside(c, b) for b in callout_boxes)]
    tables = find_tables(page, rest)
    flow = [c for c in rest if not any(inside(c, t["box"]) for t in tables)]
    bullets = [(cv["x0"], cv["top"]) for cv in page.curves if cv["x0"] < 75 and cv["width"] < 6]

    items = []
    for ln in group_lines(flow):
        ln["bullet"] = any(abs(by - ln["top"]) < 7 and bx < ln["x0"] for bx, by in bullets)
        items.append(("line", ln["top"], ln))
    for t in tables:
        items.append(("table", t["box"][1], t))
    for b in callout_boxes:
        lines = group_lines([c for c in in_callout if inside(c, b)])
        for ln in lines:
            ln["bullet"] = any(abs(by - ln["top"]) < 7 and bx < ln["x0"] for bx, by in bullets)
        items.append(("callout", b[1], {"lines": lines, "top_of_page": b[1] < 62}))
    items.sort(key=lambda i: i[1])
    return items


ENDS_SENTENCE = tuple('.!?:"”)')


def lines_to_blocks(lines, blocks=None, continuing=False):
    """Body lines -> paragraphs / lists / headings."""
    blocks = blocks if blocks is not None else []
    prev = None
    for ln in lines:
        text, h = ln["text"], ln["html"]
        size = ln["size"]
        gap = ln["top"] - prev["top"] if prev else None
        if size > 14:
            if blocks and blocks[-1]["t"] == "h2" and gap is not None and gap < 26:
                blocks[-1]["text"] += " " + text
            else:
                blocks.append({"t": "h2", "text": text})
        elif 10 < size < 12:
            blocks.append({"t": "h3", "text": text})
        elif 8.4 < size < 9 and ln["bold"]:
            blocks.append({"t": "rule" if ln["green"] else "h4", "html": h})
        else:
            m = re.match(r"^(\d+)\.\s+(.*)$", text)
            last = blocks[-1] if blocks else None
            if ln["bullet"]:
                if last and last["t"] == "ul" and gap is not None and gap < 22:
                    last["items"].append(h)
                else:
                    blocks.append({"t": "ul", "items": [h]})
            elif m and ln["x0"] < 58 and (not last or last["t"] != "p" or gap is None or gap > 13.5 or last["html"].endswith(ENDS_SENTENCE)):
                item = re.sub(r"^\s*(<strong>)?\s*\d+\.\s*(</strong>)?\s*", "", h, count=1)
                if last and last["t"] == "ol" and (gap is None or gap < 24):
                    last["items"].append(item)
                else:
                    blocks.append({"t": "ol", "start": int(m.group(1)), "items": [item]})
            elif last and last["t"] == "ol" and gap is not None and gap < 14.5:
                last["items"][-1] += " " + h
            elif last and last["t"] in ("ul", "ol") and ln["x0"] > 58 and (gap is None or gap < 16):
                last["items"][-1] += " " + h
            elif last and last["t"] == "p" and ((gap is not None and gap < 14.5) or (gap is None and continuing and not last["html"].endswith(ENDS_SENTENCE))):
                last["html"] += " " + h
            elif last and last["t"] in ("ul", "ol") and gap is None and continuing and ln["x0"] > 58:
                last["items"][-1] += " " + h
            else:
                blocks.append({"t": "p", "html": h})
        prev = ln
    return blocks


def callout_blocks(lines):
    label = None
    if lines and lines[0]["bold"] and lines[0]["green"] and lines[0]["text"].isupper() and len(lines[0]["text"]) < 40:
        label = lines[0]["text"]
        lines = lines[1:]
    if lines and all(8.4 < ln["size"] < 9 for ln in lines):
        return {"t": "rule", "html": " ".join(ln["html"] for ln in lines)}
    body = []
    prev = None
    for ln in lines:
        gap = ln["top"] - prev["top"] if prev else None
        if ln["bullet"]:
            if body and body[-1]["t"] == "ul":
                body[-1]["items"].append(ln["html"])
            else:
                body.append({"t": "ul", "items": [ln["html"]]})
        elif body and gap is not None and gap < 12.5:
            if body[-1]["t"] == "ul":
                body[-1]["items"][-1] += " " + ln["html"]
            else:
                body[-1]["html"] += " " + ln["html"]
        else:
            body.append({"t": "p", "html": ln["html"]})
        prev = ln
    return {"t": "callout", "label": label, "blocks": body}


def merge_lists(blocks):
    out = []
    for b in blocks:
        if out and b["t"] == "ul" and out[-1]["t"] == "ul":
            out[-1]["items"].extend(b["items"])
        else:
            out.append(b)
    return out


def render(blocks):
    blocks = merge_lists(blocks)
    out = []
    for b in blocks:
        t = b["t"]
        if t == "p":
            out.append(f"<p>{b['html']}</p>")
        elif t == "h4":
            out.append(f"<h4>{b['html']}</h4>")
        elif t == "rule":
            out.append(f'<p class="rule">{b["html"]}</p>')
        elif t == "ul":
            opts = all(re.match(r"^(<strong>)?[A-F]\)", i) for i in b["items"])
            cls = ' class="options"' if opts else ""
            out.append(f"<ul{cls}>" + "".join(f"<li>{i}</li>" for i in b["items"]) + "</ul>")
        elif t == "ol":
            start = f' start="{b["start"]}"' if b.get("start", 1) != 1 else ""
            out.append(f"<ol{start}>" + "".join(f"<li>{i}</li>" for i in b["items"]) + "</ol>")
        elif t == "callout":
            label = f'<p class="callout-label">{html.escape(b["label"])}</p>' if b["label"] else ""
            kind = re.sub(r"[^a-z]+", "-", (b["label"] or "note").lower()).strip("-")
            out.append(f'<aside class="callout callout-{kind}">{label}{render(b["blocks"])}</aside>')
        elif t == "table":
            rows = b["rows"]
            head = [r for r in rows if r["head"]][:1]
            body = [r for r in rows if not r["head"]]
            thead = "<thead><tr>" + "".join(f"<th>{c}</th>" for c in head[0]["cells"]) + "</tr></thead>" if head else ""
            tbody = "<tbody>" + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r["cells"]) + "</tr>" for r in body) + "</tbody>"
            out.append(f'<div class="table-wrap"><table>{thead}{tbody}</table></div>')
    return "".join(out)


def slug_title(s):
    return re.sub(r"\s+", " ", s).strip()


def main(pdf_path, stage):
    pdf = pdfplumber.open(pdf_path)
    # Content starts at the WELCOME heading (skip cover + table of contents)
    start = next(i for i, p in enumerate(pdf.pages) if re.search(r"^\s*WELCOME\s*$", p.extract_text() or "", re.M))
    blocks = []
    for pi in range(start, len(pdf.pages)):
        items = page_items(pdf.pages[pi])
        run, first = [], True
        for kind, _, obj in items:
            if kind == "line":
                run.append(obj)
                continue
            if run:
                lines_to_blocks(run, blocks, continuing=first)
                run = []
            first = False
            if kind == "table":
                if blocks and blocks[-1]["t"] == "table" and not any(r["head"] for r in obj["rows"]) and obj["box"][1] < 70:
                    blocks[-1]["rows"].extend(obj["rows"])
                else:
                    blocks.append({"t": "table", "rows": obj["rows"]})
            else:
                cb = callout_blocks(obj["lines"])
                if cb["t"] == "callout" and obj["top_of_page"] and blocks and blocks[-1]["t"] == "callout" and not cb["label"]:
                    blocks[-1]["blocks"].extend(cb["blocks"])
                else:
                    blocks.append(cb)
        if run:
            lines_to_blocks(run, blocks, continuing=first)

    # Split into sections at h2 (module / appendix) and h3 (lesson) headings
    # Proper-case titles from the PDF's own table of contents
    toc_text = "\n".join((pdf.pages[i].extract_text() or "") for i in range(start))
    toc_titles = {}
    for line in toc_text.splitlines():
        line = line.strip()
        mm = re.match(r"^Module (\d+\.\d+)\s*[—-]\s*(.+)$", line)
        ll = re.match(r"^(\d+\.\d+\.\d+)\s+(.+)$", line)
        if mm:
            toc_titles[mm.group(1)] = mm.group(2).strip()
        elif ll:
            toc_titles[ll.group(1)] = ll.group(2).strip()

    sections, module, pending_intro = [], None, []
    for b in blocks:
        if b["t"] == "h2":
            text = slug_title(b["text"])
            m = re.match(r"MODULE (\d+\.\d+)\s*[—-]\s*(.*)", text, re.I)
            a = re.match(r"APPENDIX ([A-Z])\s*[—-]\s*(.*)", text, re.I)
            if m:
                module = {"id": m.group(1), "title": toc_titles.get(m.group(1), m.group(2).title())}
                pending_intro = []
                continue
            title = text.title() if text.isupper() else text
            sid = f"appendix-{a.group(1).lower()}" if a else re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
            module = {"id": "extra", "title": "Appendices & Checkpoint"}
            sections.append({"id": sid, "title": title, "module": module, "blocks": []})
            continue
        if b["t"] == "h3":
            text = slug_title(b["text"])
            m = re.match(r"(\d+\.\d+\.\d+)\s+(.*)", text)
            q = re.match(r"Module (\d+\.\d+)\s*[—-]\s*Check Your Understanding", text, re.I)
            pa = re.match(r"Module (\d+\.\d+)\s*[—-]\s*Practical (Assignment|Assessment)", text, re.I)
            if m:
                sid, title = m.group(1), toc_titles.get(m.group(1), m.group(2))
            elif pa:
                sid, title = f"{pa.group(1)}-practical", f"Practical {pa.group(2).title()}"
            elif q:
                sid, title = f"{q.group(1)}-quiz", "Check Your Understanding"
            elif text.upper() == "WELCOME":
                sid, title, module = "welcome", "Welcome", {"id": "1.0", "title": "Welcome"}
            elif sections and sections[-1]["module"]["id"] == "extra":
                # sub-heading inside an appendix / checkpoint
                sections[-1]["blocks"].append({"t": "h4", "html": html.escape(text)})
                continue
            else:
                sid, title = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-"), text
            sections.append({"id": sid, "title": title, "module": module, "blocks": list(pending_intro)})
            pending_intro = []
            continue
        if sections and (module is None or sections[-1]["module"] is module):
            sections[-1]["blocks"].append(b)
        else:
            pending_intro.append(b)

    out_sections = [
        {"id": s["id"], "title": s["title"], "moduleId": s["module"]["id"], "moduleTitle": s["module"]["title"], "html": render(s["blocks"])}
        for s in sections
    ]
    var = re.sub(r"[^a-zA-Z0-9]", "", stage.title())
    server = ROOT / "api" / "_content" / f"manual-{stage}.ts"
    server.parent.mkdir(parents=True, exist_ok=True)
    server.write_text(
        "// Generated by scripts/build-manual.py from the course manual PDF. Do not edit by hand.\n"
        "// Server-only: section text is sent to students who own the stage.\n"
        f"export const manual{var}: Record<string, string> = {json.dumps({s['id']: s['html'] for s in out_sections}, ensure_ascii=False, indent=0)};\n"
    )
    toc = [{"id": s["id"], "title": s["title"], "moduleId": s["moduleId"], "moduleTitle": s["moduleTitle"]} for s in out_sections]
    client = ROOT / "src" / "data" / f"manual-{stage}.ts"
    client.write_text(
        "// Generated by scripts/build-manual.py. Table of contents only (titles), safe to ship to browsers.\n"
        "import type { ManualSection } from \"./manual.js\";\n\n"
        f"export const manual{var}Toc: ManualSection[] = {json.dumps(toc, ensure_ascii=False, indent=2)};\n"
    )
    print(f"{len(out_sections)} sections → {server.relative_to(ROOT)}, {client.relative_to(ROOT)}")
    for s in out_sections:
        print(f"  {s['id']:<12} {len(s['html']):>6}  {s['moduleTitle'][:28]:<28} {s['title']}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
