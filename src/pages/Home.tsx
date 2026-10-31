import { Hero } from "../components/Hero";
import { Skills } from "../components/Skills";
import { Gallery } from "../components/Gallery";
import { Testimonials } from "../components/Testimonials";
import { TimingsGlance } from "../components/TimingsGlance";
import { FounderStrip } from "../components/FounderStrip";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { CharacterProvider } from "../components/character";
import { HomeScene } from "../components/HomeScene";
import styled from "styled-components";

// Sections sit above the fixed 3D layer
const Layer = styled.div`
  position: relative;
  z-index: 1;
`;

export const Home = () => (
  <CharacterProvider>
    {/* 3D calisthenics gym running behind the whole homepage */}
    <HomeScene />
    <Layer>
      <Hero />
      <Skills />
      <TimingsGlance />
      <FounderStrip />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
    </Layer>

    {/* The 2D FloatingCharacter is retired on the homepage in favour of the
        3D scene; add <FloatingCharacter /> back here to restore it. */}
  </CharacterProvider>
);
