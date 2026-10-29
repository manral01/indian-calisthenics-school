/**
 * Calisthenics character pose definitions.
 *
 * Each pose is a set of SVG transform strings applied to named body parts.
 * The character SVG viewBox is 120×240. The figure is drawn in a neutral
 * standing position at the origin; every pose overrides these base transforms.
 *
 * Body-part anchors (approximate, relative to viewBox):
 *   head centre   — (60, 28)
 *   torso centre  — (60, 80)
 *   hip centre    — (60, 118)
 *   leftShoulder  — (46, 58)
 *   rightShoulder — (74, 58)
 *   leftElbow     — (38, 80)
 *   rightElbow    — (82, 80)
 *   leftWrist     — (32, 100)
 *   rightWrist    — (88, 100)
 *   leftHip       — (52, 118)
 *   rightHip      — (68, 118)
 *   leftKnee      — (50, 148)
 *   rightKnee     — (70, 148)
 *   leftAnkle     — (49, 178)
 *   rightAnkle    — (71, 178)
 */

export type PoseName =
  | "standing"
  | "pushup"
  | "dip"
  | "lsit"
  | "planche"
  | "pullup"
  | "muscleup"
  | "handstand"
  | "humanflag"
  | "prepare_push"
  | "prepare_pull"
  | "prepare_balance"
  | "prepare_skill";

/** Each value is a CSS transform string (translate / rotate / scale). */
export interface BodyPose {
  /** Whole-figure container transform (translation / scale) */
  figure: string;
  head: string;
  torso: string;
  leftUpperArm: string;
  rightUpperArm: string;
  leftForearm: string;
  rightForearm: string;
  leftThigh: string;
  rightThigh: string;
  leftShin: string;
  rightShin: string;
  /** Opacity 0–1 so we can hide/show a "bar" element */
  barOpacity: number;
  /** translateY offset for the bar element */
  barY: number;
}

// ─── Default / baseline ───────────────────────────────────────────────────────
// All transforms are relative to each segment's own SVG origin.

export const POSES: Record<PoseName, BodyPose> = {
  // ── Standing — gentle relaxed stance ─────────────────────────────────────
  standing: {
    figure: "translate(0, 0) scale(1)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(10, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-10, 74, 58)",
    leftForearm: "translate(0, 0) rotate(15, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-15, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-4, 52, 118)",
    rightThigh: "translate(0, 0) rotate(4, 68, 118)",
    leftShin: "translate(0, 0) rotate(-2, 50, 148)",
    rightShin: "translate(0, 0) rotate(2, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Push-up — arms bent, body parallel to floor ───────────────────────────
  pushup: {
    figure: "translate(0, 60) scale(1)",
    head: "translate(0, 0) rotate(-15, 60, 28)",
    torso: "translate(0, 0) rotate(-8, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-70, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(70, 74, 58)",
    leftForearm: "translate(0, 0) rotate(50, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-50, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-90, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-90, 68, 118)",
    leftShin: "translate(0, 0) rotate(10, 50, 148)",
    rightShin: "translate(0, 0) rotate(10, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Dip — arms pushing down at sides ─────────────────────────────────────
  dip: {
    figure: "translate(0, 20) scale(1)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-80, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(80, 74, 58)",
    leftForearm: "translate(0, 0) rotate(90, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-90, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-50, 52, 118)",
    rightThigh: "translate(0, 0) rotate(50, 68, 118)",
    leftShin: "translate(0, 0) rotate(70, 50, 148)",
    rightShin: "translate(0, 0) rotate(-70, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── L-sit — body upright, legs forward parallel ───────────────────────────
  lsit: {
    figure: "translate(0, 20) scale(1)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-90, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(90, 74, 58)",
    leftForearm: "translate(0, 0) rotate(90, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-90, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-100, 52, 118)",
    rightThigh: "translate(0, 0) rotate(100, 68, 118)",
    leftShin: "translate(0, 0) rotate(5, 50, 148)",
    rightShin: "translate(0, 0) rotate(-5, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Planche — body horizontal, arms locked, legs straight back ───────────
  planche: {
    figure: "translate(0, 70) scale(1)",
    head: "translate(0, 0) rotate(-25, 60, 28)",
    torso: "translate(0, 0) rotate(-10, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-50, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(50, 74, 58)",
    leftForearm: "translate(0, 0) rotate(40, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-40, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-100, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-100, 68, 118)",
    leftShin: "translate(0, 0) rotate(5, 50, 148)",
    rightShin: "translate(0, 0) rotate(5, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Pull-up — arms up gripping bar, body hanging ─────────────────────────
  pullup: {
    figure: "translate(0, -30) scale(1)",
    head: "translate(0, 0) rotate(5, 60, 28)",
    torso: "translate(0, 0) rotate(3, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(140, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-140, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-20, 38, 80)",
    rightForearm: "translate(0, 0) rotate(20, 82, 80)",
    leftThigh: "translate(0, 0) rotate(10, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-10, 68, 118)",
    leftShin: "translate(0, 0) rotate(-12, 50, 148)",
    rightShin: "translate(0, 0) rotate(12, 70, 148)",
    barOpacity: 1,
    barY: -20,
  },

  // ── Muscle-up — transition above the bar ─────────────────────────────────
  muscleup: {
    figure: "translate(0, -50) scale(1)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(100, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-100, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-60, 38, 80)",
    rightForearm: "translate(0, 0) rotate(60, 82, 80)",
    leftThigh: "translate(0, 0) rotate(15, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-15, 68, 118)",
    leftShin: "translate(0, 0) rotate(-10, 50, 148)",
    rightShin: "translate(0, 0) rotate(10, 70, 148)",
    barOpacity: 1,
    barY: 30,
  },

  // ── Handstand — fully inverted, body locked straight ─────────────────────
  handstand: {
    figure: "translate(0, 0) scale(1) rotate(180, 60, 120)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(5, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-5, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-3, 38, 80)",
    rightForearm: "translate(0, 0) rotate(3, 82, 80)",
    leftThigh: "translate(0, 0) rotate(3, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-3, 68, 118)",
    leftShin: "translate(0, 0) rotate(-2, 50, 148)",
    rightShin: "translate(0, 0) rotate(2, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Human flag — body horizontal, arms gripping vertical pole ────────────
  humanflag: {
    figure: "translate(10, 30) scale(1) rotate(-90, 60, 120)",
    head: "translate(0, 0) rotate(90, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(150, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-30, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-30, 38, 80)",
    rightForearm: "translate(0, 0) rotate(30, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-2, 52, 118)",
    rightThigh: "translate(0, 0) rotate(2, 68, 118)",
    leftShin: "translate(0, 0) rotate(1, 50, 148)",
    rightShin: "translate(0, 0) rotate(-1, 70, 148)",
    barOpacity: 1,
    barY: -80,
  },

  // ── Hover prep — push ─────────────────────────────────────────────────────
  prepare_push: {
    figure: "translate(0, 10) scale(1)",
    head: "translate(0, 0) rotate(-8, 60, 28)",
    torso: "translate(0, 0) rotate(-4, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-30, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(30, 74, 58)",
    leftForearm: "translate(0, 0) rotate(25, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-25, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-5, 52, 118)",
    rightThigh: "translate(0, 0) rotate(5, 68, 118)",
    leftShin: "translate(0, 0) rotate(-3, 50, 148)",
    rightShin: "translate(0, 0) rotate(3, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Hover prep — pull ─────────────────────────────────────────────────────
  prepare_pull: {
    figure: "translate(0, -15) scale(1)",
    head: "translate(0, 0) rotate(3, 60, 28)",
    torso: "translate(0, 0) rotate(2, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(90, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-90, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-10, 38, 80)",
    rightForearm: "translate(0, 0) rotate(10, 82, 80)",
    leftThigh: "translate(0, 0) rotate(5, 52, 118)",
    rightThigh: "translate(0, 0) rotate(-5, 68, 118)",
    leftShin: "translate(0, 0) rotate(-5, 50, 148)",
    rightShin: "translate(0, 0) rotate(5, 70, 148)",
    barOpacity: 1,
    barY: -10,
  },

  // ── Hover prep — balance (pre-handstand lean) ─────────────────────────────
  prepare_balance: {
    figure: "translate(0, 0) scale(1)",
    head: "translate(0, 0) rotate(-5, 60, 28)",
    torso: "translate(0, 0) rotate(-8, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(50, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(-50, 74, 58)",
    leftForearm: "translate(0, 0) rotate(-20, 38, 80)",
    rightForearm: "translate(0, 0) rotate(20, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-5, 52, 118)",
    rightThigh: "translate(0, 0) rotate(5, 68, 118)",
    leftShin: "translate(0, 0) rotate(3, 50, 148)",
    rightShin: "translate(0, 0) rotate(-3, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },

  // ── Hover prep — skill (L-sit prep) ──────────────────────────────────────
  prepare_skill: {
    figure: "translate(0, 15) scale(1)",
    head: "translate(0, 0) rotate(0, 60, 28)",
    torso: "translate(0, 0) rotate(0, 60, 80)",
    leftUpperArm: "translate(0, 0) rotate(-60, 46, 58)",
    rightUpperArm: "translate(0, 0) rotate(60, 74, 58)",
    leftForearm: "translate(0, 0) rotate(50, 38, 80)",
    rightForearm: "translate(0, 0) rotate(-50, 82, 80)",
    leftThigh: "translate(0, 0) rotate(-60, 52, 118)",
    rightThigh: "translate(0, 0) rotate(60, 68, 118)",
    leftShin: "translate(0, 0) rotate(5, 50, 148)",
    rightShin: "translate(0, 0) rotate(-5, 70, 148)",
    barOpacity: 0,
    barY: 0,
  },
};

/** Map website section IDs to character poses. */
export const SECTION_POSES: Record<string, PoseName> = {
  home: "standing",
  about: "pushup",
  skills: "dip",
  programs: "lsit",
  gallery: "planche",
  testimonials: "pullup",
  coaching: "muscleup",
  faq: "handstand",
  contact: "humanflag",
};
