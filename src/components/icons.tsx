type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowDown = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const ArrowUp = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const Download = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const Copy = ({ className }: P) => (
  <svg {...base} className={className}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></svg>
);
export const Check = ({ className }: P) => (
  <svg {...base} className={className}><path d="m5 12 5 5 9-10" /></svg>
);
export const Close = ({ className }: P) => (
  <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Github = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
