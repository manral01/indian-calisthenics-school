// Per-page code splitting. Each page lives in its own JS file, so a phone only
// downloads the code for the page it opens (plus whatever the visitor taps next).
//
// How it stays fast and SEO-safe:
// - Build time (prerender) and first load in the browser both call preloadPage()
//   *before* rendering, so the page renders synchronously: the prerendered HTML
//   is complete and hydration matches it exactly (no flash, no blank page).
// - On client-side navigation the next page loads on demand; links also start
//   loading it on touch/hover, so it is usually ready by the time the tap lands.
/* eslint-disable react-refresh/only-export-components */
import { lazy, type ComponentType } from "react";
import { findRoute } from "../seo/routes";

function lazyPage<P extends object>(loader: () => Promise<ComponentType<P>>) {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;
  const load = () =>
    (pending ??= loader().then((C) => {
      Loaded = C;
    }));
  const Lazy = lazy(() => load().then(() => ({ default: Loaded as ComponentType<P> })));
  const Page = (props: P) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  return Object.assign(Page, { load });
}

export const Home = lazyPage(() => import("./Home").then((m) => m.Home));
export const TrainingPage = lazyPage(() =>
  import("../components/TrainingPage").then((m) => m.TrainingPage),
);
export const AboutPage = lazyPage(() => import("./AboutPage").then((m) => m.AboutPage));
export const FounderPage = lazyPage(() => import("./FounderPage").then((m) => m.FounderPage));
export const ContactPage = lazyPage(() => import("./ContactPage").then((m) => m.ContactPage));
export const BlogPage = lazyPage(() => import("./BlogPage").then((m) => m.BlogPage));
export const BlogPostPage = lazyPage(() => import("./BlogPage").then((m) => m.BlogPostPage));
export const NotFoundPage = lazyPage(() => import("./NotFoundPage").then((m) => m.NotFoundPage));

/** Start (or finish) loading the code for the page at `path`. Safe to call repeatedly. */
export function preloadPage(path: string): Promise<void> {
  const kind = findRoute(path.split("#")[0]).page.kind;
  const page =
    kind === "home"
      ? Home
      : kind === "program"
        ? TrainingPage
        : kind === "about"
          ? AboutPage
          : kind === "founder"
            ? FounderPage
          : kind === "contact"
            ? ContactPage
            : kind === "blog"
              ? BlogPage
              : kind === "post"
                ? BlogPostPage
                : NotFoundPage;
  return page.load().catch(() => {});
}
