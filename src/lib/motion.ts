import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    __introDone?: boolean;
  }
}

/** Seconds until the preloader has lifted and hero animations should start. */
export const INTRO_DELAY = 1.75;

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** sessionStorage key: the preloader plays once per browser session, not on every navigation. */
export const INTRO_KEY = "intro-seen";

export function introSeen() {
  try {
    return typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (locked) window.__lenis?.stop();
  else window.__lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
