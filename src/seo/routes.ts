// Every indexable URL on the site, with its <head> metadata and JSON-LD.
// Used by the client router, the build-time prerenderer and the sitemap.
import { programList } from "../data/programPages";
import { blogPosts } from "../data/blogPosts";
import { faqData } from "../data/faq";
import { OG_IMAGE, type SiteImage } from "../data/images";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
} from "./schema";

export type PageKind =
  | { kind: "home" }
  | { kind: "program"; slug: (typeof programList)[number]["slug"] }
  | { kind: "about" }
  | { kind: "contact" }
  | { kind: "blog" }
  | { kind: "post"; slug: string }
  | { kind: "notFound" };

export interface Crumb {
  name: string;
  path: string;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  page: PageKind;
  ogType?: "website" | "article";
  ogImage?: string;
  breadcrumbs?: Crumb[];
  schema: object[];
  /** Image to <link rel="preload"> (the LCP image) */
  preloadImage?: SiteImage;
  /** sitemap <lastmod>, bump when the page content changes */
  lastmod: string;
  noindex?: boolean;
}

const home: Crumb = { name: "Home", path: "/" };
const withCrumbs = (crumbs: Crumb[], schema: object[]) => [
  ...schema,
  breadcrumbSchema(crumbs),
];

const SITE_UPDATED = "2026-10-29";

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Calisthenics Classes in Madhapur, Hyderabad | Indian Calisthenics School",
    description:
      "Calisthenics academy in Madhapur near Mindspace & HITEC City, Hyderabad. Beginner to advanced batches, kids training, personal training, parkour.",
    page: { kind: "home" },
    schema: [localBusinessSchema(), faqSchema(faqData)],
    lastmod: SITE_UPDATED,
  },
  ...programList.map((p): RouteMeta => {
    const crumbs = [home, { name: p.name, path: p.path }];
    return {
      path: p.path,
      title: p.title,
      description: p.description,
      page: { kind: "program", slug: p.slug },
      breadcrumbs: crumbs,
      schema: withCrumbs(crumbs, [faqSchema(p.faqs)]),
      preloadImage: p.image,
      lastmod: SITE_UPDATED,
    };
  }),
  {
    path: "/about",
    title: "About Indian Calisthenics School, Madhapur, Hyderabad",
    description:
      "Indian Calisthenics School in Madhapur, Hyderabad was founded by Aman Bisht, 3× national calisthenics champion who has represented India 3 times.",
    page: { kind: "about" },
    breadcrumbs: [home, { name: "About", path: "/about" }],
    schema: [breadcrumbSchema([home, { name: "About", path: "/about" }])],
    lastmod: SITE_UPDATED,
  },
  {
    path: "/contact",
    title: "Contact Indian Calisthenics School, Madhapur, Hyderabad",
    description:
      "Address, timings, map, WhatsApp and email for Indian Calisthenics School in Madhapur, near Mindspace and HITEC City, Hyderabad 500081.",
    page: { kind: "contact" },
    breadcrumbs: [home, { name: "Contact", path: "/contact" }],
    schema: withCrumbs([home, { name: "Contact", path: "/contact" }], [
      localBusinessSchema(),
    ]),
    lastmod: SITE_UPDATED,
  },
  {
    path: "/blog",
    title: "Calisthenics Blog | Indian Calisthenics School, Hyderabad",
    description:
      "Calisthenics guides from Indian Calisthenics School, Hyderabad: how to start as a beginner, kids training, and freestyle calisthenics and parkour.",
    page: { kind: "blog" },
    breadcrumbs: [home, { name: "Blog", path: "/blog" }],
    schema: [breadcrumbSchema([home, { name: "Blog", path: "/blog" }])],
    lastmod: blogPosts.map((p) => p.dateModified).sort().at(-1)!,
  },
  ...blogPosts.map((post): RouteMeta => {
    const crumbs = [
      home,
      { name: "Blog", path: "/blog" },
      { name: post.title, path: post.path },
    ];
    return {
      path: post.path,
      title: post.seoTitle,
      description: post.description,
      page: { kind: "post", slug: post.slug },
      ogType: "article",
      breadcrumbs: crumbs,
      schema: withCrumbs(crumbs, [articleSchema(post)]),
      lastmod: post.dateModified,
    };
  }),
];

export const notFoundRoute: RouteMeta = {
  path: "/404",
  title: "Page Not Found | Indian Calisthenics School",
  description: "This page doesn't exist. Explore calisthenics training at Indian Calisthenics School, Madhapur, Hyderabad.",
  page: { kind: "notFound" },
  schema: [],
  lastmod: SITE_UPDATED,
  noindex: true,
};

export const normalizePath = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export const findRoute = (path: string) =>
  routes.find((r) => r.path === normalizePath(path)) ?? notFoundRoute;

export const DEFAULT_OG_IMAGE = OG_IMAGE;
