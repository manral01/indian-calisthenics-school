import styled from "styled-components";
import { Mail } from "lucide-react";
import { business } from "../data/business";
import mainLogo from "../assets/mainLogo.jpeg";

const Header = styled.header`
  position: fixed;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`;
const Brand = styled.a`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 64%;
  padding: 10px 16px 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(16px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5);
  color: white;
`;
const LogoImg = styled.img`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 106, 0, 0.5);
`;
const Name = styled.span`
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 8px;
  pointer-events: auto;
`;
const Links = styled.nav`
  display: none;
  gap: 13px;
  align-items: center;
  pointer-events: auto;
  a {
    font-size: 0.64rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.75);
    &:hover {
      color: ${({ theme }) => theme.colors.orange};
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;
const Action = styled.a`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: white;
  background: ${({ theme }) => theme.gradients.fire};
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: 0.25s;
  &:last-child {
    background: rgba(5, 5, 5, 0.72);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  &:hover {
    transform: scale(1.1) translateY(-2px);
  }
`;

export const Navbar = () => (
  <Header>
    <Brand href="#home">
      <LogoImg src={mainLogo} alt="Indian Calisthenics School Logo" />
      <Name>{business.name}</Name>
    </Brand>
    <Links>
      {[
        ["ABOUT", "#about"],
        ["TRAINING", "#skills"],
        ["GALLERY", "#gallery"],
        ["FAQ", "#faq"],
        ["CONTACT", "#contact"],
      ].map(([label, href]) => (
        <a key={label} href={href}>
          {label}
        </a>
      ))}
    </Links>
    <Actions>
      <Action
        href={`mailto:${business.email}`}
        aria-label="Email Indian Calisthenics School"
      >
        <Mail size={18} />
      </Action>
    </Actions>
  </Header>
);
