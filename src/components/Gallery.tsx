import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// ── Real images ───────────────────────────────────────────────────────────────
import img1 from "../assets/imageOne.jpeg";
import img2 from "../assets/random.jpeg";

// ── Gallery items — add more imports + entries here as new photos arrive ──────
const items = [
  { src: img1, alt: "Indian Calisthenics School training", tall: true },
  { src: img2, alt: "Indian Calisthenics School movement", tall: false },
  {
    src: img1,
    alt: "Indian Calisthenics School strength session",
    tall: false,
  },
  { src: img2, alt: "Indian Calisthenics School skills practice", tall: true },
  { src: img1, alt: "Indian Calisthenics School freestyle", tall: false },
  { src: img2, alt: "Indian Calisthenics School open gym", tall: false },
];

// ── Styles (unchanged from theme) ─────────────────────────────────────────────
const Section = styled.section`
  padding: 100px 16px;
  position: relative;
  overflow: hidden;
  background: #0d0d0d;
  color: white;
  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
  }
  &:before {
    width: 300px;
    height: 300px;
    background: #ff6a00;
    left: -80px;
    top: 25%;
  }
  &:after {
    width: 270px;
    height: 270px;
    background: #ff4d00;
    right: -70px;
    bottom: 6%;
  }
`;
const Wrap = styled.div`
  max-width: 1180px;
  margin: auto;
  position: relative;
  z-index: 1;
`;
const Head = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 36px;
`;
const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 0.12em;
  margin-bottom: 13px;
`;
const H = styled.h2`
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  color: white;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    .tall {
      grid-row: span 2;
    }
  }
`;
const Tile = styled(motion.button)`
  position: relative;
  min-height: 230px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 42px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    transition: transform 0.55s;
  }
  &:hover img {
    transform: scale(1.07);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.55), transparent 60%);
  }
`;
const Zoom = styled.span`
  position: absolute;
  z-index: 1;
  top: 14px;
  right: 14px;
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
  opacity: 0;
  transition: 0.25s;
  ${Tile}:hover & {
    opacity: 1;
  }
`;
const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.95);
  padding: 25px;
  img {
    max-width: 90vw;
    max-height: 84vh;
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: 0 30px 80px #000;
  }
`;
const Close = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  color: white;
  background: rgba(255, 106, 0, 0.25);
  border: 1px solid rgba(255, 106, 0, 0.4);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
`;

// ── Component ──────────────────────────────────────────────────────────────────
export const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Section id="gallery">
      <Wrap>
        <Head>
          <Tag>VISUAL JOURNEY</Tag>
          <H>
            CAPTURED IN <span>MOTION.</span>
          </H>
        </Head>

        <Grid>
          {items.map((item, i) => (
            <Tile
              key={i}
              className={item.tall ? "tall" : ""}
              onClick={() => setSelected(item.src)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              aria-label={`View ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} />
              <Zoom>
                <ZoomIn size={17} />
              </Zoom>
            </Tile>
          ))}
        </Grid>
      </Wrap>

      <AnimatePresence>
        {selected && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <Close aria-label="Close image" onClick={() => setSelected(null)}>
              <X size={20} />
            </Close>
            <img src={selected} alt="Gallery image enlarged" />
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
};
