"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { SectionHeader } from "./ui";

const ICONS = ["◎", "⌘", "◐", "☁"];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionHeader
        index="04"
        label="Skills & tools"
        lines={[
          "My everyday",
          <span key="b">
            <span className="font-serif font-normal italic text-accent">toolkit.</span>
          </span>,
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((group, gi) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: gi * 0.08, ease: EASE_OUT }}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
            }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 md:p-10"
          >
            {/* cursor-following glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at var(--x) var(--y), var(--glow-1), transparent 50%)" }}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-mute">0{gi + 1}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{group.group}</h3>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line text-xl text-accent transition-transform duration-700 ease-out-expo group-hover:rotate-180 group-hover:border-accent">
                {ICONS[gi]}
              </span>
            </div>

            <ul className="relative mt-10 flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: EASE_OUT }}
                  whileHover={{ y: -4 }}
                  className="rounded-full border border-line bg-ink px-4 py-2 text-sm text-bone/85 transition-colors duration-300 hover:border-accent hover:bg-acid hover:text-on-acid"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
