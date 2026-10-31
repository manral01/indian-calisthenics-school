// Fetches the latest real Google reviews at build time (Places API, New) and
// writes them to src/data/googleReviews.json. Runs server-side, so the API
// key never ships to the browser.
//
// Env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID (set them in Vercel → Settings
// → Environment Variables). Without them, the existing JSON is kept and the
// site shows a "read our reviews on Google" link instead of review cards.
import { writeFileSync } from "node:fs";

const OUT = new URL("../src/data/googleReviews.json", import.meta.url);
const key = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!key || !placeId) {
  console.log("[reviews] GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not set, keeping existing googleReviews.json");
  process.exit(0);
}

try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const data = await res.json();

  const reviews = (data.reviews ?? [])
    .filter((r) => r.text?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google user",
      authorUri: r.authorAttribution?.uri ?? "",
      rating: r.rating,
      text: r.originalText?.text ?? r.text.text,
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
    }));

  writeFileSync(
    OUT,
    JSON.stringify(
      {
        rating: data.rating ?? null,
        userRatingCount: data.userRatingCount ?? null,
        googleMapsUri: data.googleMapsUri ?? "",
        fetchedAt: new Date().toISOString(),
        reviews,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`[reviews] saved ${reviews.length} Google reviews`);
} catch (err) {
  // Never fail the deploy over reviews; keep the last good file
  console.warn("[reviews] fetch failed, keeping existing googleReviews.json:", err.message);
}
