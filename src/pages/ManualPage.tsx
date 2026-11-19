// /manual?stage=stage-1&s=1.1.1 — the course manual, read online (no PDF download).
// Styled after the printed Stage 1 manual: white page, green accent, boxed tips,
// black-header tables.
import { useEffect, useState, type SyntheticEvent } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight, List, Lock } from "lucide-react";
import { Container } from "../components/ui";
import { Link, useRouter } from "../router";
import { COURSE, stageById, type StageId } from "../data/course";
import { FREE_MANUAL_SECTIONS, manualHref, manuals, type ManualSection } from "../data/manual";
import { fetchMyStages, lmsApi, useSession } from "../lms/session";
import { ButtonTo, Muted } from "../lms/ui";

const GREEN = "#1DB954";
const GREEN_INK = "#0B6B32";
const TINT = "#F4F8F5";

const Wrap = styled.div`
  padding: 88px 0 48px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 120px;
  }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-size: 0.88rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

/** The "printed page". */
const Paper = styled.article`
  background: #fff;
  color: #1c1c1c;
  border-radius: 10px;
  padding: 28px 20px 22px;
  max-width: 820px;
  margin: 0 auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  font-family: Georgia, "DejaVu Serif", "Times New Roman", serif;
  font-size: 1.02rem;
  line-height: 1.72;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 52px 60px 34px;
  }
  @media print {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  .sans {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: #111;
  }
  h2.module {
    font-size: clamp(1.25rem, 4.6vw, 1.7rem);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    line-height: 1.25;
    padding-bottom: 12px;
    border-bottom: 3px solid ${GREEN};
    margin-bottom: 26px;
  }
  .kicker {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8a8a8a;
    margin-bottom: 8px;
  }
  h1.section {
    font-size: clamp(1.25rem, 4.4vw, 1.55rem);
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 18px;
  }
  h1.section span {
    color: ${GREEN_INK};
  }
  h4 {
    font-size: 1.02rem;
    font-weight: 800;
    margin: 26px 0 10px;
  }
  p {
    margin: 0 0 16px;
  }
  strong {
    color: #000;
  }
  ul,
  ol {
    margin: 0 0 18px;
    padding-left: 1.4em;
  }
  li {
    margin-bottom: 8px;
    padding-left: 2px;
  }
  ul li::marker {
    color: ${GREEN};
  }
  ol li::marker {
    font-weight: 700;
    color: ${GREEN_INK};
  }
  ul.options {
    list-style: none;
    padding-left: 1.4em;
    margin-top: -6px;
  }
  ul.options li {
    margin-bottom: 4px;
    color: #333;
  }

  .callout {
    background: ${TINT};
    border-left: 3px solid ${GREEN};
    padding: 14px 16px 4px;
    margin: 22px 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 0.92rem;
    line-height: 1.65;
  }
  .callout p {
    margin-bottom: 10px;
  }
  .callout-label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: ${GREEN_INK};
    margin-bottom: 6px !important;
  }
  .callout strong {
    color: ${GREEN_INK};
  }
  p.rule {
    background: ${TINT};
    border-left: 3px solid ${GREEN};
    text-align: center;
    padding: 14px 16px;
    margin: 22px 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 1.02rem;
  }
  p.rule strong {
    color: ${GREEN_INK};
  }

  .table-wrap {
    overflow-x: auto;
    margin: 18px 0 22px;
    -webkit-overflow-scrolling: touch;
  }
  table {
    width: 100%;
    min-width: 460px;
    border-collapse: collapse;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 0.84rem;
    line-height: 1.45;
  }
  th {
    background: #111;
    color: #fff;
    text-align: left;
    font-size: 0.74rem;
    letter-spacing: 0.03em;
    padding: 9px 10px;
  }
  th strong {
    color: #fff;
  }
  td {
    padding: 9px 10px;
    border-bottom: 1px solid #e2e2e2;
    vertical-align: top;
    min-width: 40px;
  }
  tbody tr:nth-child(even) td {
    background: #f7f7f7;
  }
`;

const Footer = styled.footer`
  margin-top: 34px;
  padding-top: 10px;
  border-top: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: #8a8a8a;
  text-transform: uppercase;
`;

const Pager = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 820px;
  margin: 16px auto 0;
  a {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 64px;
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 0.85rem;
    line-height: 1.35;
  }
  a:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
  small {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .next {
    grid-column: 2;
    text-align: right;
    align-items: flex-end;
  }
`;

// ─── Cover + table of contents ───────────────────────────────────────────────
const Cover = styled.div`
  padding-bottom: 28px;
  margin-bottom: 26px;
  border-bottom: 1px solid #d8d8d8;
  .bar {
    width: 72px;
    height: 6px;
    background: ${GREEN};
    margin-bottom: 34px;
  }
  h1 {
    font-size: clamp(2.2rem, 10vw, 3.4rem);
    font-weight: 900;
    letter-spacing: 0.01em;
    line-height: 1;
    margin: 6px 0 12px;
  }
  .sub {
    font-family: inherit;
    color: #444;
    font-size: 1.05rem;
  }
`;

const Toc = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  h2 {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  section {
    margin-bottom: 18px;
  }
  h3 {
    font-size: 0.95rem;
    font-weight: 800;
    margin-bottom: 4px;
  }
  ol {
    list-style: none;
    padding: 0 0 0 12px;
    margin: 0;
  }
  li {
    margin: 0;
  }
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    color: #333;
    font-size: 0.9rem;
    border-bottom: 1px solid #f0f0f0;
  }
  a:hover {
    color: ${GREEN_INK};
  }
  .n {
    color: #8a8a8a;
    min-width: 3.4em;
    font-variant-numeric: tabular-nums;
  }
  .t {
    flex: 1;
  }
  svg {
    color: #aaa;
    flex: none;
  }
  .free {
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: ${GREEN_INK};
  }
`;

const LockBox = styled.div`
  background: ${TINT};
  border-left: 3px solid ${GREEN};
  padding: 22px 18px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  text-align: center;
  svg {
    color: ${GREEN_INK};
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 14px;
    color: #333;
  }
`;

const numberOf = (s: ManualSection) =>
  /^\d+\.\d+\.\d+$/.test(s.id) ? s.id : s.id.endsWith("-quiz") ? "Quiz" : s.id.endsWith("-practical") ? "Task" : "";

const block = (e: SyntheticEvent) => e.preventDefault();

export const ManualPage = () => {
  const { search } = useRouter();
  const session = useSession();
  const params = new URLSearchParams(search);
  const stageId = (params.get("stage") ?? "stage-1") as StageId;
  const manual = manuals[stageId] ?? manuals["stage-1"]!;
  const sectionId = params.get("s");
  const index = sectionId ? manual.toc.findIndex((s) => s.id === sectionId) : -1;
  const section = index >= 0 ? manual.toc[index] : undefined;
  const stage = stageById(manual.stage)!;

  const [owned, setOwned] = useState<string[]>([]);
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    fetchMyStages().then(setOwned, () => {});
  }, [userId]);

  const free = section ? FREE_MANUAL_SECTIONS.has(section.id) : false;
  const canRead = free || owned.includes(manual.stage);

  useEffect(() => {
    setHtml("");
    setError("");
    if (!section || session === undefined || !canRead) return;
    let live = true;
    lmsApi<{ html: string }>(`manual?stage=${manual.stage}&s=${encodeURIComponent(section.id)}`).then(
      (r) => live && setHtml(r.html),
      (e: Error) => live && setError(e.message),
    );
    return () => {
      live = false;
    };
  }, [section, session, canRead, manual.stage]);

  // Prerender / first paint: neutral shell so hydration matches
  if (session === undefined) {
    return (
      <Container>
        <Wrap aria-busy="true">
          <Paper>
            <p className="kicker">Course manual</p>
          </Paper>
        </Wrap>
      </Container>
    );
  }

  const prev = index > 0 ? manual.toc[index - 1] : undefined;
  const next = section ? manual.toc[index + 1] : manual.toc[0];
  const firstOfModule = section && (index === 0 || manual.toc[index - 1].moduleId !== section.moduleId);
  const footer = `Calisthenics Trainer Certification | Stage ${stage.number} — ${manual.title}`;
  const unlockTo = session ? `${COURSE.path}#stages` : `/login?next=${encodeURIComponent(manualHref(manual.stage, sectionId ?? undefined))}`;

  const modules = manual.toc.reduce<{ id: string; title: string; items: ManualSection[] }[]>((acc, s) => {
    const last = acc.at(-1);
    if (last && last.id === s.moduleId) last.items.push(s);
    else acc.push({ id: s.moduleId, title: s.moduleTitle, items: [s] });
    return acc;
  }, []);

  return (
    <Container>
      <Wrap>
        <Bar>
          <Link to={session ? "/learn" : COURSE.path}>
            <ArrowLeft size={16} /> {session ? "My Course" : "Course"}
          </Link>
          {section && (
            <Link to={manualHref(manual.stage)}>
              <List size={16} /> Contents
            </Link>
          )}
        </Bar>

        <Paper onCopy={block} onCut={block} onContextMenu={block} onDragStart={block}>
          {!section ? (
            <>
              <Cover>
                <div className="bar" />
                <p className="kicker">{manual.kicker}</p>
                <h1>{manual.title.toUpperCase()}</h1>
                <p className="sub">{COURSE.name} Course</p>
              </Cover>
              <Toc>
                <h2>Table of contents</h2>
                {modules.map((m) => (
                  <section key={m.id}>
                    <h3>
                      {/^\d/.test(m.id) && m.id !== "1.0" ? `Module ${m.id} — ` : ""}
                      {m.title}
                    </h3>
                    <ol>
                      {m.items.map((s) => {
                        const open = FREE_MANUAL_SECTIONS.has(s.id) || owned.includes(manual.stage);
                        return (
                          <li key={s.id}>
                            <Link to={manualHref(manual.stage, s.id)}>
                              <span className="n">{numberOf(s)}</span>
                              <span className="t">{s.title}</span>
                              {!open ? (
                                <Lock size={14} aria-label="Locked" />
                              ) : (
                                FREE_MANUAL_SECTIONS.has(s.id) &&
                                !owned.includes(manual.stage) && <span className="free">FREE</span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </Toc>
            </>
          ) : (
            <>
              {firstOfModule && section.moduleId !== "1.0" && /^\d/.test(section.moduleId) ? (
                <h2 className="module">
                  Module {section.moduleId} — {section.moduleTitle}
                </h2>
              ) : (
                <p className="kicker">
                  {/^\d/.test(section.moduleId) && section.moduleId !== "1.0"
                    ? `Module ${section.moduleId} · ${section.moduleTitle}`
                    : section.moduleTitle}
                </p>
              )}
              <h1 className="section">
                {numberOf(section) && /^\d/.test(numberOf(section)) && <span>{section.id} </span>}
                {section.title}
              </h1>

              {!canRead ? (
                <LockBox>
                  <Lock size={26} />
                  <p>
                    This chapter is part of Stage {stage.number}: {stage.name}. Unlock the stage to read the full
                    manual.
                  </p>
                  <ButtonTo $primary to={unlockTo}>
                    {session ? `Unlock Stage ${stage.number}` : "Log in"}
                  </ButtonTo>
                </LockBox>
              ) : error ? (
                <Muted style={{ color: "#b3261e" }}>{error}</Muted>
              ) : html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <p aria-busy="true" style={{ color: "#8a8a8a" }}>
                  Loading…
                </p>
              )}
            </>
          )}
          <Footer>
            <span>{footer}</span>
            {session?.user.email && <span>Licensed to {session.user.email}</span>}
          </Footer>
        </Paper>

        <Pager aria-label="Manual pages">
          {prev && (
            <Link to={manualHref(manual.stage, prev.id)}>
              <small>
                <ArrowLeft size={13} /> Previous
              </small>
              {prev.title}
            </Link>
          )}
          {next && (
            <Link className="next" to={manualHref(manual.stage, next.id)}>
              <small>
                {section ? "Next" : "Start reading"} <ArrowRight size={13} />
              </small>
              {next.title}
            </Link>
          )}
        </Pager>
      </Wrap>
    </Container>
  );
};
