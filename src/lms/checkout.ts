// Razorpay Checkout: create order on our server → pay in Razorpay's popup →
// verify on our server → stages unlocked.
import type { ProductId } from "../data/course";
import { lmsApi } from "./session";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, cb: (e: { error?: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

let scriptPromise: Promise<void> | null = null;
const loadRazorpay = () =>
  (scriptPromise ??= new Promise<void>((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Couldn't load the payment window. Check your connection and try again."));
    };
    document.head.appendChild(s);
  }));

export class CheckoutCancelled extends Error {}

/** Opens Razorpay for `product`. Resolves once the stages are unlocked. */
export async function buy(product: ProductId): Promise<void> {
  const [order] = await Promise.all([
    lmsApi<{
      orderId: string;
      amount: number;
      currency: string;
      keyId: string;
      description: string;
      email: string;
    }>("create-order", { method: "POST", body: JSON.stringify({ product }) }),
    loadRazorpay(),
  ]);

  await new Promise<void>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Indian Calisthenics School",
      description: order.description,
      image: "/mainLogo.jpeg",
      prefill: { email: order.email },
      theme: { color: "#FF6A00" },
      handler: (resp: RazorpayResponse) => {
        lmsApi("verify-payment", { method: "POST", body: JSON.stringify(resp) }).then(
          () => resolve(),
          // Paid but verification call failed (e.g. network): the webhook will
          // still unlock it, so tell the student rather than failing silently.
          () =>
            reject(
              new Error(
                "Payment received. Your course is being unlocked: refresh My Course in a minute. If it doesn't appear, WhatsApp us.",
              ),
            ),
        );
      },
      modal: { ondismiss: () => reject(new CheckoutCancelled("Payment cancelled.")) },
    });
    rzp.on("payment.failed", (e) => {
      // Razorpay lets the student retry inside the popup; only log here.
      console.warn("[checkout] payment failed", e.error?.description);
    });
    rzp.open();
  });
}
