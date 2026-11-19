// GET /api/lms/video?lesson=1-1-1
// Returns a short-lived, signed Bunny Stream player URL — only for free previews
// or students who own the lesson's stage. Copied links stop working after a few hours.
import { lessonById } from "../../src/data/course.js";
import { HttpError, getUser, handle, json, need, ownedStages, sha256Hex } from "../_lib/lms.js";

const LINK_HOURS = 4;

export const GET = handle(async (req) => {
  const id = new URL(req.url).searchParams.get("lesson") ?? "";
  const lesson = lessonById(id);
  if (!lesson) throw new HttpError(404, "Lesson not found.");
  if (!lesson.video) throw new HttpError(404, "This lesson is coming soon.");

  if (!lesson.free) {
    const user = (await getUser(req))!;
    const owned = await ownedStages(user.id);
    if (!owned.includes(lesson.stage)) throw new HttpError(403, "Unlock this stage to watch.");
  }

  const library = need("BUNNY_LIBRARY_ID");
  const expires = Math.floor(Date.now() / 1000) + LINK_HOURS * 3600;
  // Bunny Stream embed token: SHA256_HEX(token_key + video_id + expires)
  const token = await sha256Hex(need("BUNNY_TOKEN_KEY") + lesson.video + expires);
  const url =
    `https://iframe.mediadelivery.net/embed/${library}/${lesson.video}` +
    `?token=${token}&expires=${expires}&autoplay=false&preload=true&responsive=true`;

  return json(200, { url });
});
