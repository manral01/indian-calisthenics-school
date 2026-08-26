import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Gallery } from "../components/Gallery";
import { Testimonials } from "../components/Testimonials";
import { Coaching } from "../components/Coaching";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { PersonalTrainingModal } from "../components/PersonalTrainingModal";
import { AnimatePresence } from "framer-motion";

interface HomeProps {
  onNavigate?: (path: string) => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  const [showPTModal, setShowPTModal] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills
          onNavigate={onNavigate}
          onOpenPersonalTraining={() => setShowPTModal(true)}
        />
        <Gallery />
        <Testimonials />
        <Coaching />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {showPTModal && (
          <PersonalTrainingModal onClose={() => setShowPTModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
