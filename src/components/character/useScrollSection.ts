/**
 * useScrollSection
 *
 * Uses IntersectionObserver to track which website section is currently
 * the most visible in the viewport. Returns the id of that section.
 *
 * Sections are observed in the order they appear in the DOM so that
 * when two are simultaneously partially visible, the one that appears
 * later in the scroll order wins (i.e. the one the user is scrolling into).
 */

import { useEffect, useState } from "react";

/** IDs of sections in page order — must match the id attributes in the DOM. */
const SECTION_ORDER = [
  "home",
  "about",
  "skills",
  "programs",
  "gallery",
  "testimonials",
  "coaching",
  "faq",
  "contact",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

export function useScrollSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    // Track the visibility ratio of every watched section.
    const ratios = new Map<string, number>(SECTION_ORDER.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        // Pick the section with the highest current visibility ratio.
        // Tie-break by page order (later section wins) so as user scrolls
        // downward the next section takes over smoothly.
        let bestId: SectionId = "home";
        let bestRatio = -1;

        SECTION_ORDER.forEach((id) => {
          const ratio = ratios.get(id) ?? 0;
          // Use >= so later sections in the array win ties.
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) {
          setActive(bestId);
        }
      },
      {
        // Sample at several thresholds for fine-grained ratio updates.
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Shrink the root margin so sections are only "active" when they
        // occupy a meaningful portion of the viewport.
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe every section that exists in the current DOM.
    const elements: Element[] = [];
    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return active;
}
