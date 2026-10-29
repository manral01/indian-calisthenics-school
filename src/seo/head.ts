// Builds the per-page <head> tags. The same element list is serialised to
// HTML at build time (prerender) and applied to the live document on
// client-side navigation, so both always agree.
import { business } from "../data/business";
import { absoluteUrl } from "./schema";
import { DEFAULT_OG_IMAGE, type RouteMeta } from "./routes";

type Attrs = Record<string, string>;
interface HeadEl {
  tag: "title" | "meta" | "link" | "script";
  attrs: Attrs;
  content?: string;
}

const headElements = (route: RouteMeta): HeadEl[] => {
  const url = absoluteUrl(route.path);
  const image = absoluteUrl(route.ogImage ?? DEFAULT_OG_IMAGE);
  const meta = (key: "name" | "property", k: string, content: string): HeadEl => ({
    tag: "meta",
    attrs: { [key]: k, content },
  });

  const els: HeadEl[] = [
    { tag: "title", attrs: {}, content: route.title },
    meta("name", "description", route.description),
    meta("name", "robots", route.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"),
  ];
  if (!route.noindex) els.push({ tag: "link", attrs: { rel: "canonical", href: url } });

  els.push(
    meta("property", "og:type", route.ogType ?? "website"),
    meta("property", "og:site_name", business.name),
    meta("property", "og:locale", "en_IN"),
    meta("property", "og:url", url),
    meta("property", "og:title", route.title),
    meta("property", "og:description", route.description),
    meta("property", "og:image", image),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", `${business.name}, calisthenics training in Madhapur, Hyderabad`),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", route.title),
    meta("name", "twitter:description", route.description),
    meta("name", "twitter:image", image),
  );

  if (route.preloadImage) {
    const img = route.preloadImage;
    els.push({
      tag: "link",
      attrs: {
        rel: "preload",
        as: "image",
        href: img.src,
        ...(img.srcSet && { imagesrcset: img.srcSet, imagesizes: "100vw" }),
        fetchpriority: "high",
      },
    });
  }

  for (const s of route.schema) {
    els.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      // Escape "<" so the JSON can never close the script tag
      content: JSON.stringify(s).replace(/</g, "\\u003c"),
    });
  }
  return els;
};

const escapeAttr = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Serialised head tags for the prerendered HTML. */
export const renderHead = (route: RouteMeta) =>
  headElements(route)
    .map(({ tag, attrs, content }) => {
      const a = Object.entries({ ...attrs, "data-head": "" })
        .map(([k, v]) => (v === "" ? ` ${k}` : ` ${k}="${escapeAttr(v)}"`))
        .join("");
      if (tag === "meta" || tag === "link") return `<${tag}${a}>`;
      const body = tag === "script" ? content! : escapeText(content ?? "");
      return `<${tag}${a}>${body}</${tag}>`;
    })
    .join("\n    ");

/** Replace the managed head tags in the live document (client navigation). */
export const applyHead = (route: RouteMeta) => {
  document.head.querySelectorAll("[data-head]").forEach((el) => el.remove());
  for (const { tag, attrs, content } of headElements(route)) {
    if (tag === "title") {
      document.title = content ?? "";
      continue;
    }
    if (tag === "link" && attrs.rel === "preload") continue;
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    el.setAttribute("data-head", "");
    if (content) el.textContent = content;
    document.head.appendChild(el);
  }
};
