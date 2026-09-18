"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { EASE_IN_OUT, EASE_OUT, INTRO_DELAY, introSeen, lockScroll, scrollToId } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  // The header waits for the preloader only on its first entrance, not on every hide/show.
  const [introDelay] = useState(() => (introSeen() ? 0 : INTRO_DELAY + 0.3));
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), (introDelay + 1) * 1000);
    return () => clearTimeout(t);
  }, [introDelay]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    if (open) {
      setOpen(false);
      lockScroll(false);
      setTimeout(() => scrollToId(id), 450);
    } else scrollToId(id);
  };

  const toggle = () => {
    lockScroll(!open);
    setOpen(!open);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-10 md:pt-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: entered ? 0 : introDelay }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-500 md:px-4 ${
            scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <button onClick={() => go("top")} className="group flex items-center gap-2 pl-2" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-acid font-serif text-lg italic text-on-acid transition-transform duration-500 group-hover:rotate-[360deg]">
              P
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? "text-ink" : "text-bone/70 hover:text-bone"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent sm:block"
            >
              Résumé
            </a>
            <button
              onClick={toggle}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-bone text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(l.id)}
                    className="flex w-full items-baseline gap-4 text-left text-5xl font-semibold tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease: EASE_OUT }}
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {s.label}
                </a>
              ))}
              <a href={profile.resume} target="_blank" rel="noreferrer" className="hover:text-accent">
                Résumé
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
