"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT } from "@/lib/motion";

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Fades and lifts content in when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Masked line-by-line headline reveal. */
export function SplitHeading({ lines, className }: { lines: React.ReactNode[]; className?: string }) {
  return (
    <h2 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: i * 0.08, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export function SectionHeader({ index, label, lines }: { index: string; label: string; lines: React.ReactNode[] }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal y={16}>
        <p className="section-label mb-6">
          <span className="text-accent">({index})</span> {label}
        </p>
      </Reveal>
      <SplitHeading
        lines={lines}
        className="text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
      />
    </div>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-bone/[0.03] px-3 py-1 font-mono text-[11px] tracking-wide text-bone/80">
      {children}
    </span>
  );
}
