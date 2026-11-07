import styled, { keyframes } from "styled-components";
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
// Auto-scrolling strip: the list is rendered twice and slides right-to-left,
// so it loops without a jump. Pauses on hover/touch; still for reduced motion.
const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const Viewport = styled.div`
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
`;
const Track = styled.div<{ $seconds: number }>`
  display: flex;
  gap: 16px;
  width: max-content;
  animation: ${scroll} ${({ $seconds }) => $seconds}s linear infinite;
  ${Viewport}:hover &,
  ${Viewport}:active & {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const Card = styled.figure`
  margin: 0;
  flex: 0 0 300px;
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

export const Testimonials = () => (
  <Section id="testimonials">
    <Wrap>
      <Head>
        <Tag>GOOGLE REVIEWS</Tag>
        <H>
          What our students <span>say</span>
        </H>
      </Head>

      {reviews.length > 0 ? (
        <Viewport>
          <Track $seconds={reviews.length * 3}>
            {[...reviews, ...reviews].map((r, i) => (
              <Card key={`${r.author}-${i}`} aria-hidden={i >= reviews.length || undefined}>
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
          </Track>
        </Viewport>
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
