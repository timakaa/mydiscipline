"use client";

import { useEffect } from "react";

export function useClickAway({ func, refs, container, mode }) {
  if (typeof window === "undefined") return;
  mode ? mode : (mode = "mousedown");
  container ? container : (container = window);
  const handleClickAway = (event) => {
    const isClickedAway = refs.every(
      (ref) => ref.current && !ref.current.contains(event.target),
    );
    if (isClickedAway) {
      func();
    }
  };

  useEffect(() => {
    const containerCurrent = container.current;

    if (containerCurrent) {
      containerCurrent.addEventListener(mode, handleClickAway);
      return () => {
        if (containerCurrent) {
          containerCurrent.removeEventListener(mode, handleClickAway);
        }
      };
    }

    if (container) {
      container.addEventListener(mode, handleClickAway);
      return () => {
        container.removeEventListener(mode, handleClickAway);
      };
    }
  }, [refs, func, container, handleClickAway, mode]);
}
