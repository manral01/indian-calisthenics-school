import styled from "styled-components";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { images } from "../data/images";
import { Link } from "../router";
import { business } from "../data/business";
import { useCharacter } from "./character";
import type { PoseName } from "./character";
const Section = styled.section`
  padding: 10px 12px;
  background: #0F0F0F;
`;
const Wrap = styled.div`
  max-width: 1100px;
  margin: auto;
  display: grid;
  gap: 42px;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;
const ImageBox = styled(motion.div)`
  min-height: 430px;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lift};
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
    transition: 0.6s;
  }
  &:hover img {
    transform: scale(1.07);
  }
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent 55%);
  }
`;
const Badge = styled.div`
  position: absolute;
  z-index: 2;
  left: 50px;
  top: 20px;
  color: white;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(12px);
  padding: 5px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;
const Tag = styled.div`
  display: inline-block;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
`;
const Heading = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 18px;
  color: white;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;
const Copy = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
  font-size: 1.03rem;
  margin-bottom: 22px;
`;
const Principles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11px;
`;
const Principle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: white;
  svg {
    color: ${({ theme }) => theme.colors.orange};
  }
`;
/** Pose preview for each discipline tag hover */
const TAG_POSES: Record<string, PoseName> = {
  CALISTHENICS: "prepare_push",
  STRENGTH: "dip",
  MOBILITY: "prepare_balance",
  FREESTYLE: "prepare_skill",
  "KIDS TRAINING": "lsit",
  "OPEN GYM": "standing",
};

export const About = () => {
  const { setHoverPose, triggerClickPose } = useCharacter();

  return (
  <Section id="about">
    <Wrap>
      <ImageBox
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <motion.img
          src={images.spot.src}
          srcSet={images.spot.srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          width={images.spot.width}
          height={images.spot.height}
          loading="lazy"
          decoding="async"
          alt={images.spot.alt}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <Badge>CALISTHENICS • STRENGTH • MOVEMENT</Badge>
      </ImageBox>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Tag>ABOUT INDIAN CALISTHENICS SCHOOL</Tag>
        <Heading>
          Move with <span>intention.</span>
        </Heading>
        <Copy>
          Indian Calisthenics School is a training space in Madhapur, near
          Mindspace and HITEC City, Hyderabad, focused on calisthenics,
          strength, mobility, freestyle and kids training.
        </Copy>
        <Copy>
          Founded by {business.founder.name}, 3× national calisthenics champion
          who has represented India 3 times. "{business.tagline}" Training is
          available from beginner to advanced levels.{" "}
          <Link to="/about" style={{ color: "#FF6A00", fontWeight: 700 }}>
            Meet the founder →
          </Link>
        </Copy>
        <Principles>
          {[
            "CALISTHENICS",
            "STRENGTH",
            "MOBILITY",
            "FREESTYLE",
            "KIDS TRAINING",
            "OPEN GYM",
          ].map((p) => (
            <Principle
              key={p}
              onMouseEnter={() => setHoverPose(TAG_POSES[p] ?? null)}
              onMouseLeave={() => setHoverPose(null)}
              onClick={() => {
                const pose = TAG_POSES[p];
                if (pose) triggerClickPose(pose);
              }}
              style={{ cursor: "pointer" }}
            >
              <Check size={16} />
              {p}
            </Principle>
          ))}
        </Principles>
      </motion.div>
    </Wrap>
  </Section>
  );
};
