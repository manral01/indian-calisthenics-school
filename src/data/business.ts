// Single source of truth for business facts (NAP, hours, links).
// Used by the visible footer/contact blocks AND the JSON-LD schema, so they
// can never drift apart. Empty strings / null mean "not provided yet": the UI
// and schema skip those fields, and `npm run build` prints a warning listing them.
//
// NOTE: +91 88267 62234 is shared with Calisthenics Lab India; Aman confirmed
// it is also the ICS phone/WhatsApp number (Nov 2026).

export const SITE_URL = "https://www.indiancalisthenicsschool.com";

export interface OpeningHours {
  /** schema.org day names */
  days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[];
  label: string;
  opens: string; // HH:MM, 24h
  closes: string;
  display: string;
}

export const business = {
  name: "Indian Calisthenics School",
  tagline: "Learn about your body instead of machines",

  streetAddress: "Image Hospital Rd, adjacent to Fresh Living Apartment, Vittal Rao Nagar",
  locality: "Madhapur",
  landmark: "Near Mindspace",
  city: "Hyderabad",
  region: "Telangana",
  postalCode: "500081",
  country: "IN",
  countryName: "India",

  // [PASTE] from the Google Maps pin, e.g. { lat: 17.4435, lng: 78.3772 }
  geo: null as { lat: number; lng: number } | null,

  phone: "+918826762234",

  email: "indian.calisthenics.school@gmail.com",

  // [CONFIRM] this is ICS's Instagram (it was already on the site)
  instagram: "https://www.instagram.com/indian.calisthenics.school/",
  // Google Business Profile (place ID ChIJ9V5o5yqRyzsRzw_I9UMY7mY)
  googleBusinessProfile: "https://www.google.com/maps/place/?q=place_id:ChIJ9V5o5yqRyzsRzw_I9UMY7mY",
  hyderabadCalisthenicsInstagram: "https://www.instagram.com/hyderabad.calisthenics/",
  // Directions link (already on the site)
  maps: "https://www.google.com/maps/place/?q=place_id:ChIJ9V5o5yqRyzsRzw_I9UMY7mY",

  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      label: "Mon – Fri",
      opens: "06:30",
      closes: "09:30",
      display: "6:30 – 9:30 AM",
    },
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      label: "Mon – Fri",
      opens: "16:00",
      closes: "21:00",
      display: "4:00 – 9:00 PM (kids 4–6 PM, adults 6–9 PM)",
    },
    {
      days: ["Saturday", "Sunday"],
      label: "Sat – Sun",
      opens: "08:00",
      closes: "10:00",
      display: "8:00 – 10:00 AM (kids 9–10 AM)",
    },
  ] as OpeningHours[],

  // Madhapur / HITEC City / Mindspace only, never Kondapur (Calisthenics Lab India's area)
  areaServed: ["Madhapur", "HITEC City", "Mindspace", "Hyderabad"],

  founder: {
    name: "Aman Bisht",
    photo: {
      src: "/founder/aman-square.webp",
      width: 440,
      height: 440,
      alt: "Aman Bisht, founder and head coach of Indian Calisthenics School",
    } as import("./images").SiteImage | null,
    credentials: [
      "3× national calisthenics champion",
      "Represented India 3 times",
      "Founder of Hyderabad Calisthenics",
    ],
  },
};

/** Phone without "+" for wa.me links, or "" when not set. */
export const whatsappNumber = business.phone.replace(/\D/g, "");

/** "+91 98765 43210"-style display, or "" when not set. */
export const phoneDisplay = business.phone
  ? business.phone.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2")
  : "";

/** Full one-line address, skipping the street when it isn't set yet. */
export const fullAddress = [
  business.streetAddress,
  business.locality,
  business.landmark,
  business.city,
  `${business.region} ${business.postalCode}`,
  business.countryName,
]
  .filter(Boolean)
  .join(", ");

export const whatsappLink = (text?: string) =>
  whatsappNumber
    ? `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "";

/** Facts still missing before go-live; printed by the prerender step. */
export const missingFacts = () =>
  [
    !business.streetAddress && "business.streetAddress (building/street)",
    !business.geo && "business.geo (latitude/longitude)",
    !business.phone && "business.phone (ICS's own number)",
    !business.googleBusinessProfile && "business.googleBusinessProfile",
  ].filter(Boolean) as string[];
