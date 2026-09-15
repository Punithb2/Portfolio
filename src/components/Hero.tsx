"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { EASE_OUT, INTRO_DELAY, scrollToId } from "@/lib/motion";
import { ArrowDown, ArrowUpRight, Download } from "./icons";
import ParticleField from "./ParticleField";
import { Magnetic } from "./ui";

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.05, ease: EASE_OUT }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole({ delay }: { delay: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [delay]);

  return (
    <span className="relative flex h-[1.2em] overflow-hidden sm:inline-flex sm:align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          className="inline-block whitespace-nowrap font-serif italic text-accent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const d = INTRO_DELAY;

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10">
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-acid/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ opacity: fade, scale }} className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-mute"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: d + 0.2, ease: EASE_OUT }}
        >
          {profile.available && (
            <span className="flex items-center gap-3 rounded-full border border-line bg-ink/60 px-4 py-2 text-bone/80 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-accent" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </span>
          )}
          <span>{profile.location}</span>
        </motion.div>

        <div className="mt-auto">
          <motion.p
            className="mb-4 max-w-xl text-[clamp(1.25rem,2.4vw,2rem)] leading-tight tracking-tight text-bone/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.45, ease: EASE_OUT }}
          >
            I spend my days <RotatingRole delay={d + 1} />
          </motion.p>

          <motion.h1
            style={{ y: nameY }}
            className="flex flex-wrap items-end gap-x-[0.18em] text-[clamp(4.5rem,17vw,15.5rem)] font-semibold leading-[0.82] tracking-[-0.06em]"
          >
            <Letters text={profile.firstName} delay={d} />
            <Letters text="B." delay={d + 0.3} className="font-serif font-normal italic tracking-[-0.02em] text-accent" />
          </motion.h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-lg text-base leading-relaxed text-mute md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: d + 0.7, ease: EASE_OUT }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: d + 0.85, ease: EASE_OUT }}
            >
              <Magnetic>
                <button
                  onClick={() => scrollToId("work")}
                  className="group flex items-center gap-3 rounded-full bg-acid py-3 pl-6 pr-3 font-medium text-on-acid transition-transform active:scale-95"
                >
                  View my work
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-on-acid text-acid transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-line bg-ink/50 px-6 py-[0.9rem] backdrop-blur transition-colors hover:border-bone"
                >
                  <Download className="h-4 w-4" /> Résumé
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.2 }}
        aria-label="Scroll to about"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
