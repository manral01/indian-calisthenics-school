import styled from "styled-components";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { facilities } from "../data/schedule";
const Section = styled.section`
  padding: 100px 16px;
  background: #050505;
`;
const Wrap = styled.div`
  max-width: 1080px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 0 auto 33px;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 13px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Card = styled(motion.div)`
  padding: 22px 15px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadows.card};
  font-size: 0.8rem;
  font-weight: 900;
  line-height: 1.35;
  color: white;
  transition: 0.25s;
  &:hover {
    border-color: rgba(255, 106, 0, 0.35);
    box-shadow: 0 20px 40px rgba(255, 106, 0, 0.1);
  }
  svg {
    color: ${({ theme }) => theme.colors.orange};
    margin-bottom: 10px;
  }
`;
export const Collaborations = () => (
  <Section id="facilities">
    <Wrap>
      <Head>
        <Tag>OUR FACILITIES</Tag>
        <H>
          SPACE TO <span>MOVE.</span>
        </H>
      </Head>
      <Grid>
        {facilities.map((facility, i) => (
          <Card
            key={facility}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <CheckCircle2 size={20} />
            <div>{facility}</div>
          </Card>
        ))}
      </Grid>
    </Wrap>
  </Section>
);
