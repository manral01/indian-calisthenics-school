import { business, SITE_URL } from "../data/business";
import { OG_IMAGE } from "../data/images";
import type { FAQItem } from "../data/faq";
import type { BlogPost } from "../data/blogPosts";
import type { ProgramPageContent } from "../data/programPages";
import { trainingPrograms } from "../data/trainingData";

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;

const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/about#aman-bisht`;

/** Points at the academy; name, url and logo are repeated so it also reads on pages without the full block. */
const orgRef = () => ({
  "@type": "HealthClub",
  "@id": ORG_ID,
  name: business.name,
  url: absoluteUrl("/"),
  logo: { "@type": "ImageObject", url: absoluteUrl("/logo-512.png") },
});

const CLI_FOUNDER_PAGE = "https://www.calisthenicslabindia.club/aman-bisht";

/** Aman Bisht, founder of both academies and the Hyderabad Calisthenics community. */
export const founderSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: business.founder.name,
  jobTitle: "Calisthenics athlete, coach and founder",
  description:
    "Indian calisthenics athlete and coach from Dehradun, based in Hyderabad. 3× national calisthenics champion who has represented India three times, and a competition judge. Founder of Indian Calisthenics School (Madhapur), Calisthenics Lab India (Kondapur) and the Hyderabad Calisthenics community.",
  url: absoluteUrl("/aman-bisht"),
  mainEntityOfPage: absoluteUrl("/aman-bisht"),
  image: absoluteUrl("/founder/aman-square.webp"),
  nationality: { "@type": "Country", name: "India" },
  homeLocation: { "@type": "City", name: "Hyderabad" },
  knowsAbout: ["Calisthenics", "Street workout", "Freestyle calisthenics", "Calisthenics coaching"],
  award: [
    "Third place in Asia and second among Indian athletes, Asian Championship of Freestyle (Mumbai, 2024)",
    "3× national calisthenics champion",
  ],
  // The same person's profile on the sister academy's site
  sameAs: ["https://www.instagram.com/gravity_antagonist_sw", CLI_FOUNDER_PAGE],
  worksFor: [
    { "@id": ORG_ID },
    {
      "@type": "SportsActivityLocation",
      name: "Calisthenics Lab India",
      url: "https://www.calisthenicslabindia.club/",
    },
  ],
  memberOf: {
    "@type": "Organization",
    name: "Hyderabad Calisthenics",
    sameAs: [business.hyderabadCalisthenicsInstagram],
  },
});

/** The founder page is a profile of one person; this tells Google who it is about. */
export const founderProfileSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2026-11-10T00:00:00+05:30",
  dateModified: "2026-11-11T00:00:00+05:30",
  mainEntity: founderSchema(),
});

export const localBusinessSchema = () => {
  const sameAs = [business.instagram, business.googleBusinessProfile].filter(Boolean);

  return {
    "@context": "https://schema.org",
    // HealthClub is a LocalBusiness (and an Organization), so this one block
    // carries both the local-business and the organization details.
    "@type": "HealthClub",
    "@id": ORG_ID,
    name: business.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-512.png"),
    image: [absoluteUrl(OG_IMAGE)],
    description:
      "Calisthenics, strength, mobility, freestyle and parkour, personal training and kids training in Madhapur, near Mindspace and HITEC City, Hyderabad.",
    ...(business.phone && { telephone: business.phone }),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: [business.streetAddress, business.locality, business.landmark]
        .filter(Boolean)
        .join(", "),
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    ...(business.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.lat,
        longitude: business.geo.lng,
      },
    }),
    hasMap: business.maps,
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    founder: { "@id": FOUNDER_ID },
    priceRange: "₹3,333 – ₹77,777",
    currenciesAccepted: "INR",
    ...(sameAs.length && { sameAs }),
    makesOffer: PROGRAM_SLUGS.map((slug) => ({
      "@type": "Offer",
      itemOffered: { "@id": serviceId(`/training/${slug}`) },
    })),
  };
};

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqSchema = (faqs: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const articleSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  image: [absoluteUrl(OG_IMAGE)],
  datePublished: `${post.datePublished}T09:00:00+05:30`,
  dateModified: `${post.dateModified}T09:00:00+05:30`,
  mainEntityOfPage: absoluteUrl(post.path),
  author: { "@type": "Person", "@id": FOUNDER_ID, name: business.founder.name, url: absoluteUrl("/about") },
  publisher: orgRef(),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: business.name,
  alternateName: "ICS Hyderabad",
  url: absoluteUrl("/"),
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
});

const PROGRAM_SLUGS = ["calisthenics", "kids", "personal-training", "freestyle-parkour"] as const;
const serviceId = (path: string) => `${absoluteUrl(path)}#service`;

const monthlyOffer = (name: string, price: number) => ({
  "@type": "Offer",
  name,
  price: String(price),
  priceCurrency: "INR",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: String(price),
    priceCurrency: "INR",
    unitText: "month",
  },
});

const monthly = (program: "calisthenics" | "kids", session: "weekdaySession" | "weekendSession") => {
  const s = trainingPrograms[program][session];
  const tier = s.pricing.find((t) => /month/i.test(t.id)) ?? s.pricing[0];
  return monthlyOffer(`${s.batchName}, monthly`, tier.price);
};

/** Separate service per program page (group classes, kids, personal coaching, freestyle). */
const SERVICE_DETAILS: Record<(typeof PROGRAM_SLUGS)[number], { serviceType: string; offers?: () => object[]; hoursAvailable?: object }> = {
  calisthenics: {
    serviceType: "Group calisthenics classes",
    offers: () => [monthly("calisthenics", "weekdaySession"), monthly("calisthenics", "weekendSession")],
  },
  kids: {
    serviceType: "Kids fitness classes",
    offers: () => [monthly("kids", "weekdaySession"), monthly("kids", "weekendSession")],
  },
  "personal-training": {
    serviceType: "Personal training",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    // In-person is priced on consultation; only the online price is published.
    offers: () => [{ "@type": "Offer", name: "Online personal training", price: "15000", priceCurrency: "INR" }],
  },
  "freestyle-parkour": { serviceType: "Freestyle calisthenics and parkour classes" },
};

export const serviceSchema = (program: ProgramPageContent) => {
  const details = SERVICE_DETAILS[program.slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(program.path),
    name: `${program.name} at ${business.name}`,
    serviceType: details.serviceType,
    description: program.description,
    url: absoluteUrl(program.path),
    provider: orgRef(),
    areaServed: { "@type": "City", name: "Hyderabad" },
    ...(details.offers && { offers: details.offers() }),
    ...(details.hoursAvailable && { hoursAvailable: details.hoursAvailable }),
  };
};
