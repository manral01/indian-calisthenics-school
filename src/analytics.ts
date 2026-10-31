import { track } from "@vercel/analytics";

/** Conversion events (Vercel Analytics → Events). Never throws. */
export type ConversionEvent =
  | "demo_open"
  | "demo_submit"
  | "whatsapp_click"
  | "call_click"
  | "email_click";

export const trackEvent = (name: ConversionEvent, props?: Record<string, string>) => {
  try {
    track(name, props);
  } catch {
    // analytics must never break the UI
  }
};
