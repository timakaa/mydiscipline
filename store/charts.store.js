"use client";

import { create } from "zustand";

export const useChartsStore = create((set) => ({
  split: false,
  details: false,
  changeOrder: false,
  setSplit: (split) =>
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("splitView", split);
      }
      return { ...state, split };
    }),
  setDetails: (details) =>
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("details", details);
      }
      return { ...state, details };
    }),
  setChangeOrder: (changeOrder) =>
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("changeOrder", changeOrder);
      }
      return { ...state, changeOrder };
    }),
}));
