import styled from "styled-components";
import { Clock, MapPin } from "lucide-react";
import { business, fullAddress } from "../data/business";
import { Link } from "../router";
import { ContactActions } from "./ui";

const Section = styled.section`
  padding: 56px 16px;
  background: transparent;
`;
const Wrap = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadows.card};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 20px;
  }
`;
const Tag = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.16em;
  margin-bottom: 11px;
`;
const H = styled.h2`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  margin-bottom: 20px;
  color: white;
`;
const Grid = styled.div`
  display: grid;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Info = styled.div`
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
  svg {
    flex: none;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.accent};
  }
  strong {
    display: block;
    color: white;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Contact = () => (
  <Section id="contact">
    <Wrap>
      <Tag>CONTACT & LOCATION</Tag>
      <H>Join the school</H>
      <Grid>
        <Info>
          <MapPin size={18} aria-hidden="true" />
          <div>
            <strong>{business.name}</strong>
            {fullAddress}
            <br />
            <Link to="/contact">Map & directions</Link>
          </div>
        </Info>
        <Info>
          <Clock size={18} aria-hidden="true" />
          <div>
            {business.hours.map((h) => (
              <span key={h.label + h.opens} style={{ display: "block" }}>
                <strong style={{ display: "inline" }}>{h.label}:</strong> {h.display}
              </span>
            ))}
          </div>
        </Info>
      </Grid>
      <ContactActions whatsappText="Hi, I'd like to know more about training at Indian Calisthenics School, Madhapur." />
    </Wrap>
  </Section>
);
