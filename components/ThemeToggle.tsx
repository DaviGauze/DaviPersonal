"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <button onClick={toggle} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #e6e6e6", background: "#fff" }}>
      {theme === "light" ? "Modo escuro" : "Modo claro"}
    </button>
  );
}
