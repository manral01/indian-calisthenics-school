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
    title: "Kids Calisthenics Classes in Madhapur, Hyderabad",
    description:
      "Supervised kids calisthenics classes in Madhapur, Hyderabad: strength, coordination and confidence. Weekday evening & weekend batches, fees inside.",
    h1: "Kids Calisthenics Classes in Madhapur, Hyderabad",
    intro: [
      "Kids training at Indian Calisthenics School in Madhapur, Hyderabad is built around movement fundamentals: balance, coordination, strength and body control, taught in a structured and supervised class.",
      "Children learn to climb, hang, jump, roll and hold their own bodyweight through age-appropriate drills and games, progressing step by step.",
    ],
    image: images.kidsHandstand,
    highlightsTitle: "What kids learn",
    highlights: [
      {
        title: "Movement fundamentals",
        text: "Running, jumping, landing, crawling and balancing: the base for every sport.",
      },
      {
        title: "Bodyweight strength",
        text: "Hanging, supported holds and simple pushing and pulling movements, scaled to each child.",
      },
      {
        title: "Coordination & confidence",
        text: "Handstand drills, rolls and skill games that build body awareness and confidence.",
      },
      {
        title: "Discipline & habits",
        text: "Regular, structured sessions that build focus, patience and a habit of moving every day.",
      },
    ],
    forWhom: [
      "Children who are new to structured exercise",
      "Active kids who want to learn skills like handstands",
      "Young athletes who want a strength and coordination base for other sports",
    ],
    schedule: "kids",
    faqs: [
      {
        question: "When are the kids calisthenics batches?",
        answer:
          "Weekday kids batches run Monday to Friday from 4:00 to 5:00 PM and 5:00 to 6:00 PM. The weekend batch runs Saturday and Sunday from 9:00 to 10:00 AM.",
      },
      {
        question: "What are the fees for kids training?",
        answer:
          "The weekday kids batch is ₹5,555 per month or ₹15,151 per quarter. The weekend kids batch is ₹3,333 per month.",
      },
      {
        question: "Is calisthenics safe for children?",
        answer:
          "Sessions are supervised by coaches, use age-appropriate progressions and focus on control and good technique before anything advanced.",
      },
    ],
    gallery: [images.spotKids, images.warmUp],
    relatedPost: {
      path: "/blog/calisthenics-for-kids-benefits-and-safety",
      title: "Calisthenics for kids: benefits and safety",
    },
    whatsappText: "Hi, I'd like to know more about kids calisthenics training at Indian Calisthenics School, Madhapur.",
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
