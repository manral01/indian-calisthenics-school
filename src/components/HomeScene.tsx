import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/* Fixed full-viewport layer behind the homepage. The CSS glow shows
   instantly; the 3D canvas fades in once three.js has loaded. */
const Stage = styled.div<{ $ready: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 45% at 50% 50%, rgba(255, 106, 0, 0.12), transparent 70%);
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    opacity: ${({ $ready }) => ($ready ? 1 : 0)};
    transition: opacity 1.2s ease;
  }
`;

export const HomeScene = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // three.js is code-split and loaded after first paint, so it never delays the content
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const el = stageRef.current;
    if (!el || !window.WebGLRenderingContext) return;

    // Skip 3D entirely on data-saver or very low-memory devices
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    if (nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 2)) return;

    // Phones get a static render that only redraws on scroll (no idle animation)
    const animate = window.matchMedia("(min-width: 768px)").matches;

    import("./homeScene3d").then(({ startHomeScene }) => {
      if (cancelled) return;
      try {
        cleanup = startHomeScene(el, () => setReady(true), { animate });
      } catch {
        // No WebGL: the CSS glow stays
      }
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <Stage ref={stageRef} $ready={ready} aria-hidden="true" />;
};
