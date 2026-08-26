import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Section = styled.section`
  padding: 40px 16px;
  background: #0d0d0d;
  position: relative;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    border: 1px solid rgba(255, 106, 0, 0.15);
    border-radius: 50%;
  }
  &:before {
    width: 470px;
    height: 470px;
    left: -250px;
    top: -220px;
  }
  &:after {
    width: 400px;
    height: 400px;
    right: -190px;
    bottom: -240px;
  }
`;
const Wrap = styled(motion.div)`
  max-width: 880px;
  margin: auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;
const Tag = styled.div`
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 13px;
`;
const H = styled.h2`
  font-size: clamp(2.7rem, 7vw, 5.5rem);
  font-weight: 900;
  margin-bottom: 19px;
  color: white;
`;
const Copy = styled.p`
  font-size: 1.1rem;
  line-height: 1.65;
  max-width: 630px;
  margin: 0 auto 27px;
  color: ${({ theme }) => theme.colors.muted};
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
`;
const Button = styled.a<{ $dark?: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-width: 185px;
  padding: 15px 23px;
  border-radius: 99px;
  font-weight: 900;
  font-size: 0.8rem;
  background: ${({ $dark, theme }) => ($dark ? "rgba(255,255,255,.06)" : theme.gradients.fire)};
  color: white;
  border: ${({ $dark }) => ($dark ? "1px solid rgba(255,255,255,.2)" : "none")};
  box-shadow: ${({ $dark, theme }) => ($dark ? "none" : theme.shadows.glow)};
  transition: 0.25s;
  &:hover {
    transform: scale(1.04) translateY(-3px);
    ${({ $dark, theme }) => ($dark ? `border-color:${theme.colors.orange};color:${theme.colors.orange};` : "opacity:.9")}
  }
`;
export const Coaching = () => (
  <Section id="coaching">
    <Wrap
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Tag>PERSONALISED COACHING</Tag>
      <H>
        READY TO BUILD
        <br />
        WHAT YOUR BODY
        <br />
        IS CAPABLE OF?
      </H>
      <Copy>
        Indian Calisthenics School offers structured training for all levels —
        from complete beginners to advanced athletes — in Madhapur, Hyderabad.
        Personal and online training available.
      </Copy>
      <Buttons>
        <Button href="#skills">
          JOIN THE SCHOOL <ArrowRight size={17} />
        </Button>
        {/* <Button $dark href={`mailto:${business.email}`}>
          <MessageCircle size={17} /> CONTACT US
        </Button> */}
      </Buttons>
    </Wrap>
  </Section>
);
