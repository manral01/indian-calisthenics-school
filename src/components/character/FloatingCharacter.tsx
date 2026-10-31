/**
 * FloatingCharacter
 *
 * Fixed-position character panel that lives on the right edge of the viewport.
 * It wires together:
 *   - useScrollSection  → which section the user is in
 *   - CharacterContext  → hover / click overrides from other components
 *   - CalisthenicsCharacter → the animated SVG figure
 *
 * Layout:
 *   Desktop (≥1024px): fixed right panel, vertically centred.
 *   Tablet / Mobile: hidden (performance & space concerns).
 *
 * Visual layers (bottom → top):
 *   1. Faint radial glow behind the character
 *   2. Subtle section label (pose name) in small all-caps orange text
 *   3. CalisthenicsCharacter SVG
 *   4. Motion-trail dots that fade in when the pose changes
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CalisthenicsCharacter } from "./CalisthenicsCharacter";
import { useCharacter } from "./CharacterContext";
import { POSES, SECTION_POSES, type PoseName } from "./poses";
import { useScrollSection } from "./useScrollSection";

// ─── Styled components ────────────────────────────────────────────────────────

const pulseRing = keyframes`
  0%   { transform: scale(0.85); opacity: 0.5; }
  100% { transform: scale(1.25); opacity: 0;   }
`;

/** Outer wrapper — hidden below 1024 px */
const Wrapper = styled.div<{ $hidden: boolean }>`
  /* hidden on mobile / tablet */
  display: none;
  /* faded out over the 3D hero so it doesn't collide with the rings */
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  transition: opacity 0.5s ease;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 28px;
    top: 0;
    bottom: 0;
    width: 160px;
    pointer-events: none; /* never intercept page clicks */
    z-index: 40;
  }

  @media (min-width: 1280px) {
    right: 40px;
    width: 180px;
  }
`;

/** Ambient radial glow behind the figure */
const Glow = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 106, 0, 0.13) 0%,
    transparent 70%
  );
  pointer-events: none;
`;

/** Pulse ring that fires on pose change */
const PulseRing = styled.span`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgba(255, 106, 0, 0.4);
  animation: ${pulseRing} 0.7s ease-out forwards;
  pointer-events: none;
`;

/** Small label showing the active pose / section */
const PoseLabel = styled(motion.span)`
  position: absolute;
  bottom: calc(50% - 140px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: rgba(255, 106, 0, 0.65);
  white-space: nowrap;
  text-transform: uppercase;
  pointer-events: none;
  font-family: Inter, system-ui, sans-serif;
`;

/** Thin vertical track line hinting at the scroll journey */
const TrackLine = styled.div`
  position: absolute;
  left: 50%;
  top: 12%;
  bottom: 12%;
  width: 1px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 106, 0, 0.18) 20%,
    rgba(255, 106, 0, 0.18) 80%,
    transparent 100%
  );
  pointer-events: none;
`;

/** Progress dot on the track that moves with scroll */
const TrackDot = styled(motion.div)`
  position: absolute;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #FF6A00;
  transform: translateX(-50%);
  box-shadow: 0 0 8px rgba(255, 106, 0, 0.7);
  pointer-events: none;
`;

// ─── Section metadata ─────────────────────────────────────────────────────────

const SECTION_ORDER = [
  "home",
  "about",
  "skills",
  "programs",
  "gallery",
  "testimonials",
  "coaching",
  "faq",
  "contact",
] as const;

const POSE_LABELS: Record<PoseName, string> = {
  standing: "STANDING",
  pushup: "PUSH-UP",
  dip: "DIP",
  lsit: "L-SIT",
  planche: "PLANCHE",
  pullup: "PULL-UP",
  muscleup: "MUSCLE-UP",
  handstand: "HANDSTAND",
  humanflag: "HUMAN FLAG",
  prepare_push: "PUSH",
  prepare_pull: "PULL",
  prepare_balance: "BALANCE",
  prepare_skill: "SKILL",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const FloatingCharacter = () => {
  const section = useScrollSection();
  const { overridePose } = useCharacter();

  // Resolve the active pose: override wins, otherwise scroll-driven
  const scrollPose = (SECTION_POSES[section] ?? "standing") as PoseName;
  const activePose: PoseName = overridePose ?? scrollPose;

  // Track previous pose to fire the pulse ring on change
  const prevPoseRef = useRef<PoseName>(activePose);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (prevPoseRef.current !== activePose) {
      prevPoseRef.current = activePose;
      setPulseKey((k) => k + 1);
    }
  }, [activePose]);

  // Scroll progress (0 → 1) for the track dot
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(scrolled / total, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section index (0-based) for the track dot position fallback
  const sectionIndex = SECTION_ORDER.indexOf(
    section as (typeof SECTION_ORDER)[number]
  );
  const sectionProgress =
    sectionIndex >= 0 ? sectionIndex / (SECTION_ORDER.length - 1) : 0;

  // Use whichever gives finer granularity
  const trackProgress = scrollProgress || sectionProgress;

  // Glow intensity — stronger on override (interaction)
  const glowOpacity = overridePose ? 0.85 : 0.45;

  const poseBody = POSES[activePose];

  return (
    <Wrapper $hidden={section === "home"}>
      <TrackLine />

      {/* Scroll progress dot */}
      <TrackDot
        animate={{ top: `${12 + trackProgress * 76}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
      />

      {/* Ambient glow */}
      <Glow
        animate={{ opacity: glowOpacity, scale: overridePose ? 1.15 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Pulse ring on pose change */}
      <AnimatePresence>
        <PulseRing key={pulseKey} />
      </AnimatePresence>

      {/* The figure */}
      <motion.div
        animate={{
          y: overridePose ? -8 : 0,
          filter: overridePose
            ? "drop-shadow(0 0 18px rgba(255, 106, 0,0.55))"
            : "drop-shadow(0 4px 12px rgba(0,0,0,0.7))",
        }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <CalisthenicsCharacter pose={poseBody} size={148} />
      </motion.div>

      {/* Pose label */}
      <AnimatePresence mode="wait">
        <PoseLabel
          key={activePose}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {POSE_LABELS[activePose]}
        </PoseLabel>
      </AnimatePresence>
    </Wrapper>
  );
};
