"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { EASE_OUT, scrollToId } from "@/lib/motion";
import Backdrop from "./Backdrop";
import { ArrowUp, ArrowUpRight, Check, Copy } from "./icons";
import { Magnetic, SplitHeading } from "./ui";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: profile.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer ref={ref} id="contact" className="relative isolate overflow-hidden border-t border-line bg-ink-2">
      <Backdrop pattern="dots" rings side="right" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/[0.08] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-10 md:pt-40">
        <p className="section-label mb-8">
          <span className="text-accent">(06)</span> Contact
        </p>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SplitHeading
            className="text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
            lines={[
              "Let's build",
              <span key="b">
                something <span className="font-serif font-normal italic text-accent">great.</span>
              </span>,
            ]}
          />

          <motion.div style={{ rotate }} className="shrink-0 self-start lg:self-auto">
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${profile.email}`}
                className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-acid text-on-acid md:h-52 md:w-52"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <span className="relative flex flex-col items-center gap-1 text-lg font-medium">
                  <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
                  Say hello
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-[clamp(1.4rem,3.5vw,2.75rem)] font-medium tracking-tight underline decoration-line decoration-1 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.email}
          </a>
          <button
            onClick={copy}
            className="flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-bone hover:text-bone"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "done" : "copy"}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy email"}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>

        <div className="mt-24 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="section-label mb-3">Socials</p>
            <ul className="space-y-1">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-bone/85 hover:text-accent">
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label mb-3">Local time</p>
            <p className="text-bone/85">
              <LocalTime /> <span className="text-mute">IST</span>
            </p>
            <p className="text-mute">{profile.location}</p>
          </div>
          <div>
            <p className="section-label mb-3">Résumé</p>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="text-bone/85 hover:text-accent">
              Download PDF ↗
            </a>
          </div>
          <div className="flex items-start sm:justify-start lg:justify-end">
            <button
              onClick={() => scrollToId("top")}
              className="group flex items-center gap-3 text-sm text-mute hover:text-bone"
            >
              Back to top
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 font-mono text-xs text-mute sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Designed & built with Next.js + Framer Motion</span>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[18%] text-center text-[24vw] font-semibold leading-none tracking-[-0.08em] text-bone/[0.05]">
          PUNITH
        </p>
      </div>
    </footer>
  );
}
