import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { skillsData, type Skill } from "../data/skills";
import hero from "../assets/hero.png";
const Section = styled.section`
  padding: 35px 16px;
  background: #050505;
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;
const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 42px;
`;
const Tag = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  margin-bottom: 14px;
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
const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;
const Filter = styled.button<{ $active: boolean }>`
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  transition: 0.2s;
  background: ${({ $active, theme }) => ($active ? theme.gradients.fire : "rgba(255,255,255,.07)")};
  color: ${({ $active }) => ($active ? "white" : "rgba(255,255,255,.55)")};
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "rgba(255,255,255,.10)")};
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
  transition: 0.3s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 65px rgba(255, 106, 0, 0.15);
    border-color: rgba(255, 106, 0, 0.25);
  }
`;
const Image = styled.div`
  height: 175px;
  position: relative;
  overflow: hidden;
  background: #0d0d0d;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
    filter: saturate(0.7) brightness(0.8);
  }
  ${Card}:hover & img {
    transform: scale(1.1);
    filter: saturate(0.9) brightness(0.9);
  }
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), transparent);
  }
`;
const PlayIcon = styled.div`
  position: absolute;
  z-index: 2;
  right: 14px;
  bottom: 13px;
  display: grid;
  place-items: center;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
`;
const Body = styled.div`
  padding: 18px;
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
type FilterType = "ALL" | Skill["category"];
export const Skills = () => {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const list =
    filter === "ALL"
      ? skillsData
      : skillsData.filter((s) => s.category === filter);
  return (
    <Section id="skills">
      <Wrap>
        <Header>
          <H>
         <span>TRAINING PROGRAMS</span>
          </H>
        </Header>
        {/* <Filters>
          {(
            ["ALL", "CALISTHENICS", "STRENGTH", "MOVEMENT"] as FilterType[]
          ).map((x) => (
            <Filter key={x} $active={filter === x} onClick={() => setFilter(x)}>
              {x}
            </Filter>
          ))}
        </Filters> */}
        <Grid>
          {list.map((skill, i) => (
            <Card
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Image>
                <img src={hero} alt={`${skill.name} temporary placeholder`} />
                <PlayIcon>
                  <Play size={16} fill="currentColor" />
                </PlayIcon>
              </Image>
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
