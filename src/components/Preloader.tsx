"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_IN_OUT, lockScroll } from "@/lib/motion";

const WORDS = ["Models", "Agents", "Pipelines", "Interfaces", "Punith B"];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lockScroll(true);

    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        timeout = setTimeout(() => {
          window.__introDone = true;
          lockScroll(false);
          setDone(true);
        }, 200);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.85, ease: EASE_IN_OUT }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-mute">
            <span>Portfolio ©2026</span>
            <span>Bengaluru, IN</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-[1.2em] overflow-hidden font-serif text-4xl italic text-bone md:text-6xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.3, ease: EASE_IN_OUT }}
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-sans text-7xl font-semibold tabular-nums tracking-tighter text-accent md:text-[10rem] md:leading-none">
              {count}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] bg-accent" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
