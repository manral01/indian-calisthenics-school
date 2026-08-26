import styled from "styled-components";
import { Mail, MapPin } from "lucide-react";
const Foot = styled.footer`
  padding: 68px 16px 25px;
  color: white;
  background: #050505;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
`;
const Top = styled.div`
  display: grid;
  gap: 38px;
  padding-bottom: 42px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1.25fr repeat(3, 1fr);
  }
`;
const Brand = styled.div`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: 14px;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;
const Tagline = styled.p`
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.55;
`;
const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.orange};
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  margin-bottom: 15px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  a,
  p {
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.87rem;
    line-height: 1.5;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
`;
const Bottom = styled.div`
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.73rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const Footer = () => (
  <Foot>
    <Wrap>
      <Top>
        <div>
          <Brand>
            Indian <span>Calisthenics</span> School
          </Brand>
          <Tagline>
            Strength.
            <br />
            Control.
            <br />
            Movement.
          </Tagline>
        </div>
        <Col>
          <Heading>QUICK LINKS</Heading>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#programs">Coaching</a>
          <a href="#gallery">Gallery</a>
        </Col>
        <Col>
          <Heading>SOCIAL</Heading>
          <a href="#contact">Instagram</a>
          <a href="#contact">YouTube</a>
          <a href="#contact">TikTok</a>
        </Col>
        <Col>
          <Heading>CONTACT</Heading>
          <a href="mailto:ics@gmail.com">
            <Mail size={14} style={{ verticalAlign: "-2px" }} /> ics@gmail.com
          </a>
          <p>
            <MapPin size={14} style={{ verticalAlign: "-2px" }} /> Hyderabad
          </p>
        </Col>
      </Top>
      <Bottom>
        <span>
          © {new Date().getFullYear()} Indian Calisthenics School. All rights
          reserved.
        </span>
        <span>Privacy Policy · Terms of Service</span>
      </Bottom>
    </Wrap>
  </Foot>
);
