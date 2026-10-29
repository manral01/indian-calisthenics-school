import { useSyncExternalStore } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowRight } from "lucide-react";
import heroVideo from "../assets/vedio1.MP4";
import { images } from "../data/images";
import { Link } from "../router";
import { Img } from "./ui";

const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
  background: #0a0a0a;
`;

/* Poster image is always rendered (fast LCP); video layers on top on desktop */
const Media = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  img,
  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  video {
    pointer-events: none;
  }
`;

/* Even tint + soft vignette keeps the centred text readable on any frame;
   the bottom fades into the page below */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(0deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 30%),
    radial-gradient(ellipse at center, rgba(10, 10, 10, 0.55) 0%, rgba(10, 10, 10, 0.85) 75%),
    rgba(10, 10, 10, 0.25);
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
  padding: 120px 0 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > * {
    animation: ${rise} 0.7s ease-out both;
  }
  > *:nth-child(2) { animation-delay: 0.08s; }
  > *:nth-child(3) { animation-delay: 0.16s; }
  > *:nth-child(4) { animation-delay: 0.24s; }
  > *:nth-child(5) { animation-delay: 0.32s; }
  @media (prefers-reduced-motion: reduce) {
    > * { animation: none; }
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
  margin-bottom: 24px;
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
  font-size: clamp(3.4rem, 12vw, 8rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.045em;
  margin-bottom: 40px;
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
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
const Button = styled(Link)<{ $primary?: boolean }>`
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
  border: 1px solid ${({ $primary }) => ($primary ? "transparent" : "rgba(255,255,255,.22)")};
  backdrop-filter: blur(10px);
  transition: transform 0.2s, box-shadow 0.2s;
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
  @media (min-height: 640px) {
    display: block;
  }
`;

// Load the 3 MB background video only on larger screens with motion allowed
const VIDEO_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(VIDEO_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export const Hero = () => {
  const showVideo = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(VIDEO_QUERY).matches,
    () => false, // prerender + hydration: poster only
  );

  return (
    <HeroSection id="home">
      <Media aria-hidden="true">
        <Img image={images.warmUp} priority alt="" />
        {showVideo && (
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
      </Media>
      <Overlay aria-hidden="true" />

      <Content>
        <Title>Calisthenics Academy in Madhapur, Hyderabad</Title>
        <Display>
          Master your <span>body.</span>
        </Display>
        <Buttons>
          <Button $primary to="/contact">
            Book a demo <ArrowRight size={18} />
          </Button>
          <SecondaryLink to="/#skills">See programs</SecondaryLink>
        </Buttons>
      </Content>

      <Scroll href="#skills" aria-label="Scroll to training programs" />
    </HeroSection>
  );
};
