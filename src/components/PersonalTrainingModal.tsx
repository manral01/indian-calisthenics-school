import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Target, Flame, BarChart2, ArrowRight } from 'lucide-react';
import { BookingModal, type BookingContext } from './BookingModal';

interface Props {
  onClose: () => void;
}

// ─── Styles — inherit app design system exactly ───────────────────────────────
const Backdrop = styled(motion.div)`
  position: fixed; inset: 0; z-index: 400;
  background: rgba(0,0,0,.88);
  display: grid; place-items: center;
  padding: 16px; overflow-y: auto;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: 100%; max-width: 580px;
  background: #151515;
  border: 1px solid rgba(255,255,255,.10);
  border-top: 3px solid ${({ theme }) => theme.colors.orange};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 40px 80px rgba(0,0,0,.7), ${({ theme }) => theme.shadows.glow};
  padding: 44px 38px 38px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 32px 20px 28px;
  }
`;

const CloseBtn = styled.button`
  position: absolute; top: 18px; right: 18px;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  color: white; cursor: pointer;
  display: grid; place-items: center; transition: .2s;
  &:hover { background: rgba(255,106,0,.2); border-color: rgba(255,106,0,.4); }
`;

// 2D SVG graphic — athletic target/focus silhouette
const Graphic = styled.div`
  display: flex; justify-content: center; margin-bottom: 28px;
`;

const Tag = styled.div`
  display: inline-block; padding: 7px 14px; border-radius: 99px;
  background: ${({ theme }) => theme.gradients.fire};
  color: white; font-size: .68rem; font-weight: 900; letter-spacing: .1em;
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 900; color: white; margin-bottom: 8px;
`;

const Quote = styled.blockquote`
  font-size: .9rem; font-style: italic;
  color: rgba(255,255,255,.45); border-left: 2px solid ${({ theme }) => theme.colors.orange};
  padding-left: 14px; margin: 0 0 28px;
`;

const Features = styled.div`display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;`;

const Feature = styled.div`
  display: flex; gap: 14px; align-items: flex-start;
  padding: 16px; border-radius: ${({ theme }) => theme.radius.sm};
  background: #0D0D0D; border: 1px solid rgba(255,255,255,.07);
`;

const FeatureIcon = styled.div`
  width: 38px; height: 38px; flex: 0 0 38px;
  border-radius: 50%; background: rgba(255,106,0,.15);
  border: 1px solid rgba(255,106,0,.25);
  display: grid; place-items: center;
  color: ${({ theme }) => theme.colors.orange};
`;

const FeatureText = styled.div``;
const FeatureTitle = styled.div`font-size: .82rem; font-weight: 900; color: white; margin-bottom: 3px;`;
const FeatureDesc  = styled.div`font-size: .8rem; color: ${({ theme }) => theme.colors.muted}; line-height: 1.55;`;

const CTA = styled(motion.button)`
  width: 100%; padding: 15px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: white; font-size: .88rem; font-weight: 900; letter-spacing: .05em;
  border: none; cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  display: flex; align-items: center; justify-content: center; gap: 8px;
  svg { transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
  &:hover svg { transform: translateX(4px); }
`;

// ─── Inline SVG graphic — coach + athlete silhouette (CSS line-art) ───────────
const PersonalGraphic = () => (
  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" aria-hidden="true">
    {/* Left figure — coach */}
    <circle cx="55" cy="28" r="10" stroke="#FF6A00" strokeWidth="2" />
    <line x1="55" y1="38" x2="55" y2="72" stroke="#FF6A00" strokeWidth="2" />
    <line x1="55" y1="50" x2="42" y2="62" stroke="#FF6A00" strokeWidth="2" />
    <line x1="55" y1="50" x2="68" y2="58" stroke="#FF6A00" strokeWidth="2" />
    <line x1="55" y1="72" x2="46" y2="90" stroke="#FF6A00" strokeWidth="2" />
    <line x1="55" y1="72" x2="64" y2="90" stroke="#FF6A00" strokeWidth="2" />
    {/* Right figure — athlete */}
    <circle cx="125" cy="28" r="10" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    <line x1="125" y1="38" x2="125" y2="72" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    <line x1="125" y1="50" x2="112" y2="58" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    <line x1="125" y1="50" x2="138" y2="62" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    <line x1="125" y1="72" x2="116" y2="90" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    <line x1="125" y1="72" x2="134" y2="90" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
    {/* Connection arc */}
    <path d="M 68 58 Q 90 40 112 58" stroke="rgba(255,106,0,.4)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
    {/* Target circles */}
    <circle cx="90" cy="60" r="18" stroke="rgba(255,106,0,.2)" strokeWidth="1" />
    <circle cx="90" cy="60" r="10" stroke="rgba(255,106,0,.35)" strokeWidth="1" />
    <circle cx="90" cy="60" r="3"  fill="#FF6A00" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export const PersonalTrainingModal = ({ onClose }: Props) => {
  const [showBooking, setShowBooking] = useState(false);

  const bookingCtx: BookingContext = {
    trainingType: 'personal-training',
    batch: 'Personal Training',
    timing: null,
    duration: null,
    price: null,
    priceDisplay: null,
  };

  return (
    <>
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <Modal
          initial={{ opacity: 0, scale: .93, y: 24 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{   opacity: 0, scale: .93, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <CloseBtn onClick={onClose} aria-label="Close"><X size={16}/></CloseBtn>

          <Graphic><PersonalGraphic /></Graphic>

          <Tag>EXCLUSIVE 1-ON-1</Tag>
          <Title>EXCLUSIVE 1-ON-1<br />SESSION</Title>
          <Quote>"Don't just use a machine; turn your body into one."</Quote>

          <Features>
            <Feature>
              <FeatureIcon><Target size={18}/></FeatureIcon>
              <FeatureText>
                <FeatureTitle>1-Hour Dedicated Coach</FeatureTitle>
                <FeatureDesc>
                  You will be closely assisted by an expert coach dedicated 100% to your progress for a full 60 minutes.
                </FeatureDesc>
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon><Flame size={18}/></FeatureIcon>
              <FeatureText>
                <FeatureTitle>Custom Workout Built For You</FeatureTitle>
                <FeatureDesc>
                  No cookie-cutter routines. Your coach will put you through a targeted session designed around your exact fitness goals and current abilities.
                </FeatureDesc>
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon><BarChart2 size={18}/></FeatureIcon>
              <FeatureText>
                <FeatureTitle>Assessment & Roadmap</FeatureTitle>
                <FeatureDesc>
                  Analyze your strength, correct your form, and map out the fastest way to master advanced movements.
                </FeatureDesc>
              </FeatureText>
            </Feature>
          </Features>

          <CTA
            onClick={() => setShowBooking(true)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: .97 }}
          >
            BOOK MY DEMO SESSION <ArrowRight size={17}/>
          </CTA>
        </Modal>
      </Backdrop>

      <AnimatePresence>
        {showBooking && (
          <BookingModal context={bookingCtx} onClose={() => { setShowBooking(false); onClose(); }} />
        )}
      </AnimatePresence>
    </>
  );
};
