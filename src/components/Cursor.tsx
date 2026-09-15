"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "default" | "hover" | "label";

const RING: Record<Variant, string> = {
  default: "h-[34px] w-[34px] border-bone/50 bg-transparent",
  hover: "h-[60px] w-[60px] border-transparent bg-white",
  label: "h-[96px] w-[96px] border-transparent bg-acid",
};

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });
  const glowX = useSpring(x, { stiffness: 60, damping: 20 });
  const glowY = useSpring(y, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(650px circle at ${glowX}px ${glowY}px, var(--glow-cursor), transparent 45%)`;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button, input, textarea");
      const text = target?.getAttribute("data-cursor");
      if (text) {
        setVariant("label");
        setLabel(text);
      } else setVariant(target ? "hover" : "default");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft light that trails the pointer across the page background */}
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: glow }} />

      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[90] transition-opacity duration-300 ${variant === "hover" ? "mix-blend-difference" : ""}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-out-expo ${RING[variant]}`}
        >
          {variant === "label" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-mono text-[11px] font-medium uppercase tracking-widest text-on-acid"
            >
              {label}
            </motion.span>
          )}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91]"
        style={{ x, y, opacity: visible && variant === "default" ? 1 : 0 }}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
    </>
  );
}
