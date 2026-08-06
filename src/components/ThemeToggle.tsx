"use client";

import { useState } from "react";

function initialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "light" || current === "dark") return current;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Changer de thème"
      className="font-ui text-xs px-2.5 py-1.5 rounded-full border border-line text-muted hover:border-ink hover:text-ink transition-colors cursor-pointer"
    >
      {theme === "dark" ? "☀︎ Clair" : "☾ Sombre"}
    </button>
  );
}
