import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ExternalLink, Star } from "lucide-react";
import googleReviews from "../data/googleReviews.json";
import { business } from "../data/business";

// Real Google reviews only: copied from the ICS Google listing (Nov 2026), or fetched
// at build time by scripts/fetch-reviews.mjs once the Places API key is set.
// No review/rating schema is emitted (Google ignores self-served review markup).

interface Review {
  author: string;
  authorUri: string;
  rating: number;
  text: string;
  relativeTime: string;
}

const reviews = googleReviews.reviews as Review[];
const reviewsUrl =
  business.googleBusinessProfile || googleReviews.googleMapsUri || business.maps;

const Section = styled.section`
  padding: 56px 16px;
  background: transparent;
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;
const Tag = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.16em;
  margin-bottom: 12px;
`;
const H = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  color: white;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
// Native swipe row: the reviews are plain HTML (visible instantly), the finger
// drags them directly, and each card snaps into place. A small timer moves to the
// next review every 3 seconds; touching/holding pauses it, and it resumes a few
// seconds after the visitor lets go. Only runs while the row is on screen.
const Row = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 16px;
  padding: 4px 16px 12px;
  margin: 0 -16px;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Card = styled.figure`
  margin: 0;
  flex: 0 0 min(300px, 82vw);
  scroll-snap-align: start;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  blockquote {
    margin: 0;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.6;
    font-size: 0.92rem;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  figcaption {
    margin-top: auto;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.muted};
    a,
    strong {
      color: white;
      font-weight: 700;
    }
  }
`;
const Stars = styled.div`
  display: flex;
  gap: 3px;
  color: ${({ theme }) => theme.colors.accent};
`;
const CTA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  width: fit-content;
  margin: 28px auto 0;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 106, 0, 0.45);
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  &:hover {
    background: rgba(255, 106, 0, 0.08);
  }
`;
const Empty = styled.p`
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`;

const STEP_MS = 3000; // time each review stays before moving on
const RESUME_MS = 4000; // pause after the visitor touches or swipes

export const Testimonials = () => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || reviews.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    let holding = false;
    let pausedUntil = 0;
    const pause = () => (pausedUntil = Date.now() + RESUME_MS);
    const down = () => {
      holding = true;
      pause();
    };
    const up = () => {
      holding = false;
      pause();
    };

    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.4 });
    io.observe(row);

    const tick = window.setInterval(() => {
      if (!onScreen || holding || Date.now() < pausedUntil || document.hidden) return;
      const card = row.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 12;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
      row.scrollTo({ left: atEnd ? 0 : row.scrollLeft + step, behavior: "smooth" });
    }, STEP_MS);

    row.addEventListener("touchstart", down, { passive: true });
    row.addEventListener("touchend", up, { passive: true });
    row.addEventListener("touchcancel", up, { passive: true });
    row.addEventListener("pointerdown", down);
    row.addEventListener("pointerup", up);
    row.addEventListener("mouseenter", down);
    row.addEventListener("mouseleave", up);
    row.addEventListener("wheel", pause, { passive: true });
    return () => {
      window.clearInterval(tick);
      io.disconnect();
      row.removeEventListener("touchstart", down);
      row.removeEventListener("touchend", up);
      row.removeEventListener("touchcancel", up);
      row.removeEventListener("pointerdown", down);
      row.removeEventListener("pointerup", up);
      row.removeEventListener("mouseenter", down);
      row.removeEventListener("mouseleave", up);
      row.removeEventListener("wheel", pause);
    };
  }, []);

  return (
  <Section id="testimonials">
    <Wrap>
      <Head>
        <Tag>GOOGLE REVIEWS</Tag>
        <H>
          What our students <span>say</span>
        </H>
      </Head>

      {reviews.length > 0 ? (
        <Row ref={rowRef} aria-label="Google reviews, swipe to see more">
            {reviews.map((r) => (
              <Card key={r.author}>
                <Stars aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={15} fill="currentColor" aria-hidden="true" />
                  ))}
                </Stars>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  {r.authorUri ? (
                    <a href={r.authorUri} target="_blank" rel="noopener noreferrer nofollow">
                      {r.author}
                    </a>
                  ) : (
                    <strong>{r.author}</strong>
                  )}{" "}
                  · Google review{r.relativeTime && ` · ${r.relativeTime}`}
                </figcaption>
              </Card>
            ))}
        </Row>
      ) : (
        <Empty>
          Read what students say about {business.name}, Madhapur, in their own
          words on Google.
        </Empty>
      )}

      <CTA href={reviewsUrl} target="_blank" rel="noopener noreferrer">
        {reviews.length > 0 ? "See all reviews on Google" : "Read our Google reviews"}
        <ExternalLink size={16} />
      </CTA>
    </Wrap>
  </Section>
);
};
