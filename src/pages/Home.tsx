import { Hero } from "../components/Hero";
import {
  AtAGlance,
  Community,
  HomeFaq,
  Method,
  Offer,
  PlansTimings,
  Programs,
  Reviews,
  SkillsTicker,
} from "../components/home/Sections";
import { Contact } from "../components/Contact";

// Same layout as the Calisthenics Lab India homepage: photo hero, skills ticker,
// plans & timings, the method, programs + free demo, offer, reviews, community,
// at-a-glance facts, FAQ and contact.
export const Home = () => (
  <>
    <Hero />
    <SkillsTicker />
    <PlansTimings />
    <Method />
    <Programs />
    <Offer />
    <Reviews />
    <Community />
    <AtAGlance />
    <HomeFaq />
    <Contact />
  </>
);
