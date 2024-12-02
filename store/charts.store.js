"use client";

import { create } from "zustand";

// Add this helper function
const arrayMove = (array, oldIndex, newIndex) => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, movedItem);
  return newArray;
};

export const useChartsStore = create((set) => ({
  split: false,
  details: false,
  changeOrder: false,
  chartsOrder: [],
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
  updateChartsOrder: (newOrder) =>
    set((state) => ({
      ...state,
      chartsOrder: newOrder,
    })),
}));
