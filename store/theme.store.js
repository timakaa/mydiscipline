"use client";

import { create } from "zustand";

export const useThemeStore = create((set) => ({
  isLofi: false,
  setTheme: (isLofi) => {
    localStorage.setItem("theme", isLofi ? "lofi" : "business");
    set({ isLofi });
  },
}));
