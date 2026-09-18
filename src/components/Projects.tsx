"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects, type Project } from "@/data/portfolio";
import { EASE_OUT, lockScroll } from "@/lib/motion";
import { ArrowUpRight, Close, Github } from "./icons";
import ProjectArt from "./ProjectArt";
import { Chip, SectionHeader } from "./ui";

const FILTERS = ["All", "AI / ML", "Full-Stack"] as const;
type Filter = (typeof FILTERS)[number];

function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-bone hover:bg-bone hover:text-ink"
        >
          <Github className="h-4 w-4" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 items-center gap-2 rounded-full bg-acid px-4 text-sm font-medium text-on-acid transition-transform hover:scale-105"
        >
          {compact ? "Live" : "Live demo"} <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });
  const spotlight = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, ${project.accent}1f, transparent 45%)`);

  const featured = project.featured;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 2) * 0.1 }}
      className={featured ? "md:col-span-2" : ""}
      style={{ perspective: 1200 }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        data-cursor="View"
        onClick={onOpen}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", ["--accent" as string]: project.accent }}
        aria-label={`${project.title} — view details`}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-bone/20 ${
          featured ? "md:flex-row" : ""
        } ${featured && index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: spotlight }} />

        <div className={`relative ${featured ? "aspect-[4/3] md:aspect-auto md:w-[55%]" : "aspect-[16/10]"}`}>
          <ProjectArt glyph={project.glyph} accent={project.accent} />
          <span className="absolute left-5 top-5 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-bone/80 backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className={`relative z-20 flex flex-1 flex-col p-6 md:p-8 ${featured ? "md:p-10" : ""}`}>
          <div className="flex items-center justify-between font-mono text-xs text-mute">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>

          <h3 className={`mt-6 font-semibold tracking-[-0.03em] ${featured ? "text-4xl md:text-6xl" : "text-3xl"}`}>
            {project.title}
          </h3>
          <p className="accent-text mt-2 font-serif text-xl italic">
            {project.subtitle}
          </p>
          <p className={`mt-5 leading-relaxed text-mute ${featured ? "md:text-lg" : "line-clamp-3"}`}>{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, featured ? 7 : 4).map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <span className="flex items-center gap-2 text-sm text-bone/80 transition-colors group-hover:text-accent">
              View details
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </span>
            <ProjectLinks project={project} compact={!featured} />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      // keep Tab inside the dialog
      const items = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-md md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        style={{ ["--accent" as string]: project.accent }}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-ink-2 md:rounded-3xl"
        initial={{ y: 80, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div className="relative aspect-[16/8] overflow-hidden bg-ink-3">
          {project.media ? (
            // eslint-disable-next-line @next/next/no-img-element -- animated GIF, nothing for the optimizer to do
            <img
              src={project.media}
              alt={project.mediaAlt ?? `${project.title} demo`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <ProjectArt glyph={project.glyph} accent={project.accent} />
          )}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-bone text-ink transition-transform hover:rotate-90"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-mute">
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-mute" />
            <span>{project.year}</span>
          </div>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h3>
          <p className="accent-text mt-2 font-serif text-2xl italic">
            {project.subtitle}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-bone/80">{project.description}</p>

          <h4 className="section-label mt-10">Highlights</h4>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h, i) => (
              <motion.li
                key={h}
                className="flex gap-4 border-b border-line pb-3 text-bone/85"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: EASE_OUT }}
              >
                <span className="accent-text font-mono text-xs">
                  0{i + 1}
                </span>
                {h}
              </motion.li>
            ))}
          </ul>

          <h4 className="section-label mt-10">Built with</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-bone"
              >
                <Github className="h-4 w-4" /> View source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-acid px-5 py-3 font-medium text-on-acid"
              >
                Visit live site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = projects.filter((p) => filter === "All" || p.category === filter);
  const open = projects.find((p) => p.slug === openSlug);
  const close = useCallback(() => setOpenSlug(null), []);

  // The section sits in an isolated stacking context, so the dialog is portalled to
  // <body> — otherwise the fixed header paints over it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeader
          index="03"
          label="Selected work"
          lines={[
            "Things I've",
            <span key="b">
              <span className="font-serif font-normal italic text-accent">built</span> &amp; shipped.
            </span>,
          ]}
        />
        <LayoutGroup id="filters">
          <div className="mb-14 flex w-fit gap-1 rounded-full border border-line p-1 md:mb-20" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === f ? "text-on-acid" : "text-bone/70 hover:text-bone"}`}
              >
                {filter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-acid" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">
                  {f}
                  <span className="ml-1.5 font-mono text-[10px] opacity-60">
                    {f === "All" ? projects.length : projects.filter((p) => p.category === f).length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={() => setOpenSlug(p.slug)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/Punithb2?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 border-b border-line pb-2 text-lg transition-colors hover:border-accent hover:text-accent"
        >
          <Github className="h-5 w-5" /> More on GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </a>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{open && <ProjectModal key={open.slug} project={open} onClose={close} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
