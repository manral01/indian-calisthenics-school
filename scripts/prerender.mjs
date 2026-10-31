// Prerenders every route to static HTML so content, headings, links and
// JSON-LD are in the raw HTML (view-source), then writes 404.html and
// sitemap.xml. Runs after `vite build` + `vite build --ssr`.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, routes, notFoundRoute, missingFacts, SITE_URL } = await import(
  join(ssrDir, "entry-server.js")
);
const template = readFileSync(join(dist, "index.html"), "utf8");

const page = (path) => {
  const { html, styles, head } = render(path);
  return template
    .replace("<!--app-head-->", `${head}\n    ${styles}`)
    .replace("<!--app-html-->", html);
};

const warnings = [];
for (const route of routes) {
  // Vercel cleanUrls: /training/kids is served from training/kids.html
  const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(route.path));
  if (route.title.length > 60) warnings.push(`title > 60 chars (${route.title.length}): ${route.path}`);
  if (route.description.length > 160)
    warnings.push(`description > 160 chars (${route.description.length}): ${route.path}`);
  console.log(`[prerender] ${route.path} → dist/${file}`);
}

writeFileSync(join(dist, "404.html"), page(notFoundRoute.path));
console.log("[prerender] 404 → dist/404.html");

const urls = routes
  .filter((r) => !r.noindex)
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n  </url>`,
  )
  .join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`[prerender] sitemap.xml with ${routes.filter((r) => !r.noindex).length} URLs`);

rmSync(ssrDir, { recursive: true, force: true });

for (const w of warnings) console.warn(`[seo] ${w}`);
const missing = missingFacts();
if (missing.length) {
  console.warn("\n[go-live] Fill these in src/data/business.ts before launch:");
  for (const m of missing) console.warn(`  - ${m}`);
}
