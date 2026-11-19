// POST /api/lms/create-order  { product: "stage-1" | "stage-2" | "stage-3" | "bundle" }
// Creates a Razorpay order at the price in src/data/course.ts (never trusts the browser's price).
import { isProductId, productName, productPrice, productStages } from "../../src/data/course.js";
import { HttpError, db, getUser, handle, json, need, ownedStages, razorpay } from "../_lib/lms.js";

export const POST = handle(async (req) => {
  const user = (await getUser(req))!;
  const { product } = (await req.json().catch(() => ({}))) as { product?: unknown };
  if (!isProductId(product)) throw new HttpError(400, "Unknown course stage.");

  const price = productPrice(product);
  if (price === null) throw new HttpError(400, "This stage isn't on sale yet.");

  const owned = await ownedStages(user.id);
  const wanted = productStages(product);
  if (wanted.every((s) => owned.includes(s)))
    throw new HttpError(409, "You already have access to this. Open My Course to continue.");
  if (product === "bundle" && owned.length > 0)
    throw new HttpError(409, "You already own part of the course. Buy the remaining stages individually.");

  const amount = price * 100;
  const order = await razorpay<{ id: string; amount: number; currency: string }>("orders", {
    amount,
    currency: "INR",
    receipt: `ics_${Date.now()}`,
    notes: { user_id: user.id, product, email: user.email ?? "" },
  });

  await db("orders", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.id,
      product,
      amount_paise: amount,
      currency: order.currency,
      razorpay_order_id: order.id,
    }),
  });

  return json(200, {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: need("RAZORPAY_KEY_ID"),
    description: productName(product),
    email: user.email ?? "",
  });
});
