"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  pattern?: "grid" | "dots" | "diagonal";
  beams?: boolean;
  rings?: boolean;
  numeral?: string;
  side?: "left" | "right";
};

/** Decorative, theme-aware background for a full-width section wrapper (parent needs `relative isolate`). */
export default function Backdrop({ pattern, beams, rings, numeral, side = "right" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const drift2 = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const numeralY = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const left = side === "left";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {pattern && <div className={`bg-${pattern} absolute inset-0`} />}

      <motion.div style={{ y: drift1 }} className={`absolute top-[5%] h-[42rem] w-[42rem] ${left ? "-right-[12%]" : "-left-[12%]"}`}>
        <div className="blob blob-1 h-full w-full" />
      </motion.div>
      <motion.div style={{ y: drift2 }} className={`absolute bottom-[-10%] h-[36rem] w-[36rem] ${left ? "-left-[8%]" : "-right-[8%]"}`}>
        <div className="blob blob-2 h-full w-full" />
      </motion.div>
      <div className="blob blob-3 absolute left-1/3 top-1/2 h-[28rem] w-[28rem]" />

      {beams && (
        <div className="absolute inset-0 mx-auto max-w-7xl px-5 md:px-10">
          <div className="relative h-full">
            {[0, 25, 50, 75, 100].map((pos, i) => (
              <span
                key={pos}
                className={`beam ${i % 2 ? "hidden md:block" : ""}`}
                style={{ left: `${pos}%`, animationDelay: `${i * 1.3}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {rings && (
        <motion.div
          style={{ rotate: ringRotate }}
          className={`absolute top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 ${left ? "-left-[18rem]" : "-right-[18rem]"}`}
        >
          <svg viewBox="0 0 400 400" className="ring-spin h-full w-full">
            <circle cx="200" cy="200" r="198" fill="none" stroke="var(--color-line)" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="var(--color-line)" strokeDasharray="2 8" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="var(--color-line)" />
            <circle cx="200" cy="2" r="4" fill="var(--color-accent)" />
            <circle cx="350" cy="200" r="3" fill="var(--color-accent)" opacity="0.6" />
            <circle cx="200" cy="300" r="2.5" fill="var(--color-bone)" opacity="0.4" />
          </svg>
        </motion.div>
      )}

      {numeral && (
        <motion.span
          style={{ y: numeralY }}
          className={`numeral absolute top-[8%] ${left ? "-left-[2vw]" : "-right-[2vw]"}`}
        >
          {numeral}
        </motion.span>
      )}
    </div>
  );
}
