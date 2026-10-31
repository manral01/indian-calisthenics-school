import styled from "styled-components";
import { ArrowRight, Clock } from "lucide-react";
import { timingsGlance } from "../data/schedule";
import { Link } from "../router";
import { DemoLink } from "./DemoBooking";

const Section = styled.section`
  padding: 56px 16px;
`;
const Wrap = styled.div`
  max-width: 1080px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;
const Tag = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.16em;
  margin-bottom: 12px;
`;
const H = styled.h2`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
`;
const Slot = styled.div`
  padding: 18px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  p:first-child {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 8px;
    svg {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  strong {
    display: block;
    font-family: ${({ theme }) => theme.typography.displayFamily};
    font-size: clamp(1.15rem, 3.4vw, 1.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px 22px;
  margin-top: 24px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-weight: 700;
    font-size: 0.92rem;
  }
  a:first-child {
    padding: 0 22px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme }) => theme.gradients.fire};
    color: ${({ theme }) => theme.colors.onAccent};
  }
  a:not(:first-child) {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const TimingsGlance = () => (
  <Section id="timings">
    <Wrap>
      <Head>
        <Tag>BATCH TIMINGS</Tag>
        <H>
          Timings at a <span>glance</span>
        </H>
      </Head>
      <Grid>
        {timingsGlance.map((t) => (
          <Slot key={t.label}>
            <p>
              <Clock size={14} aria-hidden="true" /> {t.label}
            </p>
            <strong>{t.time}</strong>
            <span>{t.detail}</span>
          </Slot>
        ))}
      </Grid>
      <Actions>
        <DemoLink>Book a demo</DemoLink>
        <Link to="/training/calisthenics#timings">
          Adult fees <ArrowRight size={15} />
        </Link>
        <Link to="/training/kids#timings">
          Kids fees <ArrowRight size={15} />
        </Link>
      </Actions>
    </Wrap>
  </Section>
);
