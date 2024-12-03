"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";

const ThemeLayout = ({ children }) => {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "lofi");
    document.documentElement.setAttribute(
      "data-theme",
      savedTheme || "business"
    );
  }, []);

  return <>{children}</>;
};

export default ThemeLayout;
