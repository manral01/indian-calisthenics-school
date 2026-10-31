import styled from "styled-components";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  business,
  fullAddress,
  phoneDisplay,
} from "../data/business";
import { images } from "../data/images";
import { Link } from "../router";
import { NAV_LINKS } from "./Navbar";

const Foot = styled.footer`
  padding: 56px 16px 24px;
  color: white;
  background: #0A0A0A;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;
const Top = styled.div`
  display: grid;
  gap: 36px;
  padding-bottom: 40px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1.4fr 1fr 1.2fr;
  }
`;
const Brand = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 14px;
  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;
const Heading = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  a,
  p,
  address {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-style: normal;
    line-height: 1.6;
  }
  a {
    padding: 6px 0;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const Line = styled.p`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 6px 0;
  svg {
    flex: none;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const Bottom = styled.div`
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
`;

export const Footer = () => (
  <Foot>
    <Wrap>
      <Top>
        <Col>
          <Brand>
            <img src={images.logo.src} width={images.logo.width} height={images.logo.height} alt="" />
            {business.name}
          </Brand>
          <address>
            <Line as="span">
              <MapPin size={15} aria-hidden="true" />
              <a href={business.maps} target="_blank" rel="noopener noreferrer">
                {fullAddress}
              </a>
            </Line>
            {business.phone && (
              <Line as="span">
                <Phone size={15} aria-hidden="true" />
                <a href={`tel:${business.phone}`}>{phoneDisplay}</a>
              </Line>
            )}
            <Line as="span">
              <Mail size={15} aria-hidden="true" />
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </Line>
          </address>
        </Col>
        <Col>
          <Heading>Explore</Heading>
          <Link to="/">Home</Link>
          {NAV_LINKS.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </Col>
        <Col>
          <Heading>Timings</Heading>
          {business.hours.map((h) => (
            <Line key={h.label + h.opens}>
              <Clock size={15} aria-hidden="true" />
              <span>
                {h.label}: {h.display}
              </span>
            </Line>
          ))}
          <Heading style={{ marginTop: 18 }}>Follow</Heading>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={business.hyderabadCalisthenicsInstagram} target="_blank" rel="noopener noreferrer">
            Hyderabad Calisthenics
          </a>
        </Col>
      </Top>
      <Bottom>
        © {new Date().getFullYear()} {business.name}, Madhapur, Hyderabad. All rights reserved.
      </Bottom>
    </Wrap>
  </Foot>
);
