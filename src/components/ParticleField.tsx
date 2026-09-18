"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; ox: number; oy: number };

/** A drifting constellation that parts around the cursor and links nearby points. */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const LINK = 130;
    const RADIUS = 170;

    // Read theme colours from CSS so the field follows the light/dark toggle.
    let fg = "242,240,234";
    let accent = "200,255,77";
    const toRgb = (hex: string) => {
      const h = hex.trim().replace("#", "");
      const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
      return Number.isNaN(n) ? null : `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
    };
    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      fg = toRgb(css.getPropertyValue("--color-bone")) ?? fg;
      accent = toRgb(css.getPropertyValue("--color-accent")) ?? accent;
    };
    readColors();

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(w < 640 ? 60 : 150, Math.floor((w * h) / 9500));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // drift the anchor, then ease the particle back toward it
        p.ox += p.vx;
        p.oy += p.vy;
        if (p.ox < 0 || p.ox > w) p.vx *= -1;
        if (p.oy < 0 || p.oy > h) p.vy *= -1;

        let tx = p.ox;
        let ty = p.oy;
        if (mouse.active) {
          const dx = p.ox - mouse.x;
          const dy = p.oy - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS && d > 0) {
            const force = (1 - d / RADIUS) * 60;
            tx += (dx / d) * force;
            ty += (dy / d) * force;
          }
        }
        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${fg},${(1 - d / LINK) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        const near = mouse.active && md < RADIUS + 40;
        if (near) {
          ctx.strokeStyle = `rgba(${accent},${(1 - md / (RADIUS + 40)) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = near ? `rgb(${accent})` : `rgba(${fg},0.45)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, near ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (running) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => (mouse.active = false);

    setup();
    if (reduced) draw();
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      setup();
      if (reduced) draw();
    });
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const io = new IntersectionObserver(([entry]) => (running = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
