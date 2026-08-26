import styled from "styled-components";
import { motion } from "framer-motion";
import { skillsData } from "../data/skills";
import hero from "../assets/hero.png";

const Section = styled.section`
  padding: 40px 16px;
  background: #050505;
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
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  color: white;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 65px rgba(255, 106, 0, 0.15);
    border-color: rgba(255, 106, 0, 0.25);
  }
`;

const ImageContainer = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  background: #080808;

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(21, 21, 21, 0.95) 0%,
      rgba(0, 0, 0, 0.2) 60%,
      transparent 100%
    );
  }
`;

const CardImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
`;

const Body = styled.div`
  padding: 18px 20px 22px;
`;

const Level = styled.div`
  font-size: 0.69rem;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 7px;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 9px;
  color: white;
`;

const Desc = styled.p`
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.muted};
`;

interface SkillsProps {
  onNavigate?: (path: string) => void;
  onOpenPersonalTraining?: () => void;
}

export const Skills = ({ onNavigate, onOpenPersonalTraining }: SkillsProps) => {
  const list = skillsData;

  const handleCardClick = (skillName: string) => {
    if (skillName === "Calisthenics") {
      if (onNavigate) onNavigate("/training/calisthenics");
      else window.history.pushState({}, "", "/training/calisthenics");
    } else if (skillName === "Kids Training") {
      if (onNavigate) onNavigate("/training/kids");
      else window.history.pushState({}, "", "/training/kids");
    } else if (skillName.includes("Personal Training")) {
      if (onOpenPersonalTraining) onOpenPersonalTraining();
    }
  };

  return (
    <Section id="skills">
      <Wrap>
        <Header>
          <H>
            <span>TRAINING PROGRAMS</span>
          </H>
        </Header>
        <Grid>
          {list.map((skill, i) => (
            <Card
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleCardClick(skill.name)}
              style={{ cursor: "pointer" }}
            >
              <ImageContainer>
                <CardImg
                  src={skill.image || hero}
                  alt={`${skill.name} training`}
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </ImageContainer>
              <Body>
                <Level>{skill.level}</Level>
                <Title>{skill.name}</Title>
                <Desc>{skill.description}</Desc>
              </Body>
            </Card>
          ))}
        </Grid>
      </Wrap>
    </Section>
  );
};
