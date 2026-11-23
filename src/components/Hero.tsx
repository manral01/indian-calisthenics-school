import styled, { keyframes } from "styled-components";
import { ArrowRight, ChevronDown, Mail, MapPin } from "lucide-react";
import { Link } from "../router";
import { DemoLink } from "./DemoBooking";
import { business } from "../data/business";
import { Ember, condensed, emberButton, glass } from "./home/kit";

// Community photos that slowly cross-fade one at a time (3.5 s each) with a gentle
// zoom. Pure CSS, so it runs from the first paint without waiting for JavaScript.
const SLIDE_SECONDS = 3.5;
const SLIDES = [
  { src: "/hero/ics-certificates-hd.webp", w: 1600, h: 901, pos: "50% 45%", alt: "Indian Calisthenics School community with their certificates under the neon sign in Madhapur" },
  { src: "/hero/street-run-crew-hd.webp", w: 1280, h: 1600, pos: "50% 60%", alt: "Community group after an outdoor run and calisthenics session in Hyderabad" },
  { src: "/hero/halloween-hd.webp", w: 1200, h: 1600, pos: "50% 62%", alt: "Halloween party with the community at Indian Calisthenics School" },
  { src: "/hero/courtyard-meetup-hd.webp", w: 1320, h: 922, pos: "50% 55%", alt: "Large Hyderabad calisthenics community meetup group photo" },
  { src: "/hero/night-session-hd.webp", w: 1007, h: 1600, pos: "50% 55%", alt: "Night calisthenics meetup with the Hyderabad community" },
  { src: "/hero/street-community-hd.webp", w: 1440, h: 1106, pos: "50% 55%", alt: "Members together after a group training session" },
];

const slideFade = keyframes`
  0% { opacity: 0; transform: scale(1.03); }
  4% { opacity: 1; }
  16.67% { opacity: 1; }
  21% { opacity: 0; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1.1); }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100svh - 72px - env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 88px 20px 64px;
  color: white;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100svh;
    padding: 110px 24px 80px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    filter: brightness(0.5) saturate(0.85);
    animation: ${slideFade} ${SLIDES.length * SLIDE_SECONDS}s linear infinite both;
  }
  img:first-child {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    img {
      animation: none;
    }
  }
  /* Dark top and bottom so text stays readable, warm glow behind the headline */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(50% 40% at 50% 45%, rgba(255, 106, 0, 0.2), transparent 70%),
      linear-gradient(180deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.3) 45%, ${({ theme }) => theme.colors.background} 100%);
  }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${rise} 0.8s ease-out both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Logo = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  margin-bottom: 20px;
  box-shadow:
    0 10px 40px rgba(255, 106, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.12);
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 120px;
    height: 120px;
    border-radius: 28px;
  }
`;

const outline = `
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.65);
`;

const Title = styled.h1`
  ${condensed};
  ${outline};
  font-size: clamp(1.5rem, 6vw, 2.25rem);
  letter-spacing: 0.12em;
  line-height: 1.1;
  margin-bottom: 16px;
  color: white;
`;

const Display = styled.p`
  ${condensed};
  ${outline};
  font-size: clamp(3.6rem, 17vw, 7rem);
  line-height: 0.85;
  margin-bottom: 24px;
  span {
    display: block;
  }
`;

const Sub = styled.p`
  ${outline};
  max-width: 40rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  a {
    color: white;
    text-decoration: underline;
    text-decoration-color: rgba(255, 106, 0, 0.6);
    text-underline-offset: 4px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Cta = styled(DemoLink)`
  ${emberButton};
  margin-bottom: 30px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    padding: 0 48px;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 16px;
  a {
    ${glass};
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.8);
    transition:
      color 0.2s,
      transform 0.2s;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const ScrollCue = styled.a`
  position: absolute;
  bottom: 18px;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  svg {
    animation: ${keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}`} 1.4s ease-in-out infinite;
  }
`;

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Hero = () => (
  <HeroSection id="home">
    <Backdrop>
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          width={s.w}
          height={s.h}
          alt={i === 0 ? s.alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          decoding="async"
          fetchPriority={i === 0 ? "high" : "low"}
          style={{
            objectPosition: s.pos,
            animationDelay: `${i * SLIDE_SECONDS - SLIDE_SECONDS / 4}s`,
          }}
        />
      ))}
    </Backdrop>

    <Content>
      <Logo src="/logo-512.png" alt="Indian Calisthenics School logo" width={512} height={512} fetchPriority="high" />
      <Title>
        Calisthenics Academy in <Ember>Madhapur, Hyderabad</Ember>
      </Title>
      <Display>
        <span>Master Your Body</span>
        <Ember>Not Machines</Ember>
      </Display>
      <Sub>
        {business.name} is a calisthenics academy in Madhapur, near Mindspace and HITEC City. We coach adults
        from complete beginner to advanced in{" "}
        <Link to="/training/calisthenics">weekday &amp; weekend group batches</Link>, offer{" "}
        <Link to="/training/personal-training">personal training</Link> and run{" "}
        <Link to="/training/kids">The Mighty Tribe kids program</Link>.
      </Sub>
      <Cta>
        Book a demo <ArrowRight size={20} />
      </Cta>
      <Socials>
        <a href={business.googleBusinessProfile} target="_blank" rel="noreferrer" aria-label="Google Maps">
          <MapPin size={20} />
        </a>
        <a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <InstagramIcon />
        </a>
        <a href={`mailto:${business.email}`} aria-label="Email">
          <Mail size={20} />
        </a>
      </Socials>
    </Content>

    <ScrollCue href="#timings" aria-label="Scroll down">
      <ChevronDown size={28} />
    </ScrollCue>
  </HeroSection>
);
