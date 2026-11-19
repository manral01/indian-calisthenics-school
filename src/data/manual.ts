// Course manuals (read online, no download). Section text lives server-side in
// api/_content/ and is fetched per section; only titles are here.
// Regenerate both files from the PDF: python3 scripts/build-manual.py <pdf> stage-1
import type { StageId } from "./course.js";
import { manualStage1Toc } from "./manual-stage-1.js";

export interface ManualSection {
  id: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
}

export interface Manual {
  stage: StageId;
  title: string;
  kicker: string;
  toc: ManualSection[];
}

/** Stage 1 modules anyone can read for free (plus the Welcome). */
export const FREE_MODULES = new Set(["1.0", "1.1", "1.2"]);

/** Sections open to everyone as a free sample (every section of the free modules). */
export const FREE_MANUAL_SECTIONS = new Set(
  manualStage1Toc.filter((s) => FREE_MODULES.has(s.moduleId)).map((s) => s.id),
);

export const manuals: Partial<Record<StageId, Manual>> = {
  "stage-1": {
    stage: "stage-1",
    title: "Foundation",
    kicker: "Stage 1 of 3",
    toc: manualStage1Toc,
  },
};

export const MANUAL_PATH = "/manual";

export const manualHref = (stage: StageId, section?: string) =>
  `${MANUAL_PATH}?stage=${stage}${section ? `&s=${encodeURIComponent(section)}` : ""}`;
