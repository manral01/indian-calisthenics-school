import styled from "styled-components";
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
          <div>
            <h3>{business.founder.name}</h3>
            <Role>Founder &amp; head coach</Role>
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
          </div>
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
