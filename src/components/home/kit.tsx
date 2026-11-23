// Homepage design kit, matching the Calisthenics Lab India homepage look:
// Bebas Neue condensed headings, orange "ember" gradient, frosted glass cards,
// eyebrow labels and numbered accordions.
import { useState, type ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";
import { Plus, Check } from "lucide-react";

export const ember = css`
  background-image: ${({ theme }) => theme.gradients.ember};
`;

export const Ember = styled.span`
  ${ember};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
`;

export const glass = css`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015));
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    0 24px 60px -30px rgba(0, 0, 0, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

/** Gradient hairline border; put on an element that has a border-radius. */
export const edgeEmber = css`
  position: relative;
  border-color: transparent;
  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      140deg,
      rgba(255, 177, 92, 0.9),
      rgba(255, 106, 0, 0.25) 35%,
      rgba(255, 255, 255, 0.06) 60%,
      rgba(226, 83, 26, 0.65)
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const condensed = css`
  font-family: ${({ theme }) => theme.typography.condensedFamily};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const Glass = styled.div<{ $edge?: boolean }>`
  ${glass};
  ${({ $edge }) => $edge && edgeEmber};
`;

export const Section = styled.section<{ $glow?: boolean }>`
  position: relative;
  padding: 64px 20px;
  ${({ $glow }) =>
    $glow &&
    css`
      background: radial-gradient(60% 45% at 50% 0%, rgba(255, 106, 0, 0.11), transparent 70%);
    `}
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 40px;
  }
`;

export const Wrap = styled.div<{ $w?: number }>`
  max-width: ${({ $w = 900 }) => $w}px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const EyebrowEl = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  &::before,
  &::after {
    content: "";
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, currentColor);
  }
  &::after {
    background: linear-gradient(270deg, transparent, currentColor);
  }
`;

const HeadingWrap = styled.div`
  text-align: center;
  margin-bottom: 44px;
  h2 {
    ${condensed};
    margin-top: 16px;
    color: white;
    font-size: clamp(3rem, 12vw, 4.5rem);
    line-height: 0.9;
    letter-spacing: 0.02em;
  }
  h2 span {
    color: inherit;
  }
`;

export const SectionHeading = ({ eyebrow, children }: { eyebrow: string; children: ReactNode }) => (
  <HeadingWrap>
    <EyebrowEl>{eyebrow}</EyebrowEl>
    <h2>{children}</h2>
  </HeadingWrap>
);

const shine = keyframes`
  from { transform: translateX(-120%); }
  to { transform: translateX(120%); }
`;

/** Primary call to action: gradient pill. Apply to a link or button. */
export const emberButton = css`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 56px;
  padding: 0 40px;
  border-radius: 999px;
  ${ember};
  color: #0a0a0a;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  box-shadow:
    0 12px 40px -12px rgba(255, 106, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%);
    transform: translateX(-120%);
  }
  &:hover {
    transform: translateY(-2px);
  }
  &:hover::after {
    animation: ${shine} 0.8s ease;
  }
  &:active {
    transform: scale(0.97);
  }
`;

// ── Numbered accordion ──────────────────────────────────────────────────────
const AccItem = styled.div<{ $open: boolean }>`
  ${glass};
  border-radius: 18px;
  ${({ $open }) => $open && edgeEmber};
`;
const AccButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: none;
  color: white;
  text-align: left;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 24px;
    padding: 24px 32px;
  }
`;
const AccIndex = styled(Ember)`
  ${condensed};
  font-size: 1.6rem;
`;
const AccTitle = styled.span`
  ${condensed};
  flex: 1;
  font-size: clamp(1.5rem, 5.5vw, 1.9rem);
  line-height: 1;
  padding-top: 3px;
`;
const AccIcon = styled.span<{ $open: boolean }>`
  flex: none;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s;
  ${({ $open }) =>
    $open
      ? css`
          ${ember};
          color: #0a0a0a;
          transform: rotate(45deg);
        `
      : css`
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: ${({ theme }) => theme.colors.accent};
        `}
`;
const AccBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.5s ease-out;
  > div {
    overflow: hidden;
  }
  > div > div {
    padding: 0 20px 24px;
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 32px 32px;
    }
  }
`;
export const Hairline = styled.div`
  height: 1px;
  margin-bottom: 22px;
  background: linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.55), transparent);
`;

export const Accordion = ({ index, title, children }: { index: string; title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <AccItem $open={open}>
      <AccButton onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <AccIndex>{index}</AccIndex>
        <AccTitle>{title}</AccTitle>
        <AccIcon $open={open}>
          <Plus size={20} />
        </AccIcon>
      </AccButton>
      <AccBody $open={open}>
        <div>
          <div>
            <Hairline />
            {children}
          </div>
        </div>
      </AccBody>
    </AccItem>
  );
};

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// ── Feature cards & check lists (inside accordions) ─────────────────────────
const FeatureGrid = styled.ul`
  display: grid;
  gap: 14px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  strong {
    ${ember};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.75);
  }
`;
export const Features = ({ items }: { items: { title: string; desc: string }[] }) => (
  <FeatureGrid>
    {items.map((i) => (
      <li key={i.title}>
        <strong>{i.title}</strong>
        <p>{i.desc}</p>
      </li>
    ))}
  </FeatureGrid>
);

const CheckGrid = styled.ul`
  display: grid;
  gap: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
  li {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 1.05rem;
    font-weight: 500;
  }
  li > span {
    flex: none;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    ${ember};
    color: #0a0a0a;
  }
`;
export const CheckList = ({ items }: { items: string[] }) => (
  <CheckGrid>
    {items.map((i) => (
      <li key={i}>
        <span>
          <Check size={15} strokeWidth={3} />
        </span>
        {i}
      </li>
    ))}
  </CheckGrid>
);

export const BodyText = styled.p`
  font-size: 1.02rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
`;
