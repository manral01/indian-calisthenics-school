import styled, { keyframes } from "styled-components";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { DemoLink } from "./DemoBooking";

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100svh - 72px - env(safe-area-inset-bottom));
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  color: white;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100svh;
    align-items: center;
  }
`;

// Community photo under the ICS neon sign; separate portrait crop for phones.
const Backdrop = styled.picture`
  position: absolute;
  inset: 0;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.25) 0%,
      rgba(10, 10, 10, 0.05) 22%,
      rgba(10, 10, 10, 0.55) 48%,
      rgba(10, 10, 10, 0.92) 70%,
      ${({ theme }) => theme.colors.background} 100%
    );
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      background: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.35) 0%,
        rgba(10, 10, 10, 0.6) 40%,
        rgba(10, 10, 10, 0.78) 75%,
        ${({ theme }) => theme.colors.background} 100%
      );
    }
  }
`;

// CSS (not JS) entrance animation: content is visible as soon as HTML paints
const rise = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(100% - 32px, 900px);
  margin: 0 auto;
  padding: 96px 0 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > * {
    animation: ${rise} 0.7s ease-out both;
  }
  > *:nth-child(2) {
    animation-delay: 0.08s;
  }
  > *:nth-child(3) {
    animation-delay: 0.16s;
  }
  > *:nth-child(4) {
    animation-delay: 0.24s;
  }
  > *:nth-child(5) {
    animation-delay: 0.32s;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 120px 0 96px;
  }
  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
    }
  }
`;

/* The SEO H1, styled as a compact location pill above the display headline */
const Title = styled.h1`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(10, 10, 10, 0.45);
  backdrop-filter: blur(10px);
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: clamp(0.78rem, 2.4vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 14px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 24px;
  }
  &::before {
    content: "";
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(255, 106, 0, 0.2);
  }
`;

const Display = styled.p`
  font-family: ${({ theme }) => theme.typography.displayFamily};
  font-size: clamp(3.2rem, 14vw, 8rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.045em;
  margin-bottom: 14px;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Sub = styled.p`
  max-width: 34ch;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.15rem;
    margin-bottom: 22px;
  }
`;
const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: 22px;
  li {
    padding: 6px 11px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 36px;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  > a:first-child {
    width: 100%;
    max-width: 360px;
    justify-content: center;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 18px;
    > a:first-child {
      width: auto;
    }
  }
`;
const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 8px;
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.3);
  text-underline-offset: 5px;
  transition: color 0.2s;
  &:hover {
    color: white;
    text-decoration-color: ${({ theme }) => theme.colors.accent};
  }
`;
const Button = styled(DemoLink)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 56px;
  padding: 0 34px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  font-size: 1rem;
  background: ${({ $primary, theme }) => ($primary ? theme.gradients.fire : "rgba(255,255,255,.06)")};
  color: ${({ $primary, theme }) => ($primary ? theme.colors.onAccent : "white")};
  border: 1px solid
    ${({ $primary }) => ($primary ? "transparent" : "rgba(255,255,255,.22)")};
  backdrop-filter: blur(10px);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  svg {
    transition: transform 0.2s;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $primary }) => ($primary ? "0 12px 30px rgba(255,106,0,.35)" : "none")};
  }
  &:hover svg {
    transform: translateX(3px);
  }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); opacity: .4; }
  50% { transform: translateY(8px); opacity: 1; }
`;
const Scroll = styled.a`
  position: absolute;
  z-index: 2;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 14px;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 8px;
    width: 4px;
    height: 8px;
    margin-left: -2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.accent};
    animation: ${bob} 1.6s ease-in-out infinite;
  }
  @media (min-height: 640px) and (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export const Hero = () => (
  <HeroSection id="home">
    <Backdrop>
      <source media="(max-width: 767px)" srcSet="/hero-community-mobile.webp" width={844} height={1126} />
      <img
        src="/hero-community.webp"
        width={2000}
        height={1126}
        alt="Indian Calisthenics School community group photo under the neon sign in Madhapur"
        fetchPriority="high"
        decoding="async"
      />
    </Backdrop>
    <Content>
      <Title>Calisthenics Academy in Madhapur, Hyderabad</Title>
      <Display>
        Master your <span>body.</span>
      </Display>
      <Sub>Calisthenics, kids training and personal coaching for every level, near Mindspace.</Sub>
      <Chips aria-label="Highlights">
        <li>★ 5-star Google reviews</li>
        <li>Beginner to advanced</li>
        <li>Free weekday demo</li>
      </Chips>
      <Buttons>
        <Button $primary>
          Book a demo <ArrowRight size={18} />
        </Button>
        <SecondaryLink to="/#skills">See programs</SecondaryLink>
      </Buttons>
    </Content>

    <Scroll href="#skills" aria-label="Scroll to training programs" />
  </HeroSection>
);
