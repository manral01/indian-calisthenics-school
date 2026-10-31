// Sticky bottom bar on phones: the fastest path to contact from any page.
// WhatsApp / Call appear automatically once business.phone is set.
import styled from "styled-components";
import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";
import { business, whatsappLink } from "../data/business";
import { trackEvent } from "../analytics";
import { DemoLink, useDemo } from "./DemoBooking";

const Bar = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  display: flex;
  gap: 8px;
  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

/* Keeps the footer from sitting under the bar on phones */
export const MobileActionBarSpacer = styled.div`
  height: calc(72px + env(safe-area-inset-bottom));
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Action = styled.a<{ $primary?: boolean }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 50px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.9rem;
  font-weight: 700;
  background: ${({ $primary, theme }) => ($primary ? theme.gradients.fire : "rgba(255,255,255,.07)")};
  color: ${({ $primary, theme }) => ($primary ? theme.colors.onAccent : "white")};
  border: 1px solid ${({ $primary }) => ($primary ? "transparent" : "rgba(255,255,255,.14)")};
`;

export const MobileActionBar = () => {
  const { isOpen } = useDemo();
  if (isOpen) return null;
  const wa = whatsappLink("Hi, I'd like to know more about training at Indian Calisthenics School, Madhapur.");

  return (
    <Bar aria-label="Quick contact">
      {wa && (
        <Action
          $primary
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { from: "mobile_bar" })}
        >
          <MessageCircle size={18} /> WhatsApp
        </Action>
      )}
      {business.phone && (
        <Action href={`tel:${business.phone}`} onClick={() => trackEvent("call_click", { from: "mobile_bar" })}>
          <Phone size={18} /> Call
        </Action>
      )}
      <Action as={DemoLink} $primary={!wa}>
        <CalendarCheck size={18} /> Book demo
      </Action>
      {!business.phone && (
        <Action
          href={`mailto:${business.email}`}
          onClick={() => trackEvent("email_click", { from: "mobile_bar" })}
        >
          <Mail size={18} /> Email
        </Action>
      )}
    </Bar>
  );
};
