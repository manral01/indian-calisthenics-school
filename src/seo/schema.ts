import { business, SITE_URL } from "../data/business";
import { OG_IMAGE } from "../data/images";
import type { FAQItem } from "../data/faq";
import type { BlogPost } from "../data/blogPosts";

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;

const ORG_ID = `${SITE_URL}/#organization`;

export const localBusinessSchema = () => {
  const sameAs = [
    business.instagram,
    business.googleBusinessProfile,
    business.hyderabadCalisthenicsInstagram,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": ORG_ID,
    name: business.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/mainLogo.jpeg"),
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
    founder: { "@type": "Person", name: business.founder.name },
    priceRange: "₹3,333 – ₹77,777",
    ...(sameAs.length && { sameAs }),
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
  datePublished: post.datePublished,
  dateModified: post.dateModified,
  mainEntityOfPage: absoluteUrl(post.path),
  author: { "@type": "Organization", name: business.name, url: absoluteUrl("/") },
  publisher: {
    "@type": "Organization",
    name: business.name,
    logo: { "@type": "ImageObject", url: absoluteUrl("/mainLogo.jpeg") },
  },
});
