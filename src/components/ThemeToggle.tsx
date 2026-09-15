"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      flushSync(() => setTheme(next));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return apply();

    // Reveal the new theme as a circle growing out of the toggle.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className="group relative grid h-10 w-10 place-items-center rounded-full border border-line text-bone transition-colors hover:border-accent hover:text-accent"
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        animate={{ rotate: dark ? 40 : 90 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        aria-hidden
      >
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <motion.circle
            r="9"
            fill="black"
            initial={false}
            cx={17}
            cy={6}
            animate={{ cx: dark ? 17 : 30, cy: dark ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          initial={false}
          r={8.5}
          animate={{ r: dark ? 8.5 : 4.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.4 : 1 }}
          style={{ originX: "12px", originY: "12px" }}
          transition={{ duration: 0.35 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  );
}
