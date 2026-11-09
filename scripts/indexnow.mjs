// After a production deploy build, tell Bing (and other IndexNow engines, which
// also feed ChatGPT and Copilot search) which URLs exist, so new and changed
// pages are picked up quickly. Never fails the build.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] not a production build, skipping");
  process.exit(0);
}
try {
  const key = readdirSync(join(root, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
  const sitemap = readFileSync(join(root, "dist", "sitemap.xml"), "utf8");
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const host = new URL(urlList[0]).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
    signal: AbortSignal.timeout(10000),
  });
  console.log(`[indexnow] submitted ${urlList.length} URLs: HTTP ${res.status}`);
} catch (e) {
  console.warn("[indexnow] skipped:", e instanceof Error ? e.message : e);
}
