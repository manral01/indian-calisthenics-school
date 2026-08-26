import styled from "styled-components";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import hero from "../assets/hero.png";
const Section = styled.section`
  padding: 100px 16px;
  background: #050505;
`;
const Wrap = styled.div`
  max-width: 1100px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 38px;
`;
const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 12px;
`;
const H = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
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
  transition: 0.25s;
  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 28px 65px rgba(255, 106, 0, 0.15);
    border-color: rgba(255, 106, 0, 0.25);
  }
`;
const Img = styled.div`
  height: 165px;
  overflow: hidden;
  position: relative;
  border-bottom: 3px solid ${({ theme }) => theme.colors.orange};
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
const Type = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 7px 9px;
  border-radius: 99px;
  background: ${({ theme }) => theme.gradients.fire};
  color: #fff;
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.08em;
`;
const Body = styled.div`
  padding: 19px;
`;
const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  margin-bottom: 12px;
  color: white;
`;
const Meta = styled.div`display:grid;gap:7px;color:${({ theme }) => theme.colors.muted};font-size:.77rem;div{display:flex;align-items:center;gap:7px}svg{color:${({ theme }) => theme.colors.orange}`;
const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 900;
  font-size: 0.75rem;
  &:hover {
    color: #ff7a00;
  }
`;
const events = [
  ["WORKSHOP", "Skill Foundations", "[DATE]", "[LOCATION]"],
  ["CALISTHENICS MEET", "Movement Meet-Up", "[DATE]", "[LOCATION]"],
  ["SKILL CAMP", "Handstand Camp", "[DATE]", "[LOCATION]"],
];
export const Videos = () => (
  <Section id="events">
    <Wrap>
      <Head>
        <Tag>UPCOMING EVENTS</Tag>
        <H>
          EVENTS & <span>WORKSHOPS.</span>
        </H>
      </Head>
      <Grid>
        {events.map(([type, title, date, location], i) => (
          <Card
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Img>
              <img src={hero} alt={`${title} placeholder`} />
              <Type>{type}</Type>
            </Img>
            <Body>
              <Title>{title}</Title>
              <Meta>
                <div>
                  <CalendarDays size={15} />
                  {date}
                </div>
                <div>
                  <MapPin size={15} />
                  {location}
                </div>
              </Meta>
              <Link href="#contact">
                REGISTER INTEREST <ArrowUpRight size={15} />
              </Link>
            </Body>
          </Card>
        ))}
      </Grid>
    </Wrap>
  </Section>
);
