import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";
import hero from "../assets/hero.png";
const Section = styled.section`
  padding: 100px 16px;
  background: #0d0d0d;
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 35px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
  }
`;
const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 0.12em;
  margin-bottom: 10px;
`;
const H = styled.h2`
  font-size: clamp(2.7rem, 5vw, 4.2rem);
  font-weight: 900;
  color: white;
`;
const All = styled.a`
  font-size: 0.78rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
  &:hover {
    color: #ff7a00;
  }
`;
const Grid = styled.div`
  display: grid;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Card = styled(motion.article)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: 0.25s;
  &:hover {
    transform: translateY(-7px);
    border-color: rgba(255, 106, 0, 0.25);
    box-shadow: 0 28px 65px rgba(255, 106, 0, 0.12);
  }
`;
const Img = styled.div`
  height: 156px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
    filter: saturate(0.7) brightness(0.75);
  }
  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;
const Body = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 10px;
  span:last-child {
    color: ${({ theme }) => theme.colors.muted};
    display: flex;
    gap: 3px;
    align-items: center;
  }
`;
const Title = styled.h3`
  font-size: 1.18rem;
  font-weight: 900;
  line-height: 1.17;
  flex: 1;
  margin-bottom: 14px;
  color: white;
`;
const Read = styled.a`
  font-size: 0.73rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    color: #ff7a00;
  }
`;
const articles = [
  ["SKILL", "How to Get Your First Muscle Up", "5 MIN"],
  ["STRENGTH", "How to Build Better Pull Ups", "4 MIN"],
  ["TRAINING", "Calisthenics Strength Fundamentals", "7 MIN"],
  ["SKILL", "How Long Does a Planche Take?", "6 MIN"],
  ["BEGINNER", "Common Beginner Mistakes", "5 MIN"],
];
export const Blog = () => (
  <Section id="blog">
    <Wrap>
      <Head>
        <div>
          <Tag>TRAINING INSIGHTS</Tag>
          <H>TRAIN SMARTER.</H>
        </div>
        <All href="#blog">VIEW ALL ARTICLES →</All>
      </Head>
      <Grid>
        {articles.map(([cat, title, time], i) => (
          <Card
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Img>
              <img src={hero} alt={`${title} placeholder`} />
            </Img>
            <Body>
              <Meta>
                <span>{cat}</span>
                <span>
                  <Clock3 size={12} />
                  {time} READ
                </span>
              </Meta>
              <Title>{title}</Title>
              <Read href="#contact">
                READ ARTICLE <ArrowRight size={14} />
              </Read>
            </Body>
          </Card>
        ))}
      </Grid>
    </Wrap>
  </Section>
);
