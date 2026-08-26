import { useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { programsData } from "../data/programs";

// ─── Layout ───────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 100px 16px;
  background: #0d0d0d;
`;
const Wrap = styled.div`
  max-width: 1100px;
  margin: auto;
`;
const Intro = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 42px;
`;
const Tag = styled.div`
  display: inline-block;
  padding: 8px 15px;
  border-radius: 99px;
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
`;
const H = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: white;
`;
const Grid = styled.div`
  display: grid;
  gap: 19px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ─── Card wrapper — handles lift, border glow, sweep ──────────────────────────
//
// The light-sweep is a ::before pseudo-element that slides from left to right on
// hover via a CSS background-position transition.  It sits above the card
// background but below the content (z-index layering via isolation).
//
// The 3D tilt is applied directly to the motion.article element via inline style
// (rotateX / rotateY spring values) — no layout impact whatsoever.
//
const Card = styled(motion.article)<{ $featured: boolean }>`
  /* --- base --- */
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $featured, theme }) => ($featured ? theme.gradients.fire : "#151515")};
  color: ${({ $featured }) => ($featured ? "white" : "inherit")};
  border: 1px solid
    ${({ $featured }) => ($featured ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)")};
  box-shadow: ${({ $featured, theme }) =>
    $featured
      ? `${theme.shadows.glow}, ${theme.shadows.card}`
      : theme.shadows.card};

  /* isolate stacking context so ::before doesn't bleed */
  isolation: isolate;

  /* all transitions in one place */
  transition:
    transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 300ms ease;

  /* --- light-sweep pseudo-element --- */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /* wide gradient so the bright centre travels fully across */
    background: linear-gradient(
      115deg,
      transparent 0%,
      rgba(255, 140, 50, 0) 30%,
      rgba(255, 140, 50, 0.09) 48%,
      rgba(255, 160, 60, 0.12) 52%,
      rgba(255, 140, 50, 0) 70%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-position: -100% 0;
    pointer-events: none;
    z-index: 0;
    transition:
      background-position 500ms ease,
      opacity 300ms ease;
    opacity: 0;
  }

  /* make sure card children sit above the sweep layer */
  & > * {
    position: relative;
    z-index: 1;
  }

  /* ── desktop hover only ────────────────────────────────────── */
  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px) scale(1.015);

      /* non-featured: orange border + glow */
      ${({ $featured }) =>
        !$featured &&
        `
        border-color: rgba(255, 106, 0, .55);
        box-shadow:
          0 0 0 1px rgba(255,106,0,.20),
          0 12px 32px rgba(255,106,0,.18),
          0 28px 56px rgba(0,0,0,.55);
      `}

      /* featured: stronger glow, keep fire gradient border hint */
      ${({ $featured }) =>
        $featured &&
        `
        border-color: rgba(255,255,255,.30);
        box-shadow:
          0 0 0 1px rgba(255,255,255,.15),
          0 16px 42px rgba(255,106,0,.55),
          0 32px 72px rgba(255,77,0,.40);
      `}
    }

    /* trigger the sweep on hover */
    &:hover::before {
      background-position: 200% 0;
      opacity: 1;
    }
  }

  /* ── reduced motion: strip movement, keep colour transition ── */
  @media (prefers-reduced-motion: reduce) {
    transition:
      box-shadow 300ms ease,
      border-color 300ms ease;
    &:hover {
      transform: none;
    }
    &::before {
      display: none;
    }
  }
`;

// ─── Price — scales up on card hover ─────────────────────────────────────────
const Price = styled.div<{ $featured: boolean }>`
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 18px;
  color: ${({ $featured, theme }) => ($featured ? "white" : theme.colors.orange)};
  display: inline-block; /* needed so transform doesn't stretch full width */
  transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1);

  @media (hover: hover) {
    ${Card}:hover & {
      transform: scale(1.05);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    ${Card}:hover & {
      transform: none;
    }
  }
`;

// ─── CTA — lifts and arrow slides right on card hover ────────────────────────
const CTA = styled.a<{ $featured: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 13px;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 900;
  background: ${({ $featured }) => ($featured ? "rgba(255,255,255,.95)" : "rgba(255,106,0,1)")};
  color: ${({ $featured }) => ($featured ? "#D94F00" : "white")};
  transition:
    transform 280ms ease,
    filter 280ms ease;

  /* arrow icon */
  svg {
    transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @media (hover: hover) {
    ${Card}:hover & {
      transform: translateY(-2px);
      filter: brightness(1.08);
    }
    ${Card}:hover & svg {
      transform: translateX(4px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    ${Card}:hover & {
      transform: none;
      filter: none;
    }
    ${Card}:hover & svg {
      transform: none;
    }
  }
`;

// ─── Remaining card internals (unchanged) ────────────────────────────────────
const Level = styled.div`
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 12px;
`;
const Title = styled.h3`
  font-size: 1.85rem;
  font-weight: 900;
  margin-bottom: 8px;
  color: white;
`;
const Duration = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 17px;
  color: ${({ theme }) => theme.colors.muted};
`;
const Copy = styled.p`
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.muted};
`;
const Features = styled.ul`
  flex: 1;
  margin-bottom: 24px;
  li {
    display: flex;
    gap: 8px;
    font-size: 0.8rem;
    margin: 10px 0;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.muted};
  }
  svg {
    flex: none;
    color: currentColor;
  }
`;

// ─── Tilt card wrapper ────────────────────────────────────────────────────────
// Implements a gentle mouse-follow 3D tilt using Framer Motion spring values.
// Max rotation is ±2deg. Falls back to a plain div on touch/reduced-motion.

const TILT_MAX = 2; // degrees

interface TiltCardProps {
  featured: boolean;
  children: React.ReactNode;
  animateProps: object;
}

function TiltCard({ featured, children, animateProps }: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  // Raw motion values updated on mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-damp the raw values for a smooth, lag feel
  const springConfig = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotX = useSpring(rawX, springConfig);
  const rotY = useSpring(rawY, springConfig);

  // Map to degrees
  const rotateX = useTransform(rotX, [-1, 1], [TILT_MAX, -TILT_MAX]);
  const rotateY = useTransform(rotY, [-1, 1], [-TILT_MAX, TILT_MAX]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // normalise to -1…1
    rawX.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    rawY.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <Card
      ref={ref as React.Ref<HTMLElement>}
      $featured={featured}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...animateProps}
    >
      {children}
    </Card>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Programs = () => (
  <Section id="programs">
    <Wrap>
      <Intro>
        <Tag>MEMBERSHIP PRICING</Tag>
        <H>
          CHOOSE YOUR
          <br />
          TRAINING PLAN.
        </H>
      </Intro>
      <Grid>
        {programsData.map((p, i) => (
          <TiltCard
            key={p.name}
            featured={i === 3}
            animateProps={{
              initial: { opacity: 0, y: 25 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
            }}
          >
            <Level>{p.level}</Level>
            <Title>{p.name}</Title>
            {p.duration && <Duration>{p.duration}</Duration>}
            <Copy>{p.description}</Copy>
            {p.features.length > 0 && (
              <Features>
                {p.features.map((x) => (
                  <li key={x}>
                    <Check size={15} />
                    {x}
                  </li>
                ))}
              </Features>
            )}
            <Price $featured={i === 3}>{p.price}</Price>
            <CTA $featured={i === 3} href="#contact">
              JOIN NOW <ArrowRight size={15} />
            </CTA>
          </TiltCard>
        ))}
      </Grid>
    </Wrap>
  </Section>
);
