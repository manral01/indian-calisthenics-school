import { Hero } from "../components/Hero";
import { Skills } from "../components/Skills";
import { Gallery } from "../components/Gallery";
import { Testimonials } from "../components/Testimonials";
import { Coaching } from "../components/Coaching";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { CharacterProvider, FloatingCharacter } from "../components/character";

export const Home = () => (
  <CharacterProvider>
    <Hero />
    <Skills />
    <Gallery />
    <Testimonials />
    <Coaching />
    <FAQ />
    <Contact />

    {/* Fixed floating character, desktop only, lives outside main flow */}
    <FloatingCharacter />
  </CharacterProvider>
);
