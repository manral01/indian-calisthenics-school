import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonialsData } from "../data/testimonials";

// ─── How many cards are visible at each breakpoint ───────────────────────────
// We read this at runtime so the JS and CSS stay in sync.
function getVisible(): number {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

const AUTO_DELAY = 4000; // ms between auto-advances

// ─── Styled components (existing card design preserved) ───────────────────────

const Section = styled.section`
  padding: 100px 16px;
  background: #050505;
  overflow: hidden;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Head = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 0.12em;
  margin-bottom: 12px;
`;

const H = styled.h2`
  font-size: clamp(2.6rem, 5vw, 4.1rem);
  font-weight: 900;
  color: white;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;

// Outer clip — hides overflow cards; fade edges via pseudo-elements
const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    z-index: 2;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, #050505, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, #050505, transparent);
  }
`;

// The sliding track — draggable
const Track = styled(motion.div)`
  display: flex;
  gap: 20px;
  will-change: transform;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

// Single card — width is set inline to respond to visible count
const Card = styled.div`
  flex-shrink: 0;
  padding: 34px 25px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
  user-select: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 32px;
  }
`;

const Avatar = styled.div`
  display: grid;
  place-items: center;
  width: 66px;
  height: 66px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
  font-weight: 900;
  font-size: 1.3rem;
  border: 4px solid rgba(255, 106, 0, 0.25);
  box-shadow: 0 10px 22px rgba(255, 106, 0, 0.22);
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 14px;
`;

const Text = styled.p`
  font-size: clamp(0.92rem, 1.6vw, 1.05rem);
  font-weight: 500;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.07em;
  color: white;
`;

const Label = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
`;

// Progress dots + arrows
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

const Btn = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
  border: none;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s;
  &:hover {
    opacity: 0.85;
    transform: scale(1.08);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "20px" : "7px")};
  height: 7px;
  border-radius: 99px;
  border: none;
  cursor: pointer;
  background: ${({ $active, theme }) => ($active ? theme.colors.orange : "rgba(255,255,255,.2)")};
  transition:
    width 0.3s,
    background 0.3s;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export const Testimonials = () => {
  const prefersReduced = useReducedMotion();
  const total = testimonialsData.length;

  const [visible, setVisible] = useState(getVisible);
  const [index, setIndex] = useState(0); // first visible card index
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clamp index when visible count changes
  useEffect(() => {
    setIndex((i) => Math.min(i, total - visible));
  }, [visible, total]);

  const clamp = useCallback(
    (n: number) => Math.max(0, Math.min(n, total - visible)),
    [total, visible],
  );

  const goTo = useCallback((n: number) => setIndex(clamp(n)), [clamp]);

  const next = useCallback(() => {
    setIndex((i) => {
      const next = i + 1;
      // wrap around
      return next > total - visible ? 0 : next;
    });
  }, [total, visible]);

  const prev = useCallback(() => {
    setIndex((i) => {
      const prev = i - 1;
      return prev < 0 ? total - visible : prev;
    });
  }, [total, visible]);

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused && !prefersReduced) {
      timerRef.current = setTimeout(() => {
        next();
      }, AUTO_DELAY);
    }
  }, [paused, prefersReduced, next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, resetTimer]);

  // Pause/resume helpers
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  // Card width calculation: full track width shared equally minus gaps
  // We express it as a percentage so styled-components doesn't need JS
  const GAP = 20; // px — must match styled-components gap above
  // translateX offset
  // Each card occupies (100 / visible)% of viewport width minus gap adjustment
  // We use a simpler approach: measure the track container at render-time
  // and drive the translate with Framer Motion's x.

  // Compute pixel offset based on track width
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackW = trackRef.current.parentElement?.clientWidth ?? 0;
        setCardWidth((trackW - GAP * (visible - 1)) / visible);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  const translateX = -(index * (cardWidth + GAP));

  return (
    <Section id="testimonials">
      <Wrap>
        <Head>
          <Tag>MEMBER STORIES</Tag>
          <H>
            RESULTS <span>SPEAK.</span>
          </H>
        </Head>

        <Viewport
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <Track
            ref={trackRef}
            animate={{ x: prefersReduced ? 0 : translateX }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
              mass: 1,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragStart={pause}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
              resume();
            }}
          >
            {testimonialsData.map((t) => (
              <Card
                key={t.name}
                style={{
                  width: cardWidth > 0 ? cardWidth : undefined,
                  // fallback before first measure
                  minWidth:
                    cardWidth > 0
                      ? cardWidth
                      : `calc(${100 / visible}% - ${GAP}px)`,
                }}
              >
                <Avatar aria-hidden="true">{t.initials}</Avatar>
                <Stars aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, x) => (
                    <Star key={x} size={16} fill="currentColor" />
                  ))}
                </Stars>
                <Quote
                  size={22}
                  color="#FF6A00"
                  style={{ margin: "0 auto 12px" }}
                  aria-hidden="true"
                />
                <Text>{t.quote}</Text>
                <Name>{t.name}</Name>
                <Label>{t.label}</Label>
              </Card>
            ))}
          </Track>
        </Viewport>

        <Controls>
          <Btn
            onClick={() => {
              prev();
              pause();
              resume();
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </Btn>
          <Dots role="tablist" aria-label="Testimonial navigation">
            {Array.from({ length: total - visible + 1 }).map((_, idx) => (
              <Dot
                key={idx}
                $active={idx === index}
                role="tab"
                aria-selected={idx === index}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                  goTo(idx);
                  pause();
                  resume();
                }}
              />
            ))}
          </Dots>
          <Btn
            onClick={() => {
              next();
              pause();
              resume();
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </Btn>
        </Controls>
      </Wrap>
    </Section>
  );
};
