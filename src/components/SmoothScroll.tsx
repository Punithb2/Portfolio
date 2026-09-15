"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, autoRaf: true });
    window.__lenis = lenis;
    if (!window.__introDone) lenis.stop();

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
