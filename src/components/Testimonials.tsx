import styled from "styled-components";
import { ExternalLink, Star } from "lucide-react";
import googleReviews from "../data/googleReviews.json";
import { business } from "../data/business";

// Real Google reviews only, fetched at build time by scripts/fetch-reviews.mjs.
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
  background: #0A0A0A;
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
const Grid = styled.div`
  display: grid;
  gap: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Card = styled.figure`
  margin: 0;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  blockquote {
    margin: 0;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.7;
    font-size: 0.95rem;
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
        <Grid>
          {reviews.map((r) => (
            <Card key={r.author + r.relativeTime}>
              <Stars aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" aria-hidden="true" />
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
        </Grid>
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
