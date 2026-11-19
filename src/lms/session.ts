// Student login (Supabase Auth) and data access, using plain fetch (no SDK).
// Login methods: 6-digit email code, or Google.
import { useSyncExternalStore } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** False until the Supabase keys are added in Vercel. */
export const lmsConfigured = Boolean(SUPABASE_URL && ANON_KEY);

export interface Session {
  access_token: string;
  refresh_token: string;
  /** Unix seconds */
  expires_at: number;
  user: { id: string; email?: string };
}

const STORAGE_KEY = "ics_lms_session";
const now = () => Math.floor(Date.now() / 1000);

// ─── Session store ───────────────────────────────────────────────────────────
let current: Session | null | undefined; // undefined = not read from storage yet
const listeners = new Set<() => void>();

const read = (): Session | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
};

const snapshot = () => {
  if (current === undefined) current = read();
  return current;
};

const save = (s: Session | null) => {
  current = s;
  try {
    if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode etc.: session lasts for this tab only
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      current = read();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};

/**
 * The logged-in student. `undefined` while loading (always on the prerendered
 * HTML and the first browser render, so hydration matches), then Session | null.
 */
export const useSession = () =>
  useSyncExternalStore(subscribe, snapshot, () => undefined);

// ─── Supabase Auth calls ─────────────────────────────────────────────────────
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  user: { id: string; email?: string };
}

const toSession = (r: TokenResponse): Session => ({
  access_token: r.access_token,
  refresh_token: r.refresh_token,
  expires_at: r.expires_at ?? now() + r.expires_in,
  user: { id: r.user.id, email: r.user.email },
});

const errorMessage = (data: Record<string, unknown>, fallback: string) =>
  String(data.error_description ?? data.msg ?? data.message ?? data.error ?? fallback);

const authCall = async <T>(path: string, body: unknown, token?: string): Promise<T> => {
  if (!lmsConfigured) throw new Error("Online course login isn't switched on yet.");
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY!,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  const data = (text ? JSON.parse(text) : {}) as Record<string, unknown>;
  if (!res.ok) throw new Error(errorMessage(data, "Something went wrong. Please try again."));
  return data as T;
};

/** Email a one-time login code (creates the account on first login). */
export const sendCode = (email: string) =>
  authCall("otp", { email, create_user: true });

export const verifyCode = async (email: string, code: string) => {
  const r = await authCall<TokenResponse>("verify", { type: "email", email, token: code });
  save(toSession(r));
};

/** Full-page redirect to Google; comes back to `next` on this site. */
export const googleLoginUrl = (next: string) =>
  `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(
    window.location.origin + next,
  )}`;

const decodeJwt = (jwt: string): Record<string, unknown> => {
  try {
    const part = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(part), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
  } catch {
    return {};
  }
};

/** After Google login, Supabase returns tokens in the URL hash: save them and clean the URL. */
export const captureOAuthRedirect = () => {
  if (typeof window === "undefined" || !window.location.hash.includes("access_token=")) return;
  const p = new URLSearchParams(window.location.hash.slice(1));
  const access = p.get("access_token");
  const refresh = p.get("refresh_token");
  if (access && refresh) {
    const claims = decodeJwt(access);
    save({
      access_token: access,
      refresh_token: refresh,
      expires_at: Number(p.get("expires_at")) || now() + Number(p.get("expires_in") || 3600),
      user: { id: String(claims.sub ?? ""), email: claims.email as string | undefined },
    });
  }
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
};

let refreshing: Promise<string | null> | null = null;

/** A valid access token (refreshing it if needed), or null when logged out. */
export const getAccessToken = async (): Promise<string | null> => {
  const s = snapshot();
  if (!s) return null;
  if (s.expires_at - 60 > now()) return s.access_token;
  refreshing ??= authCall<TokenResponse>("token?grant_type=refresh_token", {
    refresh_token: s.refresh_token,
  })
    .then((r) => {
      save(toSession(r));
      return r.access_token;
    })
    .catch(() => {
      save(null);
      return null;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
};

export const signOut = async () => {
  const token = await getAccessToken();
  save(null);
  if (token) await authCall("logout", {}, token).catch(() => {});
};

// ─── Data (row-level security limits every query to the student's own rows) ──
const rest = async <T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<T> => {
  if (!lmsConfigured) throw new Error("Online course isn't switched on yet.");
  const token = await getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: ANON_KEY!,
      Authorization: `Bearer ${token ?? ANON_KEY}`,
      "Content-Type": "application/json",
      ...(init.prefer && { Prefer: init.prefer }),
    },
  });
  if (!res.ok) throw new Error("Couldn't load your course. Check your connection and try again.");
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
};

export const fetchMyStages = async () =>
  (await rest<{ stage: string }[]>("enrollments?select=stage")).map((r) => r.stage);

export const fetchMyProgress = async () =>
  new Set((await rest<{ lesson_id: string }[]>("lesson_progress?select=lesson_id")).map((r) => r.lesson_id));

export const setLessonDone = (lessonId: string, done: boolean) =>
  done
    ? rest("lesson_progress?on_conflict=user_id,lesson_id", {
        method: "POST",
        prefer: "resolution=ignore-duplicates",
        body: JSON.stringify({ lesson_id: lessonId }),
      })
    : rest(`lesson_progress?lesson_id=eq.${encodeURIComponent(lessonId)}`, { method: "DELETE" });

/** Call our own server API (/api/lms/*) as the logged-in student. */
export const lmsApi = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const token = await getAccessToken();
  const res = await fetch(`/api/lms/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new Error(String(data.error ?? "Something went wrong. Please try again."));
  return data as T;
};
