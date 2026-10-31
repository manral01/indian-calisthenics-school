// One-step "Book a demo": a short form (name, phone, program, time) that
// sends straight to WhatsApp, or a pre-filled email while no number is set.
// Any button can open it via useDemo().open(program?).
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import styled from "styled-components";
import { MessageCircle, Mail, X } from "lucide-react";
import { business, whatsappLink } from "../data/business";
import { programList } from "../data/programPages";
import { timingsGlance } from "../data/schedule";
import { trackEvent } from "../analytics";

interface DemoState {
  open: (program?: string) => void;
  isOpen: boolean;
}
const DemoContext = createContext<DemoState>({ open: () => {}, isOpen: false });
export const useDemo = () => useContext(DemoContext);

// ─── Styles ──────────────────────────────────────────────────────────────────
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: grid;
  place-items: end center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    place-items: center;
    padding: 16px;
  }
`;
const Sheet = styled.form`
  position: relative;
  width: 100%;
  max-width: 460px;
  max-height: 92svh;
  overflow-y: auto;
  padding: 28px 22px 24px;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.6);
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 32px 30px 28px;
  }
  h2 {
    font-size: 1.7rem;
    margin-bottom: 6px;
  }
  > p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.92rem;
    margin-bottom: 22px;
  }
`;
const Close = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background: rgba(255, 255, 255, 0.06);
`;
const Field = styled.label`
  display: block;
  margin-bottom: 14px;
  span {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    min-height: 48px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #0d0d0d;
    color: white;
    font: inherit;
    font-size: 16px; /* prevents iOS zoom on focus */
  }
  input:focus,
  select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;
const Submit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  min-height: 52px;
  margin-top: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
  font-size: 1rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const Note = styled.small`
  display: block;
  margin-top: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

// ─── Modal ───────────────────────────────────────────────────────────────────
const DemoModal = ({ program, onClose }: { program: string; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [choice, setChoice] = useState(program);
  const [time, setTime] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const viaWhatsApp = Boolean(whatsappLink());

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const valid = name.trim().length >= 2 && /^\+?[\d\s-]{7,15}$/.test(phone.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const text = [
      `Hi ${business.name}, I'd like to book a demo session.`,
      ``,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Program: ${choice || "Not sure yet"}`,
      `Preferred time: ${time || "Flexible"}`,
    ].join("\n");
    trackEvent("demo_submit", { program: choice || "unsure", channel: viaWhatsApp ? "whatsapp" : "email" });
    const wa = whatsappLink(text);
    if (wa) window.open(wa, "_blank", "noopener");
    else
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
        "Demo session request",
      )}&body=${encodeURIComponent(text)}`;
    onClose();
  };

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Sheet onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <Close type="button" onClick={onClose} aria-label="Close">
          <X size={18} />
        </Close>
        <h2 id="demo-title">Book a demo</h2>
        <p>Tell us a little about you and we'll set up a session in Madhapur.</p>

        <Field>
          <span>Your name</span>
          <input ref={firstField} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </Field>
        <Field>
          <span>Phone / WhatsApp</span>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+91"
            required
          />
        </Field>
        <Field>
          <span>Program</span>
          <select value={choice} onChange={(e) => setChoice(e.target.value)}>
            <option value="">Not sure yet</option>
            {programList.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <span>Preferred time</span>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Flexible</option>
            {timingsGlance.map((t) => (
              <option key={t.label} value={`${t.label} (${t.time})`}>
                {t.label} · {t.time}
              </option>
            ))}
          </select>
        </Field>

        <Submit type="submit" disabled={!valid}>
          {viaWhatsApp ? <MessageCircle size={18} /> : <Mail size={18} />}
          {viaWhatsApp ? "Send on WhatsApp" : "Send request by email"}
        </Submit>
        <Note>We'll reply to confirm a time.</Note>
      </Sheet>
    </Backdrop>
  );
};

// ─── Provider + link ─────────────────────────────────────────────────────────
export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [program, setProgram] = useState<string | null>(null);
  const open = useCallback((p?: string) => {
    trackEvent("demo_open", { program: p || "unsure" });
    setProgram(p ?? "");
  }, []);
  const close = useCallback(() => setProgram(null), []);

  return (
    <DemoContext.Provider value={{ open, isOpen: program !== null }}>
      {children}
      {program !== null && <DemoModal program={program} onClose={close} />}
    </DemoContext.Provider>
  );
};

type DemoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { program?: string };

/** Opens the demo form; without JS it falls back to the contact page. */
export const DemoLink = ({ program, onClick, ...rest }: DemoLinkProps) => {
  const { open } = useDemo();
  return (
    <a
      href="/contact"
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        e.preventDefault();
        open(program);
      }}
      {...rest}
    />
  );
};
