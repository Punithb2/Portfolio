"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.15, autoRaf: true });
    window.__lenis = lenis;
    if (!window.__introDone) lenis.stop();

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // reducedMotion="user" makes Framer drop transform/layout animation for people who ask for it.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
