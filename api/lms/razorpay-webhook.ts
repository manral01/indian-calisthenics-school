// POST /api/lms/razorpay-webhook   (set this URL in Razorpay → Settings → Webhooks)
// Backup path: unlocks the course even if the student closed the browser right
// after paying. Events: payment.captured, order.paid.
import { findOrder, grantOrder, handle, hmacSha256Hex, json, need, safeEqual } from "../_lib/lms.js";

interface WebhookBody {
  event: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string } };
    order?: { entity?: { id?: string } };
  };
}

export const POST = handle(async (req) => {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const expected = await hmacSha256Hex(need("RAZORPAY_WEBHOOK_SECRET"), raw);
  if (!safeEqual(expected, signature)) return json(400, { error: "Bad signature" });

  const body = JSON.parse(raw) as WebhookBody;
  if (body.event !== "payment.captured" && body.event !== "order.paid")
    return json(200, { ignored: body.event });

  const payment = body.payload?.payment?.entity;
  const orderId = payment?.order_id ?? body.payload?.order?.entity?.id;
  if (!orderId || !payment?.id) return json(200, { ignored: "no order" });

  const order = await findOrder(orderId);
  if (!order) return json(200, { ignored: "unknown order" });

  await grantOrder(order, payment.id);
  return json(200, { ok: true });
});
