"use client";

import { useEffect, useCallback } from "react";

export function useClickAway({ func, refs, container, mode = "mousedown" }) {
  useEffect(() => {
    const handleClickAway = (event) => {
      const isClickedAway = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target),
      );
      if (isClickedAway) {
        func();
      }
    };

    // Use window as default container only on client side
    const targetContainer =
      container?.current ||
      container ||
      (typeof window !== "undefined" ? window : null);

    if (typeof window !== "undefined" && targetContainer) {
      targetContainer.addEventListener(mode, handleClickAway);
      return () => {
        targetContainer.removeEventListener(mode, handleClickAway);
      };
    }
  }, [refs, func, container, mode]);
}
