import styled from "styled-components";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Dumbbell,
  GalleryVerticalEnd,
  Sparkles,
  UserRound,
} from "lucide-react";
import poster from "../assets/random.jpeg";
import heroVideo from "../assets/vedio1.MP4";
import { business } from "../data/business";

const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: white;
  background: #050505;
`;

/* Video fills the section like background-size: cover */
const VideoBg = styled.video`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

/* Dark gradient + subtle orange tint — sits above video, below content */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.82)),
    linear-gradient(
      135deg,
      rgba(255, 106, 0, 0.12),
      transparent 45%,
      rgba(255, 77, 0, 0.1)
    );
`;

const Orb = styled.div<{ $pos: string; $color: string }>`
  position: absolute;
  ${({ $pos }) => $pos};
  z-index: 1;
  width: clamp(170px, 28vw, 410px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(65px);
  opacity: 0.22;
  animation: float 7s ease-in-out infinite alternate;
  @keyframes float {
    to {
      transform: translateY(-26px) scale(1.12);
    }
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: min(100% - 32px, 950px);
  text-align: center;
  padding: 124px 0 74px;
`;
const Eyebrow = styled(motion.div)`
  display: inline-flex;
  padding: 9px 19px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  margin-bottom: 25px;
`;
const Title = styled(motion.h1)`
  font-size: clamp(3rem, 12vw, 7.9rem);
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 25px;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(4.5rem, 10vw, 7.9rem);
  }
`;
const Description = styled(motion.p)`
  max-width: 610px;
  margin: 0 auto 32px;
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(1rem, 2vw, 1.22rem);
  line-height: 1.65;
`;
const Buttons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
  margin-bottom: 47px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
`;
const QuickGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  max-width: 650px;
  margin: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Quick = styled.a`
  padding: 17px 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  transition: 0.25s;
  color: rgba(255, 255, 255, 0.8);
  svg {
    display: block;
    margin: 0 auto 8px;
    color: ${({ theme }) => theme.colors.orange};
  }
  &:hover {
    background: rgba(255, 106, 0, 0.15);
    border-color: rgba(255, 106, 0, 0.4);
    color: white;
    transform: scale(1.04);
  }
`;
const Scroll = styled.a`
  position: absolute;
  z-index: 2;
  bottom: 21px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.45);
  animation: bounce 1.6s infinite;
  @keyframes bounce {
    50% {
      transform: translate(-50%, 8px);
    }
  }
`;

const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } };

export const Hero = () => (
  <HeroSection id="home">
    {/* Background video — autoplay, muted, looped, no controls */}
    <VideoBg autoPlay muted loop playsInline poster={poster} aria-hidden="true">
      <source src={heroVideo} type="video/mp4" />
    </VideoBg>

    {/* Dark overlay */}
    <Overlay aria-hidden="true" />

    {/* Ambient orbs */}
    <Orb $pos="top:18%;left:8%;" $color="#FF6A00" aria-hidden="true" />
    <Orb $pos="right:3%;bottom:10%;" $color="#FF4D00" aria-hidden="true" />

    <Content
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12, delayChildren: 0.18 }}
    >
      <Eyebrow variants={reveal}>CALISTHENICS • YOG • PARKOUR</Eyebrow>
      <Title variants={reveal}>
        MASTER
        <br />
        <span>YOUR</span>
        <br />
        BODY
      </Title>
      <Description variants={reveal}>"{business.tagline}"</Description>
      <Buttons variants={reveal}></Buttons>
      <QuickGrid variants={reveal}>
        {(
          [
            [UserRound, "ABOUT", "#about"],
            [Dumbbell, "PROGRAMS", "#skills"],
            [Sparkles, "SCHEDULE", "#schedule"],
            [GalleryVerticalEnd, "GALLERY", "#gallery"],
          ] as [typeof UserRound, string, string][]
        ).map(([Icon, label, href]) => (
          <Quick href={href} key={label}>
            <Icon size={20} />
            {label}
          </Quick>
        ))}
      </QuickGrid>
    </Content>

    <Scroll href="#about" aria-label="Scroll to about">
      <ChevronDown size={28} />
    </Scroll>
  </HeroSection>
);
