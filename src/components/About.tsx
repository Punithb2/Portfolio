"use client";

import { animate, motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/data/portfolio";
import { Reveal } from "./ui";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-[-0.025em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal y={16}>
            <p className="section-label md:sticky md:top-32">
              <span className="text-accent">(01)</span> About me
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <ScrollText text={profile.about} />
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="group relative overflow-hidden border-b border-r border-line p-6 md:p-8">
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-acid/[0.06] transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
            <div className="relative text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-tighter">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <p className="relative mt-4 max-w-[16rem] text-sm leading-snug text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
