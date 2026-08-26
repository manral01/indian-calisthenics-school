import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

// ─── Booking context shape ────────────────────────────────────────────────────
export interface BookingContext {
  trainingType: string;
  batch: string;
  timing: string | null;
  duration: string | null;
  price: number | null;
  priceDisplay: string | null;
}

interface Props {
  context: BookingContext;
  onClose: () => void;
}

// ─── Styles — matching existing app design system ────────────────────────────
const Backdrop = styled(motion.div)`
  position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,.85);
  display: grid; place-items: center;
  padding: 16px;
  overflow-y: auto;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: 100%; max-width: 520px;
  background: #151515;
  border: 1px solid rgba(255,255,255,.10);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 40px 80px rgba(0,0,0,.7);
  padding: 40px 36px 36px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 28px 20px 24px;
  }
`;

const CloseBtn = styled.button`
  position: absolute; top: 18px; right: 18px;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  color: white; cursor: pointer;
  display: grid; place-items: center;
  transition: background .2s;
  &:hover { background: rgba(255,106,0,.2); border-color: rgba(255,106,0,.4); }
`;

const ModalTitle = styled.h2`
  font-size: 1.6rem; font-weight: 900; color: white; margin-bottom: 4px;
`;
const ModalSub = styled.p`
  font-size: .8rem; color: ${({ theme }) => theme.colors.muted}; margin-bottom: 28px;
`;

// Context summary pill row
const ContextRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;
`;
const Pill = styled.span`
  padding: 5px 12px; border-radius: 99px;
  background: rgba(255,106,0,.12);
  border: 1px solid rgba(255,106,0,.25);
  font-size: .7rem; font-weight: 800; color: ${({ theme }) => theme.colors.orange};
  letter-spacing: .06em;
`;

// Form elements
const Field = styled.div`margin-bottom: 18px;`;
const Label = styled.label`
  display: block; font-size: .72rem; font-weight: 800;
  letter-spacing: .07em; color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 7px;
`;
const Input = styled.input<{ $error?: boolean }>`
  width: 100%; padding: 13px 16px;
  background: #0D0D0D;
  border: 1px solid ${({ $error }) => $error ? '#FF4D00' : 'rgba(255,255,255,.10)'};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: white; font-size: .9rem; font-family: inherit;
  outline: none; transition: border-color .2s;
  &:focus { border-color: ${({ theme }) => theme.colors.orange}; }
  &::placeholder { color: rgba(255,255,255,.25); }
`;
const Select = styled.select<{ $error?: boolean }>`
  width: 100%; padding: 13px 16px;
  background: #0D0D0D;
  border: 1px solid ${({ $error }) => $error ? '#FF4D00' : 'rgba(255,255,255,.10)'};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: white; font-size: .9rem; font-family: inherit;
  outline: none; transition: border-color .2s; cursor: pointer;
  option { background: #151515; }
  &:focus { border-color: ${({ theme }) => theme.colors.orange}; }
`;
const ErrorMsg = styled.span`
  display: flex; align-items: center; gap: 5px;
  font-size: .72rem; color: #FF4D00; margin-top: 5px;
`;

const SubmitBtn = styled.button<{ $disabled: boolean }>`
  width: 100%; padding: 15px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $disabled, theme }) => $disabled ? 'rgba(255,255,255,.06)' : theme.gradients.fire};
  color: ${({ $disabled }) => $disabled ? 'rgba(255,255,255,.3)' : 'white'};
  font-size: .88rem; font-weight: 900; letter-spacing: .05em;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  border: 1px solid ${({ $disabled }) => $disabled ? 'rgba(255,255,255,.08)' : 'transparent'};
  box-shadow: ${({ $disabled, theme }) => $disabled ? 'none' : theme.shadows.glow};
  transition: opacity .2s, transform .2s;
  margin-top: 8px;
  &:hover:not(:disabled) { opacity: .9; transform: translateY(-2px); }
`;

const WHATSAPP = '918826762234';
const DURATIONS = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function validatePhone(v: string) {
  return /^\+?[\d\s\-]{7,15}$/.test(v.trim());
}

// ─── Component ────────────────────────────────────────────────────────────────
export const BookingModal = ({ context, onClose }: Props) => {
  const isPersonal = context.trainingType === 'personal-training';

  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [duration, setDuration] = useState(context.duration ?? '');
  const [touched,  setTouch]    = useState({ name: false, email: false, phone: false, duration: false });

  const errors = {
    name:     touched.name     && name.trim().length < 2,
    email:    touched.email    && !validateEmail(email),
    phone:    touched.phone    && !validatePhone(phone),
    duration: !isPersonal && touched.duration && !duration,
  };

  const isValid =
    name.trim().length >= 2 &&
    validateEmail(email) &&
    validatePhone(phone) &&
    (isPersonal || !!duration);

  const handleSubmit = () => {
    if (!isValid) return;

    const isMorning = context.timing ? context.timing.includes('AM') : true;
    const timingLabel = context.timing
      ? `(${isMorning ? 'Morning' : 'Evening'}) ${context.timing}`
      : 'N/A';

    const lines = [
      `NEW BOOKING INQUIRY - CALI LAB`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Batch: ${context.batch}`,
      ...(isPersonal ? [] : [
        `Duration: ${duration}`,
        `Timing: ${timingLabel}`,
        `Total Price: ${context.priceDisplay ?? 'N/A'}`,
      ]),
      ``,
      `I'm interested in joining the lab. Please provide further details.`,
    ];

    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Modal
        initial={{ opacity: 0, scale: .94, y: 20 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        exit={{   opacity: 0, scale: .94, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <CloseBtn onClick={onClose} aria-label="Close booking modal"><X size={16}/></CloseBtn>

        <ModalTitle>BOOK YOUR DEMO</ModalTitle>
        <ModalSub>All fields are required to proceed to WhatsApp.</ModalSub>

        {/* Context summary */}
        <ContextRow>
          <Pill>{context.batch}</Pill>
          {context.timing    && <Pill>{context.timing}</Pill>}
          {context.duration  && <Pill>{context.duration}</Pill>}
          {context.priceDisplay && <Pill>{context.priceDisplay}</Pill>}
        </ContextRow>

        {/* Full Name */}
        <Field>
          <Label htmlFor="bm-name">FULL NAME</Label>
          <Input
            id="bm-name" type="text" placeholder="Your full name"
            value={name} onChange={e => setName(e.target.value)}
            onBlur={() => setTouch(t => ({ ...t, name: true }))}
            $error={errors.name}
          />
          {errors.name && <ErrorMsg><AlertCircle size={12}/> Please enter your full name</ErrorMsg>}
        </Field>

        {/* Email */}
        <Field>
          <Label htmlFor="bm-email">EMAIL ADDRESS</Label>
          <Input
            id="bm-email" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouch(t => ({ ...t, email: true }))}
            $error={errors.email}
          />
          {errors.email && <ErrorMsg><AlertCircle size={12}/> Please enter a valid email</ErrorMsg>}
        </Field>

        {/* Phone */}
        <Field>
          <Label htmlFor="bm-phone">PHONE NUMBER</Label>
          <Input
            id="bm-phone" type="tel" placeholder="Your phone number"
            value={phone} onChange={e => setPhone(e.target.value)}
            onBlur={() => setTouch(t => ({ ...t, phone: true }))}
            $error={errors.phone}
          />
          {errors.phone && <ErrorMsg><AlertCircle size={12}/> Please enter a valid phone number</ErrorMsg>}
        </Field>

        {/* Membership Duration — hidden for personal training */}
        {!isPersonal && (
          <Field>
            <Label htmlFor="bm-duration">MEMBERSHIP DURATION</Label>
            <Select
              id="bm-duration"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              onBlur={() => setTouch(t => ({ ...t, duration: true }))}
              $error={errors.duration}
            >
              <option value="">Select duration…</option>
              {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </Select>
            {errors.duration && <ErrorMsg><AlertCircle size={12}/> Please select a duration</ErrorMsg>}
          </Field>
        )}

        <SubmitBtn $disabled={!isValid} onClick={handleSubmit} disabled={!isValid}>
          CONTINUE TO WHATSAPP →
        </SubmitBtn>
      </Modal>
    </Backdrop>
  );
};
