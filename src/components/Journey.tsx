import styled from "styled-components";
import { motion } from "framer-motion";
import { Clock3, CalendarDays } from "lucide-react";
import { schedule } from "../data/schedule";
const Section = styled.section`
  padding: 100px 16px;
  background: #0A0A0A;
`;
const Wrap = styled.div`
  max-width: 1040px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 38px;
`;
const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 12px;
`;
const H = styled.h2`
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 800;
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
`;
const Card = styled(motion.article)`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #141414;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 3px solid ${({ theme }) => theme.colors.orange};
`;
const Name = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: white;
`;
const Session = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.93rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.muted};
  svg {
    color: ${({ theme }) => theme.colors.orange};
    flex: none;
  }
`;
export const Journey = () => (
  <Section id="schedule">
    <Wrap>
      <Head>
        <Tag>
          <CalendarDays size={14} style={{ verticalAlign: "-2px" }} /> CLASS
          SCHEDULE
        </Tag>
        <H>
          TRAIN ON <span>YOUR TIME.</span>
        </H>
      </Head>
      <Grid>
        {schedule.map((group, i) => (
          <Card
            key={group.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Name>{group.title}</Name>
            {group.sessions.map((session) => (
              <Session key={session}>
                <Clock3 size={18} />
                {session}
              </Session>
            ))}
          </Card>
        ))}
      </Grid>
    </Wrap>
  </Section>
);
