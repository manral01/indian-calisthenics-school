// Build-time renderer used by scripts/prerender.mjs (not shipped to browsers).
/* eslint-disable react-refresh/only-export-components */
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import App from "./App";
import { findRoute } from "./seo/routes";
import { renderHead } from "./seo/head";
import { preloadPage } from "./pages/registry";

export { routes, notFoundRoute } from "./seo/routes";
export { missingFacts, SITE_URL } from "./data/business";

export async function render(path: string) {
  await preloadPage(path);
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(<App initialPath={path} />));
    return { html, styles: sheet.getStyleTags(), head: renderHead(findRoute(path)) };
  } finally {
    sheet.seal();
  }
}
