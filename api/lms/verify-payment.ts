// POST /api/lms/verify-payment  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Called by the browser right after Razorpay Checkout succeeds. Checks Razorpay's
// signature, then unlocks the stages. The webhook does the same as a backup.
import { HttpError, findOrder, getUser, grantOrder, handle, hmacSha256Hex, json, need, safeEqual } from "../_lib/lms.js";

export const POST = handle(async (req) => {
  const user = (await getUser(req))!;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const orderId = String(b.razorpay_order_id ?? "");
  const paymentId = String(b.razorpay_payment_id ?? "");
  const signature = String(b.razorpay_signature ?? "");
  if (!orderId || !paymentId || !signature) throw new HttpError(400, "Missing payment details.");

  const expected = await hmacSha256Hex(need("RAZORPAY_KEY_SECRET"), `${orderId}|${paymentId}`);
  if (!safeEqual(expected, signature)) throw new HttpError(400, "Payment could not be verified.");

  const order = await findOrder(orderId, user.id);
  if (!order) throw new HttpError(404, "Order not found.");

  const stages = await grantOrder(order, paymentId);
  return json(200, { ok: true, stages });
});
