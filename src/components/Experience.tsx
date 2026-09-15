"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { Chip, Reveal, SectionHeader } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionHeader
        index="02"
        label="Experience"
        lines={[
          "Where I've",
          <span key="b">
            shipped <span className="font-serif font-normal italic text-accent">real</span> systems.
          </span>,
        ]}
      />

      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(25%+7px)]" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(25%+7px)]"
        />

        {experience.map((job) => (
          <article key={job.company} className="relative grid gap-6 pb-8 md:grid-cols-4 md:gap-0">
            <Reveal y={20} className="pl-10 md:pl-0 md:pr-10 md:text-right">
              <p className="font-mono text-sm text-bone">{job.period}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-mute">{job.location}</p>
            </Reveal>

            <span className="absolute left-0 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-accent bg-ink md:left-[25%]">
              <span className="h-[7px] w-[7px] rounded-full bg-accent" />
            </span>

            <div className="pl-10 md:col-span-3 md:pl-14">
              <Reveal>
                <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{job.role}</h3>
                <p className="mt-2 font-serif text-2xl italic text-accent md:text-3xl">@ {job.company}</p>
                <p className="mt-6 max-w-2xl text-lg text-bone/80">{job.summary}</p>
              </Reveal>

              <ul className="mt-8 space-y-4">
                {job.points.map((point, i) => (
                  <motion.li
                    key={i}
                    className="group flex gap-4 rounded-2xl border border-transparent p-4 text-mute transition-colors duration-300 hover:border-line hover:bg-bone/[0.03] hover:text-bone"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
                  >
                    <span className="mt-0.5 font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <Reveal className="mt-8 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
