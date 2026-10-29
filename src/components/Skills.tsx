import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { programList, type ProgramSlug } from "../data/programPages";
import { Link } from "../router";
import { Img } from "./ui";
import { useCharacter } from "./character";
import type { PoseName } from "./character";

const Section = styled.section`
  padding: 56px 16px;
  background: #0A0A0A;
`;

const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 36px;
`;

const H = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  color: white;
  margin-bottom: 14px;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`;

// 2×2 grid of square cards at every screen size
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 920px;
  margin: 0 auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 18px;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: border-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255, 106, 0, 0.45);
  }
  a {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    aspect-ratio: 1 / 1;
  }
  /* Photo fills the card; text sits on top of it */
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  &:hover img {
    transform: scale(1.06);
  }
  a::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(10, 10, 10, 0.88) 0%,
      rgba(10, 10, 10, 0.55) 35%,
      rgba(10, 10, 10, 0.12) 65%,
      rgba(10, 10, 10, 0) 100%
    );
  }
`;

const Body = styled.div`
  position: relative;
  z-index: 1;
  padding: 14px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6);
`;

const Level = styled.p`
  display: inline-block;
  white-space: nowrap;
  padding: 4px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(10, 10, 10, 0.7);
  text-shadow: none;
  font-size: 0.62rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.7rem;
  }
`;

const Title = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.6rem;
  }
`;

const Desc = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 14px;
  max-width: 34ch;
  /* Too cramped on small squares: title + link only */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const More = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.88rem;
  }
`;

const CARD: Record<ProgramSlug, { level: string; summary: string; hover: PoseName; click: PoseName }> = {
  calisthenics: {
    level: "ALL LEVELS",
    summary: "Structured group batches, mornings, evenings and weekends.",
    hover: "prepare_push",
    click: "pushup",
  },
  kids: {
    level: "KIDS",
    summary: "Supervised classes built around movement fundamentals.",
    hover: "prepare_skill",
    click: "lsit",
  },
  "personal-training": {
    level: "1-ON-1 · ONLINE",
    summary: "A dedicated coach and a plan built around your goals.",
    hover: "prepare_pull",
    click: "pullup",
  },
  "freestyle-parkour": {
    level: "DYNAMIC SKILLS",
    summary: "Bar flow, vaults and safe landings, step by step.",
    hover: "prepare_balance",
    click: "handstand",
  },
};

export const Skills = () => {
  const { setHoverPose, triggerClickPose } = useCharacter();

  return (
    <Section id="skills">
      <Wrap>
        <Header>
          <H>
            Training <span>Programs</span>
          </H>
          <Sub>
            Every program runs from our space in Madhapur, near Mindspace and
            HITEC City, Hyderabad.
          </Sub>
        </Header>
        <Grid>
          {programList.map((p, i) => {
            const card = CARD[p.slug];
            return (
              <Card
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.07 }}
                onMouseEnter={() => setHoverPose(card.hover)}
                onMouseLeave={() => setHoverPose(null)}
              >
                <Link to={p.path} onClick={() => triggerClickPose(card.click)}>
                  <Img image={p.image} sizes="(min-width: 920px) 450px, 50vw" />
                  <Body>
                    <Level>{card.level}</Level>
                    <Title>{p.name}</Title>
                    <Desc>{card.summary}</Desc>
                    <More>
                      Timings &amp; details <ArrowRight size={15} />
                    </More>
                  </Body>
                </Link>
              </Card>
            );
          })}
        </Grid>
      </Wrap>
    </Section>
  );
};
