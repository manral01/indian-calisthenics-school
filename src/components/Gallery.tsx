import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// ── Truly unique images for gallery ───────────────────────────────────────────
import { images } from "../data/images";

// ── Gallery items (WebP, with descriptive alt text) ───────────────────────────
// First item is the large featured tile; the other six fill the mosaic exactly
// (3 columns below 1024px, 5 columns above).
const items = [
  { image: images.straddle, featured: true },
  { image: images.planche },
  { image: images.warmUp },
  { image: images.rig },
  { image: images.spot },
  { image: images.workshop },
  { image: images.community },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: 48px 16px;
  position: relative;
  overflow: hidden;
  background: #0F0F0F;
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
    background: #FF6A00;
    left: -80px;
    top: 25%;
  }
  &:after {
    width: 270px;
    height: 270px;
    background: #E85D00;
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

const Head = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 24px;
`;

const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 0.12em;
  margin-bottom: 13px;
`;

const H = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  color: white;
  span {
    background: ${({ theme }) => theme.gradients.fire};
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: clamp(96px, 28vw, 170px);
  gap: 8px;
  .featured {
    grid-column: span 3;
    grid-row: span 2;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 190px;
    gap: 12px;
    .featured {
      grid-column: span 2;
    }
  }
`;

const Tile = styled(motion.button)`
  position: relative;
  padding: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 42px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), transparent 60%);
  }
`;

const TileImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.55s ease;
  ${Tile}:hover & {
    transform: scale(1.08) !important;
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
`;

const LightboxImg = styled(motion.img)`
  max-width: 90vw;
  max-height: 84vh;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 30px 80px #000;
  object-fit: contain;
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
  const [selected, setSelected] = useState<(typeof items)[number]["image"] | null>(null);

  return (
    <Section id="gallery">
      <Wrap>
        <Head
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Tag>VISUAL JOURNEY</Tag>
          <H>
            Captured in <span>motion.</span>
          </H>
        </Head>

        <Grid>
          {items.map((item, i) => (
            <Tile
              key={i}
              className={item.featured ? "featured" : ""}
              onClick={() => setSelected(item.image)}
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileTap={{ scale: 0.96 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              aria-label={`View photo: ${item.image.alt}`}
            >
              <TileImg
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes={item.featured ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 33vw"}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                decoding="async"
                alt={item.image.alt}
                initial={{ scale: 1.25 }}
                whileInView={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: i * 0.05, ease: "easeOut" }}
              />
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
            <LightboxImg
              src={selected.src}
              srcSet={selected.srcSet}
              sizes="90vw"
              alt={selected.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
};
