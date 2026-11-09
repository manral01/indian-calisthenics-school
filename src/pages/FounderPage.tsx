import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { business } from "../data/business";
import { Link } from "../router";
import { Container, ContactActions, H2, Lead, PageHeader, PageSection } from "../components/ui";

// Aman's profile, told as a timeline. The longer story lives on the
// Calisthenics Lab India site; this page links to it instead of repeating it.
// Only add facts Aman has confirmed.
const INSTAGRAM = "https://www.instagram.com/gravity_antagonist_sw";
const FULL_STORY = "https://www.calisthenicslabindia.club/aman-bisht";

const MILESTONES = [
  {
    when: "Around 2019",
    title: "Starts coaching in Dehradun, free of charge",
    text: "Aman begins teaching calisthenics in his home town of Dehradun, Uttarakhand, without charging. Two of the athletes he trains there, Ankush Dhiman and Shivani Bamrara, later win national championships and represent India.",
  },
  {
    when: "Hyderabad",
    title: "Builds the Hyderabad Calisthenics community",
    text: "After moving to Hyderabad he teaches in parks and gyms, and the same year starts Hyderabad Calisthenics so that the city's separate training groups can meet. The first meetup has five to ten people. Events now draw 40 to 50.",
  },
  {
    when: "2023",
    title: "Represents India in Italy",
    text: "Competes for India at the Burningate calisthenics championship.",
  },
  {
    when: "2024",
    title: "Represents India in Russia",
    text: "A second international appearance for India.",
  },
  {
    when: "2024 · Mumbai",
    title: "Third in Asia",
    text: "At the Asian Championship of Freestyle, held at All India Strength Wars 5.0 in Mumbai, he finishes second among Indian athletes and third in Asia.",
  },
  {
    when: "Today",
    title: "Two academies and hundreds of workshops",
    text: "He runs Indian Calisthenics School in Madhapur and Calisthenics Lab India in Kondapur, has taught hundreds of workshops in schools, colleges and corporate offices, and judges calisthenics competitions all over India.",
  },
];

const Timeline = styled.ol`
  display: grid;
  gap: 0;
  max-width: 760px;
  li {
    position: relative;
    padding: 0 0 32px 28px;
    border-left: 2px solid rgba(255, 106, 0, 0.35);
  }
  li:last-child {
    padding-bottom: 0;
    border-left-color: transparent;
  }
  li::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
  h3 {
    font-size: 1.2rem;
    margin: 4px 0 8px;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.7;
  }
`;
const When = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;
const Photos = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 28px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;
const More = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  margin-top: 22px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 106, 0, 0.5);
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  &:hover {
    background: rgba(255, 106, 0, 0.08);
  }
`;

export const FounderPage = () => (
  <>
    <PageHeader
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Aman Bisht", path: "/aman-bisht" },
      ]}
      eyebrow="Founder"
      title="Aman Bisht"
      intro={[
        "Aman Bisht is a calisthenics athlete and coach from Dehradun who lives in Hyderabad. He is a 3× national calisthenics champion, has represented India three times, and founded Indian Calisthenics School, Calisthenics Lab India and the Hyderabad Calisthenics community.",
      ]}
      image={{
        src: "/founder/aman-stage-talk.webp",
        width: 1800,
        height: 1200,
        alt: "Aman Bisht speaking on stage at a calisthenics event",
      }}
    />

    <PageSection $alt>
      <Container>
        <H2>Aman's journey so far</H2>
        <Timeline>
          {MILESTONES.map((m) => (
            <li key={m.title}>
              <When>{m.when}</When>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </li>
          ))}
        </Timeline>
      </Container>
    </PageSection>

    <PageSection>
      <Container>
        <H2>A coach who trains coaches</H2>
        <Lead>
          Both athletes Aman trained in Dehradun now coach alongside him in Hyderabad. Coaches who were already teaching
          in the city have also worked with him on technique.
        </Lead>
        <Lead>
          At {business.name} he is the founder and owner. Group batches are led by the coaching team, and Aman takes
          personal training clients. <Link to="/about" style={{ textDecoration: "underline" }}>More about the school</Link>. Follow Aman on{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener me" style={{ textDecoration: "underline" }}>Instagram</a>.
        </Lead>
        <Photos>
          <img src="/founder/aman-judging.webp" alt="Aman Bisht on the judging panel at a calisthenics competition" width={1598} height={1066} loading="lazy" />
          <img src="/founder/aman-start-flag.webp" alt="Aman Bisht flagging off a Hyderabad Calisthenics community run" width={1600} height={2000} loading="lazy" style={{ objectPosition: "center 40%" }} />
        </Photos>
        <More href={FULL_STORY} target="_blank" rel="noopener">
          Read Aman's full story <ArrowRight size={16} />
        </More>
        <ContactActions whatsappText="Hi! I read about Aman Bisht and would like to get in touch." />
      </Container>
    </PageSection>
  </>
);
