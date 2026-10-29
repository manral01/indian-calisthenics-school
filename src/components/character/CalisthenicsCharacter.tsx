/**
 * CalisthenicsCharacter
 *
 * A minimal, faceless, athletic SVG figure drawn entirely with SVG primitives.
 * Each body part is individually animated by Framer Motion so the character
 * transitions smoothly between calisthenics poses.
 *
 * Design language:
 *  - Faceless oval head
 *  - Clean stroke-based limbs (no fill, rounded linecaps)
 *  - Orange accent on the core / torso
 *  - Subtle glow filter
 *  - A thin "bar" element used for pull-up / muscle-up / human-flag context
 */

import { motion } from "framer-motion";
import { type BodyPose } from "./poses";

// ─── Transition preset ────────────────────────────────────────────────────────
// Spring that feels weighty and physical — slow enough to read, fast enough to feel responsive.
const SPRING = {
  type: "spring" as const,
  stiffness: 55,
  damping: 14,
  mass: 0.9,
};

interface Props {
  pose: BodyPose;
  size?: number; // rendered width in px; height auto-scales from 120:240 viewBox
}

export const CalisthenicsCharacter = ({ pose, size = 140 }: Props) => {
  const height = size * 2;

  // Stroke widths scale with size so the figure doesn't look too thick/thin
  const sw = {
    head: 5.5,
    torso: 6.5,
    limb: 5,
    joint: 4.5,
  };

  // Colours
  const C = {
    stroke: "rgba(255,255,255,0.92)",
    accent: "#FF6A00",
    glow: "rgba(255, 106, 0,0.35)",
    bar: "rgba(255,255,255,0.30)",
    shadow: "rgba(0,0,0,0.55)",
  };

  return (
    <svg
      viewBox="0 0 120 240"
      width={size}
      height={height}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Soft orange-tinted glow filter for the torso */}
        <filter id="char-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Subtle drop shadow for depth */}
        <filter id="char-shadow" x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="6"
            floodColor={C.shadow}
            floodOpacity="0.9"
          />
        </filter>
      </defs>

      {/* ── Figure root — handles whole-body translations (push-up offset etc.) ── */}
      <motion.g
        animate={{ transform: pose.figure }}
        transition={SPRING}
        filter="url(#char-shadow)"
      >
        {/* ── Pull-up / muscle-up bar ── */}
        <motion.g
          animate={{ opacity: pose.barOpacity, transform: `translate(0, ${pose.barY})` }}
          transition={SPRING}
        >
          {/* Horizontal bar */}
          <line
            x1="10"
            y1="20"
            x2="110"
            y2="20"
            stroke={C.bar}
            strokeWidth={5}
          />
          {/* Left upright */}
          <line x1="15" y1="20" x2="15" y2="-8" stroke={C.bar} strokeWidth={3.5} />
          {/* Right upright */}
          <line x1="105" y1="20" x2="105" y2="-8" stroke={C.bar} strokeWidth={3.5} />
        </motion.g>

        {/* ── Head ── */}
        <motion.g animate={{ transform: pose.head }} transition={SPRING}>
          {/* Oval head — faceless */}
          <ellipse
            cx="60"
            cy="24"
            rx="11"
            ry="13"
            stroke={C.stroke}
            strokeWidth={sw.head}
          />
          {/* Neck */}
          <line
            x1="60"
            y1="37"
            x2="60"
            y2="46"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Torso — orange accent, glow filter ── */}
        <motion.g animate={{ transform: pose.torso }} transition={SPRING}>
          {/* Shoulder line */}
          <line
            x1="42"
            y1="54"
            x2="78"
            y2="54"
            stroke={C.stroke}
            strokeWidth={sw.torso}
          />
          {/* Spine */}
          <line
            x1="60"
            y1="54"
            x2="60"
            y2="112"
            stroke={C.accent}
            strokeWidth={sw.torso}
            filter="url(#char-glow)"
          />
          {/* Hip line */}
          <line
            x1="46"
            y1="112"
            x2="74"
            y2="112"
            stroke={C.stroke}
            strokeWidth={sw.torso}
          />
        </motion.g>

        {/* ── Left Upper Arm ── */}
        <motion.g
          animate={{ transform: pose.leftUpperArm }}
          transition={SPRING}
        >
          <line
            x1="42"
            y1="58"
            x2="34"
            y2="82"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Left Forearm ── */}
        <motion.g animate={{ transform: pose.leftForearm }} transition={SPRING}>
          <line
            x1="34"
            y1="82"
            x2="28"
            y2="104"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Right Upper Arm ── */}
        <motion.g
          animate={{ transform: pose.rightUpperArm }}
          transition={SPRING}
        >
          <line
            x1="78"
            y1="58"
            x2="86"
            y2="82"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Right Forearm ── */}
        <motion.g
          animate={{ transform: pose.rightForearm }}
          transition={SPRING}
        >
          <line
            x1="86"
            y1="82"
            x2="92"
            y2="104"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Left Thigh ── */}
        <motion.g animate={{ transform: pose.leftThigh }} transition={SPRING}>
          <line
            x1="50"
            y1="116"
            x2="44"
            y2="148"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Left Shin ── */}
        <motion.g animate={{ transform: pose.leftShin }} transition={SPRING}>
          <line
            x1="44"
            y1="148"
            x2="41"
            y2="180"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
          {/* Foot */}
          <line
            x1="41"
            y1="180"
            x2="33"
            y2="180"
            stroke={C.stroke}
            strokeWidth={sw.joint}
          />
        </motion.g>

        {/* ── Right Thigh ── */}
        <motion.g animate={{ transform: pose.rightThigh }} transition={SPRING}>
          <line
            x1="70"
            y1="116"
            x2="76"
            y2="148"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
        </motion.g>

        {/* ── Right Shin ── */}
        <motion.g animate={{ transform: pose.rightShin }} transition={SPRING}>
          <line
            x1="76"
            y1="148"
            x2="79"
            y2="180"
            stroke={C.stroke}
            strokeWidth={sw.limb}
          />
          {/* Foot */}
          <line
            x1="79"
            y1="180"
            x2="87"
            y2="180"
            stroke={C.stroke}
            strokeWidth={sw.joint}
          />
        </motion.g>

        {/* ── Joint dots — add physicality to the figure ── */}
        {[
          { cx: 42, cy: 58 }, // left shoulder
          { cx: 78, cy: 58 }, // right shoulder
          { cx: 34, cy: 82 }, // left elbow
          { cx: 86, cy: 82 }, // right elbow
          { cx: 50, cy: 116 }, // left hip
          { cx: 70, cy: 116 }, // right hip
          { cx: 44, cy: 148 }, // left knee
          { cx: 76, cy: 148 }, // right knee
        ].map(({ cx, cy }) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={3.2}
            fill={C.accent}
            stroke="none"
          />
        ))}
      </motion.g>
    </svg>
  );
};
