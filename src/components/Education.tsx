"use client";

import { motion } from "framer-motion";
import { certifications, education } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { Reveal, SectionHeader } from "./ui";

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionHeader
        index="05"
        label="Education & certifications"
        lines={[
          "Always",
          <span key="b">
            <span className="font-serif font-normal italic text-accent">learning.</span>
          </span>,
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 md:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-acid/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative flex items-center justify-between font-mono text-xs uppercase tracking-widest text-mute">
                <span>{e.period}</span>
                <span>{e.location}</span>
              </div>
              <h3 className="relative mt-10 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{e.school}</h3>
              <p className="relative mt-2 text-mute">{e.degree}</p>
              <p className="relative mt-8 font-serif text-5xl italic text-accent md:text-6xl">{e.score}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal y={16}>
          <p className="section-label mb-4">Certifications</p>
        </Reveal>
        <ul className="border-t border-line">
          {certifications.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
              className="group relative overflow-hidden border-b border-line"
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-acid transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              <div className="relative grid grid-cols-[1fr_auto] items-center gap-4 px-2 py-6 transition-colors duration-300 group-hover:text-on-acid md:grid-cols-[1fr_1fr_auto_auto] md:gap-8 md:px-4">
                <span className="text-xl font-medium tracking-tight md:text-2xl">{c.title}</span>
                <span className="col-span-2 row-start-2 text-sm text-mute group-hover:text-on-acid/70 md:col-span-1 md:row-start-auto">
                  {c.issuer}
                </span>
                <span className="hidden font-mono text-sm md:block">{c.date}</span>
                <span aria-hidden className="text-xl text-accent transition-transform duration-700 group-hover:rotate-180 group-hover:text-on-acid">
                  ✦
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
