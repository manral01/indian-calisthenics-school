/**
 * CharacterContext
 *
 * Provides a lightweight pub/sub surface so any component on the page can
 * temporarily override the character's scroll-driven pose with an interaction
 * pose (hover preview or click action).
 *
 * Priority order (highest first):
 *   1. click pose  — triggered by a button/card click, plays for CLICK_DURATION ms
 *   2. hover pose  — triggered while the pointer is over an interactive element
 *   3. scroll pose — derived from the current section (default)
 *
 * The FloatingCharacter reads `overridePose` and falls back to the scroll pose
 * when it is null.
 */

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type PoseName } from "./poses";

/** How long a click-triggered pose stays before reverting (ms). */
const CLICK_DURATION = 2800;

interface CharacterState {
  /** Currently active override pose, or null when scroll-driven. */
  overridePose: PoseName | null;
  /**
   * Call on pointer-enter of an interactive element.
   * Pass null on pointer-leave to clear the hover.
   */
  setHoverPose: (pose: PoseName | null) => void;
  /**
   * Call on click of an interactive element.
   * The pose plays for CLICK_DURATION then reverts automatically.
   */
  triggerClickPose: (pose: PoseName) => void;
}

const CharacterContext = createContext<CharacterState>({
  overridePose: null,
  setHoverPose: () => {},
  triggerClickPose: () => {},
});

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [hoverPose, setHoverPoseState] = useState<PoseName | null>(null);
  const [clickPose, setClickPoseState] = useState<PoseName | null>(null);

  // Track the timeout so we can cancel it if a new click fires while one is active.
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setHoverPose = useCallback((pose: PoseName | null) => {
    // Don't interfere with an active click pose.
    setHoverPoseState(pose);
  }, []);

  const triggerClickPose = useCallback((pose: PoseName) => {
    // Cancel any previous click timeout.
    if (clickTimer.current) clearTimeout(clickTimer.current);

    setClickPoseState(pose);

    clickTimer.current = setTimeout(() => {
      setClickPoseState(null);
      clickTimer.current = null;
    }, CLICK_DURATION);
  }, []);

  // Priority: click > hover > null (scroll takes over in FloatingCharacter)
  const overridePose: PoseName | null = clickPose ?? hoverPose;

  return (
    <CharacterContext.Provider
      value={{ overridePose, setHoverPose, triggerClickPose }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
