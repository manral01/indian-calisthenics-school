// Shared server helpers for the course API (Vercel Functions).
// Folders starting with "_" are not deployed as endpoints.
// No npm packages: Supabase, Razorpay and Bunny are called over plain HTTPS,
// and signatures use the built-in Web Crypto API.
import { productStages, type ProductId } from "../../src/data/course.js";

const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } })
  .process.env;

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Read a required env var, failing with a clear message if Aman hasn't set it in Vercel. */
export const need = (name: string): string => {
  const v = env[name];
  if (!v) throw new HttpError(500, `Server setup incomplete: ${name} is not set in Vercel.`);
  return v;
};

export const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/** Wrap a handler so thrown HttpErrors become JSON responses. */
export const handle =
  (fn: (req: Request) => Promise<Response>) =>
  async (req: Request): Promise<Response> => {
    try {
      return await fn(req);
    } catch (e) {
      if (e instanceof HttpError) return json(e.status, { error: e.message });
      console.error("[lms]", e);
      return json(500, { error: "Something went wrong. Please try again." });
    }
  };

// ─── Crypto ──────────────────────────────────────────────────────────────────
const enc = new TextEncoder();
const hex = (buf: ArrayBuffer) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

export const hmacSha256Hex = async (secret: string, message: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
};

export const sha256Hex = async (message: string) =>
  hex(await crypto.subtle.digest("SHA-256", enc.encode(message)));

/** Constant-time string comparison for signatures. */
export const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

// ─── Supabase ────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email?: string;
}

/** The signed-in student, from the "Authorization: Bearer <token>" header. */
export const getUser = async (req: Request, required = true): Promise<AuthUser | null> => {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    if (required) throw new HttpError(401, "Please log in first.");
    return null;
  }
  const res = await fetch(`${need("SUPABASE_URL")}/auth/v1/user`, {
    headers: { apikey: need("SUPABASE_SERVICE_ROLE_KEY"), Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    if (required) throw new HttpError(401, "Your login has expired. Please log in again.");
    return null;
  }
  const u = (await res.json()) as AuthUser;
  return { id: u.id, email: u.email };
};

/** Supabase REST call with the service role (bypasses row-level security). */
export const db = async <T = unknown>(
  path: string,
  init: RequestInit & { prefer?: string } = {},
): Promise<T> => {
  const key = need("SUPABASE_SERVICE_ROLE_KEY");
  const res = await fetch(`${need("SUPABASE_URL")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.prefer && { Prefer: init.prefer }),
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
};

export const ownedStages = async (userId: string): Promise<string[]> => {
  const rows = await db<{ stage: string }[]>(
    `enrollments?user_id=eq.${encodeURIComponent(userId)}&select=stage`,
  );
  return rows.map((r) => r.stage);
};

export interface OrderRow {
  id: string;
  user_id: string;
  product: ProductId;
  status: string;
}

export const findOrder = async (razorpayOrderId: string, userId?: string) => {
  const rows = await db<OrderRow[]>(
    `orders?razorpay_order_id=eq.${encodeURIComponent(razorpayOrderId)}` +
      (userId ? `&user_id=eq.${encodeURIComponent(userId)}` : "") +
      "&select=id,user_id,product,status",
  );
  return rows[0] ?? null;
};

/** Mark an order paid and unlock its stages. Safe to call more than once. */
export const grantOrder = async (order: OrderRow, razorpayPaymentId: string) => {
  await db(`orders?id=eq.${order.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "paid",
      razorpay_payment_id: razorpayPaymentId,
      paid_at: new Date().toISOString(),
    }),
  });
  const stages = productStages(order.product);
  await db("enrollments?on_conflict=user_id,stage", {
    method: "POST",
    prefer: "resolution=ignore-duplicates",
    body: JSON.stringify(stages.map((stage) => ({ user_id: order.user_id, stage, order_id: order.id }))),
  });
  return stages;
};

// ─── Razorpay ────────────────────────────────────────────────────────────────
export const razorpay = async <T>(path: string, body: unknown): Promise<T> => {
  const auth = btoa(`${need("RAZORPAY_KEY_ID")}:${need("RAZORPAY_KEY_SECRET")}`);
  const res = await fetch(`https://api.razorpay.com/v1/${path}`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Razorpay ${res.status}: ${await res.text()}`);
  return (await res.json()) as T;
};
