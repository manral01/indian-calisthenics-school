// GET /api/lms/manual?stage=stage-1&s=1.1.1
// Returns one section of the course manual as HTML: free sample sections for
// anyone, everything else only for students who own the stage. The PDF itself
// is never served, so there is nothing to download.
import { FREE_MANUAL_SECTIONS } from "../../src/data/manual.js";
import { manualStage1 } from "../_content/manual-stage-1.js";
import { HttpError, getUser, handle, json, ownedStages } from "../_lib/lms.js";

const content: Record<string, Record<string, string>> = { "stage-1": manualStage1 };

export const GET = handle(async (req) => {
  const q = new URL(req.url).searchParams;
  const stage = q.get("stage") ?? "stage-1";
  const id = q.get("s") ?? "";
  const html = content[stage]?.[id];
  if (!html) throw new HttpError(404, "Section not found.");

  if (!(stage === "stage-1" && FREE_MANUAL_SECTIONS.has(id))) {
    const user = (await getUser(req))!;
    if (!(await ownedStages(user.id)).includes(stage))
      throw new HttpError(403, "Unlock this stage to read the full manual.");
  }
  return json(200, { html });
});
