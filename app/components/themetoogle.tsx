"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

export default function ThemeToggleButton() {
  const [mode, setMode] = useState<ThemeMode>("system");

  const applyTheme = useCallback((m: ThemeMode) => {
    const root = document.documentElement;

    if (m === "light") {
      root.classList.remove("dark");
    } else if (m === "dark") {
      root.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeMode) ?? "system";
    setMode(saved);
    applyTheme(saved);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const current =
        (localStorage.getItem("theme") as ThemeMode) ?? "system";
      if (current === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [applyTheme]);

  const cycleMode = () => {
    const next: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "system" : "light";

    setMode(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={cycleMode}
      aria-label="Toggle theme"
      className="px-4 py-2 rounded-lg border
        bg-light-card dark:bg-dark-card
        text-light-text dark:text-dark-text
        border-light-border dark:border-dark-border
        hover:opacity-90 transition
        flex items-center gap-2"
    >
      {mode === "light" && <Sun className="w-4 h-4 text-yellow-500" />}
      {mode === "system" && <Monitor className="w-4 h-4 text-gray-500" />}
      {mode === "dark" && <Moon className="w-4 h-4 text-blue-300" />}

      <span className="text-sm font-medium">
        {mode === "light" ? "Light" : mode === "dark" ? "Dark" : "System"}
      </span>
    </button>
  );
}
