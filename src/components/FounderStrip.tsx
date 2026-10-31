import styled from "styled-components";
import { ArrowRight, Award } from "lucide-react";
import { business } from "../data/business";
import { Link } from "../router";
import { Img } from "./ui";

const Section = styled.section`
  padding: 56px 16px;
`;
const Card = styled.div<{ $withPhoto: boolean }>`
  max-width: 1080px;
  margin: auto;
  display: grid;
  gap: 24px;
  align-items: center;
  padding: 28px 22px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, rgba(255, 106, 0, 0.1), rgba(20, 20, 20, 0.95) 45%), #141414;
  border: 1px solid rgba(255, 106, 0, 0.22);
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: ${({ $withPhoto }) => ($withPhoto ? "220px 1fr auto" : "1fr auto")};
    gap: 36px;
    padding: 36px 40px;
  }
`;
const Photo = styled.div`
  width: 100%;
  max-width: 220px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Tag = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 10px;
`;
const H = styled.h2`
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  font-weight: 800;
  margin-bottom: 16px;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const Creds = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  li {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem;
    font-weight: 600;
  }
  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const More = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 106, 0, 0.5);
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  white-space: nowrap;
  &:hover {
    background: rgba(255, 106, 0, 0.08);
  }
`;

export const FounderStrip = () => {
  const { founder } = business;
  return (
    <Section id="coach">
      <Card $withPhoto={Boolean(founder.photo)}>
        {founder.photo && (
          <Photo>
            <Img image={founder.photo} sizes="220px" />
          </Photo>
        )}
        <div>
          <Tag>YOUR HEAD COACH</Tag>
          <H>
            Coached by <span>{founder.name}</span>
          </H>
          <Creds>
            {founder.credentials.map((c) => (
              <li key={c}>
                <Award size={15} aria-hidden="true" /> {c}
              </li>
            ))}
          </Creds>
        </div>
        <More to="/about">
          Meet the coach <ArrowRight size={16} />
        </More>
      </Card>
    </Section>
  );
};
