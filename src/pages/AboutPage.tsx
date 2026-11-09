import styled, { keyframes } from "styled-components";
import { Award } from "lucide-react";
import { business } from "../data/business";
import { images } from "../data/images";
import { programList } from "../data/programPages";
import { Link } from "../router";
import {
  Bullets,
  Container,
  ContactActions,
  H2,
  Img,
  Lead,
  PageHeader,
  PageSection,
} from "../components/ui";

const FounderCard = styled.div`
  display: grid;
  gap: 28px;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  h3 {
    font-size: 1.6rem;
    margin-bottom: 6px;
  }
`;
const Creds = styled.ul`
  display: grid;
  gap: 12px;
  li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    line-height: 1.6;
  }
  svg {
    flex: none;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
// Founder photos cross-fade one at a time, 3 seconds each.
const FOUNDER_SLIDE_SECONDS = 3;
const FOUNDER_PHOTOS = [
  { src: "/founder/aman-beach.webp", w: 1021, h: 1400, pos: "center", alt: "Aman Bisht, founder and owner of Indian Calisthenics School" },
  { src: "/founder/aman-start-flag.webp", w: 1600, h: 2000, pos: "center 40%", alt: "Aman Bisht flagging off a community run in Hyderabad" },
  { src: "/founder/aman-stage-talk.webp", w: 1800, h: 1200, pos: "46% center", alt: "Aman Bisht speaking on stage at a calisthenics event" },
  { src: "/founder/aman-judging.webp", w: 1598, h: 1066, pos: "51% center", alt: "Aman Bisht judging a calisthenics competition" },
  { src: "/founder/aman-namaste.webp", w: 1598, h: 1066, pos: "42% center", alt: "Aman Bisht greeting the crowd at a calisthenics competition" },
];
const fade = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
  20% { opacity: 1; }
  25% { opacity: 0; }
  100% { opacity: 0; }
`;
const Slides = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    animation: ${fade} ${FOUNDER_PHOTOS.length * FOUNDER_SLIDE_SECONDS}s linear infinite both;
  }
  img:first-child {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    img {
      animation: none;
    }
  }
`;
const FounderGrid = styled.div`
  display: grid;
  gap: 28px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: center;
  }
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  margin-bottom: 18px;
`;
const Wide = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  margin-top: 32px;
  img {
    width: 100%;
    height: auto;
  }
`;

export const AboutPage = () => (
  <>
    <PageHeader
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
      eyebrow="Our story"
      title="About Indian Calisthenics School, Hyderabad"
      intro={[
        `${business.name} is a calisthenics academy in Madhapur, near Mindspace and HITEC City, Hyderabad. We teach people to build real strength and control using their own bodyweight, from their first push-up to advanced skills.`,
        `Our belief is simple: "${business.tagline}."`,
      ]}
      image={images.spotKids}
    />

    <PageSection $alt>
      <Container style={{ maxWidth: 900 }}>
        <H2>The founder</H2>
        <FounderCard>
          <FounderGrid>
          <Slides>
            {FOUNDER_PHOTOS.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading={i === 0 ? "eager" : "lazy"}
                style={{ objectPosition: p.pos, animationDelay: `${i * FOUNDER_SLIDE_SECONDS - FOUNDER_SLIDE_SECONDS / 4}s` }}
              />
            ))}
          </Slides>
          <div>
            <h3>{business.founder.name}</h3>
            <Role>Founder &amp; owner</Role>
            <Creds>
              {business.founder.credentials.map((c) => (
                <li key={c}>
                  <Award size={18} aria-hidden="true" />
                  {c === "Founder of Hyderabad Calisthenics" ? (
                    <span>
                      Founder of{" "}
                      <a
                        href={business.hyderabadCalisthenicsInstagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "underline" }}
                      >
                        Hyderabad Calisthenics
                      </a>
                    </span>
                  ) : (
                    c
                  )}
                </li>
              ))}
            </Creds>
            <Lead style={{ marginTop: 18 }}>
              Aman founded and runs Indian Calisthenics School. Our group batches are led by our coaching team, and
              Aman works with personal training clients.
            </Lead>
            <Lead>
              <Link to="/aman-bisht" style={{ textDecoration: "underline", color: "#FF6A00", fontWeight: 700 }}>
                Read Aman's story
              </Link>
            </Lead>
          </div>
          </FounderGrid>
        </FounderCard>
      </Container>
    </PageSection>

    <PageSection>
      <Container>
        <H2>How we coach</H2>
        <Bullets>
          <li>Structured progressions: every exercise is scaled to your current level.</li>
          <li>Form first: coaches correct technique before adding difficulty.</li>
          <li>All levels in one room: complete beginners and advanced athletes train side by side.</li>
          <li>Strength, mobility and skill, trained together rather than in isolation.</li>
        </Bullets>
        <Wide>
          <Img image={images.community} sizes="(min-width: 1120px) 1120px, 100vw" />
        </Wide>
      </Container>
    </PageSection>

    <PageSection $alt>
      <Container>
        <H2>What we teach</H2>
        <Lead>
          {programList.map((p, i) => (
            <span key={p.path}>
              {i > 0 && (i === programList.length - 1 ? " and " : ", ")}
              <Link to={p.path} style={{ textDecoration: "underline" }}>
                {p.name.toLowerCase()}
              </Link>
            </span>
          ))}
          , plus strength, mobility and open gym, all in Madhapur, Hyderabad.
        </Lead>
        <ContactActions />
      </Container>
    </PageSection>
  </>
);
