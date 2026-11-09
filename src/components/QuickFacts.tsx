// "At a glance" facts in plain text: easy to scan on a phone, and the kind of
// short, factual answers Google and AI assistants quote directly.
import styled from "styled-components";
import { business, phoneDisplay } from "../data/business";

const Section = styled.section`
  padding: 40px 16px 8px;
`;
const Wrap = styled.div`
  max-width: 800px;
  margin: auto;
`;
const H = styled.h2`
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 800;
  margin-bottom: 18px;
  text-align: center;
`;
const List = styled.dl`
  display: grid;
  gap: 10px;
  margin: 0;
  div {
    padding: 14px 16px;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
  dt {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 4px;
  }
  dd {
    margin: 0;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.86);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FACTS: [string, string][] = [
  [
    "Where",
    `${business.streetAddress}, Madhapur, Hyderabad ${business.postalCode}, near Mindspace and HITEC City`,
  ],
  [
    "Adult fees",
    "Weekdays ₹7,777/month (₹22,222 quarterly) · Weekends ₹4,444/month",
  ],
  ["Kids (The Mighty Tribe, ages 3–15)", "Weekdays ₹5,555/month · Weekends ₹3,333/month"],
  [
    "Timings",
    "Mon–Fri 6:30–9:30 AM & 6–9 PM (kids 4–6 PM) · Sat–Sun 8–10 AM (kids 9–10 AM)",
  ],
  ["Levels", "Complete beginners to advanced: push-ups and pull-ups to handstands, levers and muscle-ups"],
  ["Demo", `Free on weekdays · Weekend demo ₹800, adjusted when you join · WhatsApp ${phoneDisplay}`],
];

export const QuickFacts = () => (
  <Section id="at-a-glance">
    <Wrap>
      <H>
        {business.name} <span>at a glance</span>
      </H>
      <List>
        {FACTS.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </List>
    </Wrap>
  </Section>
);
