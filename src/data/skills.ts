import calisthenicsImg from "../assets/WhatsApp Image 2026-08-27 at 03.18.28.jpeg";
import kidsImg from "../assets/kidsBatch.jpeg";
import ptImg from "../assets/WhatsApp Image 2026-08-27 at 03.06.54.jpeg";
import onlinePtImg from "../assets/WhatsApp Image 2026-08-27 at 03.18.29.jpeg";

export interface Skill {
  name: string;
  level: string;
  description: string;
  category: "CALISTHENICS" | "STRENGTH" | "MOVEMENT";
  image: string;
}

export const skillsData: Skill[] = [
  {
    name: "Calisthenics",
    level: "BEGINNER → ADVANCED",
    description: "Structured bodyweight training for every experience level.",
    category: "CALISTHENICS",
    image: calisthenicsImg,
  },
  {
    name: "Kids Training",
    level: "KIDS",
    description: "Age-appropriate training built around movement fundamentals.",
    category: "CALISTHENICS",
    image: kidsImg,
  },
  {
    name: "Personal Training",
    level: "CONSULTATION",
    description: "Personal training is available on consultation.",
    category: "CALISTHENICS",
    image: ptImg,
  },
  {
    name: "Online Personal Training",
    level: "₹15,000",
    description: "Online personal training is available at ₹15,000.",
    category: "CALISTHENICS",
    image: onlinePtImg,
  },
];
