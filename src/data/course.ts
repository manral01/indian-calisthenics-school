// ★ Single source of truth for the online Calisthenics Trainer Certification course.
// Used by the course pages (browser) AND the payment/video API (server), so the
// price a student sees is always the price they are charged.
//
// HOW TO UPDATE
// - Set a stage's `priceInr` (whole rupees) to open it for sale. `null` = "Coming soon".
// - After uploading a lesson video to Bunny Stream, paste its Video ID into `video`.
//   Lessons without a video show as "Coming soon" to students.
// - `free: true` makes a lesson a public preview (no login or purchase needed).
// - Flip `COURSE.listed` to true at launch: adds the course to the menu, sitemap and Google.
// - Lesson `id`s are saved against student progress: never change an id once published.

export type StageId = "stage-1" | "stage-2" | "stage-3";
export type ProductId = StageId | "bundle";

export interface Lesson {
  id: string;
  title: string;
  /** Bunny Stream Video ID (GUID). Empty = not uploaded yet. */
  video: string;
  minutes?: number;
  free?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Stage {
  id: StageId;
  number: 1 | 2 | 3;
  name: string;
  tagline: string;
  /** Whole rupees, GST-inclusive. null = not on sale yet. */
  priceInr: number | null;
  outcomes: string[];
  modules: Module[];
}

export const COURSE = {
  name: "Calisthenics Trainer Certification",
  shortName: "Online Course",
  path: "/course",
  /** false until launch: course stays out of the menu, sitemap and Google. */
  listed: false,
  intro:
    "Learn calisthenics properly, from your first push-up to coaching others. One 3-stage path: stop after Stage 1 or 2 for your own training, or finish all 3 to become a certified trainer.",
  /** Full path (all 3 stages) at a discount. null = not on sale yet. */
  bundlePriceInr: null as number | null,
};

const lesson = (id: string, title: string, extra: Partial<Lesson> = {}): Lesson => ({
  id,
  title,
  video: "",
  ...extra,
});

// Draft module titles from the Stage 1 manual. Edit titles freely; keep ids stable.
export const stages: Stage[] = [
  {
    id: "stage-1",
    number: 1,
    name: "Foundation",
    tagline: "Master the basics with clean form and a plan you can follow.",
    priceInr: null,
    outcomes: [
      "Clean form on push, pull, squat, hinge and core patterns",
      "Progression ladders with clear targets for when to level up",
      "Warm-ups, recovery and injury prevention that actually work",
      "Your own 12-week training plan",
    ],
    modules: [
      {
        id: "1.0",
        title: "Welcome",
        lessons: [lesson("1-0-1", "Welcome to the course", { free: true })],
      },
      {
        id: "1.1",
        title: "What Is Calisthenics?",
        lessons: [lesson("1-1-1", "A Sport Older Than Every Gym", { free: true })],
      },
      { id: "1.2", title: "Leverage & Movement Principles", lessons: [] },
      { id: "1.3", title: "Adaptation & Recovery Science", lessons: [] },
      { id: "1.4", title: "Functional Anatomy", lessons: [] },
      { id: "1.5", title: "Screening Before You Train", lessons: [] },
      { id: "1.6", title: "Warm-Up Structure", lessons: [] },
      { id: "1.7", title: "Push Patterns", lessons: [] },
      { id: "1.8", title: "Pull Patterns", lessons: [] },
      { id: "1.9", title: "Squat & Hinge Patterns", lessons: [] },
      { id: "1.10", title: "Core Training", lessons: [] },
      { id: "1.11", title: "Shoulder & Scapular Control", lessons: [] },
      { id: "1.12", title: "Grip, Breathing & Bracing", lessons: [] },
      { id: "1.13", title: "Program Design, Recovery & Nutrition Basics", lessons: [] },
      { id: "1.14", title: "Injury Prevention & Coaching Communication", lessons: [] },
    ],
  },
  {
    id: "stage-2",
    number: 2,
    name: "Development",
    tagline: "Build strength skills and learn to program for progress.",
    priceInr: null,
    outcomes: [
      "Intermediate strength and skill progressions",
      "Programming for different goals and levels",
      "Spotting and cueing others safely",
    ],
    modules: [],
  },
  {
    id: "stage-3",
    number: 3,
    name: "Mastery",
    tagline: "Advanced skills plus everything you need to coach professionally.",
    priceInr: null,
    outcomes: [
      "Advanced skill coaching",
      "Client psychology and communication",
      "Business ethics and running your coaching career",
      "Trainer certification on completing all 3 stages",
    ],
    modules: [],
  },
];

// ─── Helpers (shared by browser + server) ────────────────────────────────────
export const stageById = (id: string) => stages.find((s) => s.id === id);

export const allLessons = stages.flatMap((s) =>
  s.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, stage: s.id, module: m }))),
);

export const lessonById = (id: string) => allLessons.find((l) => l.id === id);

export const lessonCount = (s: Stage) => s.modules.reduce((n, m) => n + m.lessons.length, 0);

/** Stages a product unlocks. */
export const productStages = (p: ProductId): StageId[] =>
  p === "bundle" ? stages.map((s) => s.id) : [p];

/** Price in whole rupees, or null when not on sale. */
export const productPrice = (p: ProductId): number | null =>
  p === "bundle" ? COURSE.bundlePriceInr : (stageById(p)?.priceInr ?? null);

export const productName = (p: ProductId) =>
  p === "bundle"
    ? `${COURSE.name}: Full Path (Stages 1–3)`
    : `${COURSE.name}: Stage ${stageById(p)!.number} (${stageById(p)!.name})`;

export const isProductId = (v: unknown): v is ProductId =>
  v === "bundle" || stages.some((s) => s.id === v);

export const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
