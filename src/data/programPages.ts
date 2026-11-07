import { images, type SiteImage } from "./images";
import type { FAQItem } from "./faq";

// Content for the /training/* pages. Only facts already published by the
// school (timings, prices, programs) are stated; everything else is a
// general description of the training method.

export type ProgramSlug =
  | "calisthenics"
  | "kids"
  | "personal-training"
  | "freestyle-parkour";

export interface ProgramPageContent {
  slug: ProgramSlug;
  path: string;
  /** Short name used in nav, cards and breadcrumbs */
  name: string;
  title: string;
  description: string;
  h1: string;
  /** Overrides the default location eyebrow above the heading */
  eyebrow?: string;
  /** Brand logo shown above the heading */
  logo?: { src: string; alt: string; size: number };
  /** Optional level-by-level progression section */
  levels?: {
    title: string;
    intro: string;
    items: { level: string; name: string; goal: string; skills: string[] }[];
    note?: string;
  };
  /** Primary enquiry button (shown instead of WhatsApp) */
  instagramDm?: { url: string; handle: string };
  intro: string[];
  image: SiteImage;
  highlightsTitle: string;
  highlights: { title: string; text: string }[];
  forWhom: string[];
  /** Which booking/pricing block to show (from trainingData.ts), if any */
  schedule?: "calisthenics" | "kids";
  /** Free-text pricing note when there is no schedule block */
  pricingNote?: string;
  faqs: FAQItem[];
  gallery: SiteImage[];
  relatedPost: { path: string; title: string };
  whatsappText: string;
}

export const programPages: Record<ProgramSlug, ProgramPageContent> = {
  calisthenics: {
    slug: "calisthenics",
    path: "/training/calisthenics",
    name: "Calisthenics",
    title: "Calisthenics Training in Madhapur & HITEC City, Hyderabad",
    description:
      "Structured calisthenics batches in Madhapur, near Mindspace & HITEC City, Hyderabad. Beginner to advanced. Weekday & weekend timings and fees.",
    h1: "Calisthenics Training in Madhapur, Hyderabad",
    intro: [
      "Indian Calisthenics School runs structured calisthenics batches in Madhapur, near Mindspace and HITEC City, Hyderabad. Training goes from your first push-up and pull-up through to advanced skills like handstands, levers and muscle-ups.",
      "Every session is coached in a group, with progressions matched to your current level, so complete beginners and experienced athletes train side by side.",
    ],
    image: images.planche,
    highlightsTitle: "What you'll train",
    highlights: [
      {
        title: "Foundational strength",
        text: "Push-ups, pull-ups, dips, squats and core work, built up with progressions until each movement is solid.",
      },
      {
        title: "Skills",
        text: "Handstands, L-sits, levers, planche and muscle-up progressions, introduced once the strength base is there.",
      },
      {
        title: "Mobility & control",
        text: "Joint preparation and mobility work so you can move through full ranges of motion with control.",
      },
      {
        title: "Form correction",
        text: "Coaches watch your technique and adjust each progression to your level.",
      },
    ],
    forWhom: [
      "Complete beginners who want a structured start",
      "Gym-goers who want to train with bodyweight",
      "Intermediate athletes working towards specific skills",
      "Working professionals around Madhapur, Mindspace and HITEC City who want early-morning or evening batches",
    ],
    schedule: "calisthenics",
    faqs: [
      {
        question: "Can I join the calisthenics batch as a complete beginner?",
        answer:
          "Yes. Batches include beginners and advanced athletes, and every exercise is scaled to your current level.",
      },
      {
        question: "What are the calisthenics batch timings?",
        answer:
          "Weekday batches run at 6:30, 7:30 and 8:30 AM and at 6:00, 7:00 and 8:00 PM, each for one hour. Weekend batches run at 8:00 and 9:00 AM.",
      },
      {
        question: "How much do calisthenics classes cost?",
        answer:
          "Weekday membership is ₹7,777 monthly, ₹22,222 quarterly, ₹44,444 half-yearly or ₹77,777 yearly. The weekend batch is ₹4,444 per month.",
      },
      {
        question: "Can I try a session before joining?",
        answer:
          "Yes. Use the Book Demo button on this page to send us your details on WhatsApp and we will set up a demo session.",
      },
    ],
    gallery: [images.spot, images.rig, images.straddle],
    relatedPost: {
      path: "/blog/how-to-start-calisthenics-as-a-beginner",
      title: "How to start calisthenics as a beginner",
    },
    whatsappText: "Hi, I'd like to know more about the calisthenics batches at Indian Calisthenics School, Madhapur.",
  },

  kids: {
    slug: "kids",
    path: "/training/kids",
    name: "Kids Training",
    title: "The Mighty Tribe: Kids Calisthenics in Madhapur, Hyderabad",
    description:
      "The Mighty Tribe kids program in Madhapur, Hyderabad: calisthenics, gymnastics & parkour for ages 3–15 in three levels. Weekday & weekend batches.",
    h1: "The Mighty Tribe",
    eyebrow: "Kids Calisthenics, Gymnastics & Parkour · Madhapur",
    logo: { src: "/the-mighty-tribe-logo.webp", alt: "The Mighty Tribe logo", size: 480 },
    instagramDm: { url: "https://ig.me/m/the.mighty.tribe", handle: "@the.mighty.tribe" },
    intro: [
      "The Mighty Tribe is the kids program at Indian Calisthenics School in Madhapur, Hyderabad. It combines calisthenics, gymnastics and parkour in one subscription for kids aged 3 to 15, taught in three clear levels.",
      "Every class is about 40% calisthenics, 40% gymnastics and 20% parkour, so kids build strength, balance, body control and the confidence to move freely.",
    ],
    image: {
      src: "/tmt-handstand-coaching.webp",
      width: 1400,
      height: 2100,
      alt: "A coach spotting a handstand while two kids watch at The Mighty Tribe",
    },
    highlightsTitle: "What kids learn",
    highlights: [
      {
        title: "Calisthenics (40%)",
        text: "Hangs, holds, push-ups, chin-ups and core work that build real bodyweight strength, scaled to each child.",
      },
      {
        title: "Gymnastics (40%)",
        text: "Rolls, cartwheels, bridges and handstands that build flexibility, body awareness and control.",
      },
      {
        title: "Parkour (20%)",
        text: "Jumping, landing, vaulting and moving over obstacles safely, with confidence.",
      },
      {
        title: "Discipline & confidence",
        text: "Clear levels and goals build focus, patience and the courage to try new skills.",
      },
    ],
    levels: {
      title: "Three levels, one clear path",
      intro:
        "Kids move up when they pass their level's skills checklist, not because of their age. Skills are tested every 3 months, parents get a progress card, and every level passed earns a certificate.",
      items: [
        {
          level: "Level 1",
          name: "Foundation",
          goal: "Body control, coordination, safe falling and basic strength. Usually 3–6 months.",
          skills: ["Animal movements and body shapes", "Forward rolls and soft landings", "Dead hangs, planks and balance"],
        },
        {
          level: "Level 2",
          name: "Builder",
          goal: "Real strength and the first calisthenics and gymnastics skills. Usually 6–12 months.",
          skills: ["First chin-ups and full push-ups", "Wall handstands and tuck L-sits", "Cartwheels, bridges and backward rolls"],
        },
        {
          level: "Level 3",
          name: "Advanced",
          goal: "Master advanced skills, link them into routines and get ready to compete. 12+ months.",
          skills: ["Pull-up sets, dips and tuck front lever", "Freestanding handstand and full L-sit", "Round-off, walkovers and a full routine"],
        },
      ],
      note: "Competition track: kids who pass Level 3, or show strong talent in Level 2, can be selected for inter-academy, state and national kids' events, with coach recommendation and parent consent.",
    },
    forWhom: [
      "Kids aged 3 to 15: little ones (3–5) learn Level 1 through games and obstacle courses",
      "Children who are new to structured exercise",
      "Active kids who want to learn skills like handstands, flips and vaults",
      "Young athletes who want a strength and coordination base for other sports",
    ],
    schedule: "kids",
    faqs: [
      {
        question: "What age group is The Mighty Tribe for?",
        answer:
          "Kids aged 3 to 15. Little ones (3–5) learn through games and obstacle courses; older kids move on to real skills and strength work.",
      },
      {
        question: "How do kids move up a level?",
        answer:
          "Each level has a skills checklist, tested every 3 months. Parents get a progress card, and every level passed earns a certificate. Kids who pass Level 3, or show strong talent in Level 2, can be selected for competitions.",
      },
      {
        question: "When are the kids batches?",
        answer:
          "Weekday kids batches run Monday to Friday from 4:00 to 5:00 PM and 5:00 to 6:00 PM. The weekend batch runs Saturday and Sunday from 9:00 to 10:00 AM.",
      },
      {
        question: "What are the fees for kids training?",
        answer:
          "The weekday kids batch is ₹5,555 per month or ₹15,151 per quarter. The weekend kids batch is ₹3,333 per month.",
      },
      {
        question: "Is it safe for children?",
        answer:
          "Sessions are supervised by coaches. Ages 3–5 train through play; ages 6–9 get coach spotting for all upside-down and flipping skills; ages 10–15 build more strength with careful load on growing joints and no heavy weights.",
      },
      {
        question: "How do I enrol my child?",
        answer: "Send us a DM on Instagram at @the.mighty.tribe and we'll help you pick a batch.",
      },
    ],
    gallery: [images.spotKids, images.warmUp],
    relatedPost: {
      path: "/blog/calisthenics-for-kids-benefits-and-safety",
      title: "Calisthenics for kids: benefits and safety",
    },
    whatsappText: "Hi, I'd like to know more about The Mighty Tribe kids program at Indian Calisthenics School, Madhapur.",
  },

  "personal-training": {
    slug: "personal-training",
    path: "/training/personal-training",
    name: "Personal Training",
    title: "Personal Calisthenics Training in Madhapur, Hyderabad",
    description:
      "One-on-one calisthenics personal training in Madhapur, Hyderabad, plus online personal training. A coach and a plan built around your goals.",
    h1: "Personal Training in Madhapur, Hyderabad",
    intro: [
      "Personal training at Indian Calisthenics School in Madhapur, Hyderabad gives you a coach who works with you one-on-one for the whole session, with a plan built around your goals and current ability.",
      "Can't train in person? Online personal training is also available.",
    ],
    image: images.spot,
    highlightsTitle: "What's included",
    highlights: [
      {
        title: "1-hour dedicated coach",
        text: "Your coach works with you alone for the full 60 minutes.",
      },
      {
        title: "Custom workouts",
        text: "No cookie-cutter routines. Each session is designed around your goals and abilities.",
      },
      {
        title: "Assessment & roadmap",
        text: "We assess your strength, correct your form and map out a progression towards the skills you want.",
      },
      {
        title: "Online option",
        text: "Online personal training for people who can't attend in person.",
      },
    ],
    forWhom: [
      "People who want fully individual attention",
      "Athletes chasing a specific skill (handstand, muscle-up, front lever and more)",
      "Anyone returning to training who wants a careful, guided start",
    ],
    pricingNote:
      "In-person personal training is priced on consultation. Online personal training is ₹15,000.",
    faqs: [
      {
        question: "How much does personal training cost?",
        answer:
          "In-person personal training is priced on consultation, based on your goals and schedule. Online personal training is ₹15,000.",
      },
      {
        question: "How long is a personal training session?",
        answer: "Each session is one hour with a dedicated coach.",
      },
      {
        question: "Do you offer online personal training?",
        answer: "Yes. Online personal training is available at ₹15,000.",
      },
    ],
    gallery: [images.spotKids, images.planche],
    relatedPost: {
      path: "/blog/how-to-start-calisthenics-as-a-beginner",
      title: "How to start calisthenics as a beginner",
    },
    whatsappText: "Hi, I'd like to know more about personal training at Indian Calisthenics School, Madhapur.",
  },

  "freestyle-parkour": {
    slug: "freestyle-parkour",
    path: "/training/freestyle-parkour",
    name: "Freestyle & Parkour",
    title: "Freestyle Calisthenics & Parkour in Madhapur, Hyderabad",
    description:
      "Learn freestyle calisthenics and parkour in Madhapur, Hyderabad: bar flow, dynamic skills, vaults and safe landings, coached step by step.",
    h1: "Freestyle Calisthenics & Parkour in Madhapur, Hyderabad",
    intro: [
      "Freestyle calisthenics and parkour at Indian Calisthenics School in Madhapur, Hyderabad is about moving with power and creativity: dynamic bar movements, flows, jumps, vaults and safe landings.",
      "We break each movement into progressions, so you build the strength and control needed before attempting bigger skills.",
    ],
    image: images.straddle,
    highlightsTitle: "What you'll learn",
    highlights: [
      {
        title: "Bar flow",
        text: "Linking swings, transitions and releases on the bar into smooth combinations.",
      },
      {
        title: "Vaults & precision",
        text: "Clearing obstacles and landing accurately, starting low and building up.",
      },
      {
        title: "Landing & rolling",
        text: "Absorbing impact safely: the first thing every parkour athlete learns.",
      },
      {
        title: "Strength for skills",
        text: "The pulling, pushing and core strength that dynamic skills depend on.",
      },
    ],
    forWhom: [
      "People who already train calisthenics and want something more dynamic",
      "Beginners who want to learn to move freely and safely",
      "Anyone who enjoys learning creative, playful skills",
    ],
    pricingNote:
      "Message us on WhatsApp or email for current freestyle and parkour batch timings and fees.",
    faqs: [
      {
        question: "Do I need calisthenics experience to start freestyle or parkour?",
        answer:
          "No. We start with the basics (landing, rolling and foundational strength) and progress from there.",
      },
      {
        question: "How do I find out the freestyle and parkour batch timings?",
        answer:
          "Message us on WhatsApp or email us and we will share the current timings and fees.",
      },
    ],
    gallery: [images.planche, images.rig],
    relatedPost: {
      path: "/blog/what-is-freestyle-calisthenics-and-parkour",
      title: "What is freestyle calisthenics and parkour?",
    },
    whatsappText: "Hi, I'd like to know more about freestyle and parkour training at Indian Calisthenics School, Madhapur.",
  },
};

export const programList: ProgramPageContent[] = [
  programPages.calisthenics,
  programPages.kids,
  programPages["personal-training"],
  programPages["freestyle-parkour"],
];
