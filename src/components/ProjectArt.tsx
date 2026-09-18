"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";

const loop = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "linear" as const });
const wave = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" as const });

/** Generative, animated artwork for each project, drawn in the project's accent colour. */
export default function ProjectArt({ glyph, accent }: { glyph: Project["glyph"]; accent: string }) {
  return (
    <div className="theme-dark relative h-full w-full overflow-hidden bg-ink-3">
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(circle at 50% 55%, ${accent}33, transparent 60%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)",
        }}
      />
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-110" aria-hidden>
        {glyph === "atlas" && <Atlas c={accent} />}
        {glyph === "points" && <Points c={accent} />}
        {glyph === "mesh" && <Mesh c={accent} />}
        {glyph === "house" && <House c={accent} />}
        {glyph === "doc" && <Doc c={accent} />}
        {glyph === "leaf" && <Leaf c={accent} />}
        {glyph === "medal" && <Medal c={accent} />}
        {glyph === "pulse" && <Pulse c={accent} />}
      </svg>
    </div>
  );
}

function Atlas({ c }: { c: string }) {
  const nodes = [
    { r: 60, a: 0, s: 14 },
    { r: 95, a: 120, s: 22 },
    { r: 130, a: 240, s: 30 },
  ];
  return (
    <g transform="translate(200 150)">
      {nodes.map((n) => (
        <circle key={n.r} r={n.r} fill="none" stroke="rgba(242,240,234,.14)" strokeDasharray="3 6" />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i} initial={{ rotate: n.a }} animate={{ rotate: n.a + 360 }} transition={loop(n.s)}>
          <circle cx={n.r} cy={0} r={7 - i} fill={c} />
          <circle cx={-n.r * 0.7} cy={n.r * 0.7} r={3} fill="rgba(242,240,234,.6)" />
        </motion.g>
      ))}
      <motion.circle r={26} fill="none" stroke={c} strokeWidth={1.5} animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} transition={wave(2)} />
      <circle r={18} fill={c} />
      <text y={5} textAnchor="middle" fontSize={13} fontFamily="monospace" fill="#09090b" fontWeight={700}>
        92%
      </text>
    </g>
  );
}

/** A sketched line that lifts into a wireframe cube — sketch to 3D mesh. */
function Mesh({ c }: { c: string }) {
  const verts: [number, number][] = [
    [200, 60],
    [290, 110],
    [110, 110],
    [200, 160],
    [200, 250],
    [110, 200],
    [290, 200],
  ];
  return (
    <g>
      <motion.path
        d="M95 235 Q150 205 200 238 T305 232"
        fill="none"
        stroke="rgba(242,240,234,.5)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.g animate={{ y: [8, -8, 8] }} transition={wave(5)}>
        <polygon points="200,60 290,110 200,160 110,110" fill={`${c}22`} stroke={c} strokeWidth={1.5} />
        <polygon points="110,110 200,160 200,250 110,200" fill={`${c}10`} stroke={c} strokeWidth={1.5} />
        <polygon points="290,110 200,160 200,250 290,200" fill={`${c}30`} stroke={c} strokeWidth={1.5} />
        {[0.25, 0.5, 0.75].map((t) => (
          <g key={t} stroke={c} strokeOpacity={0.35}>
            <line x1={110 + 90 * t} y1={110 + 50 * t} x2={110 + 90 * t} y2={200 + 50 * t} />
            <line x1={200 + 90 * t} y1={160 - 50 * t} x2={200 + 90 * t} y2={250 - 50 * t} />
            <line x1={200 - 90 * t} y1={60 + 50 * t} x2={290 - 90 * t} y2={110 + 50 * t} />
          </g>
        ))}
        {verts.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={3.5} fill={c} animate={{ opacity: [0.3, 1, 0.3] }} transition={wave(2, i * 0.2)} />
        ))}
      </motion.g>
      <g fontFamily="monospace" fontSize={11} fill="rgba(242,240,234,.75)">
        <text x={300} y={70}>silhouette</text>
        <text x={300} y={86} fill={c}>
          IoU 84–93%
        </text>
      </g>
    </g>
  );
}

/** A flat silhouette on the left turning into an orbiting point cloud on the right. */
function Points({ c }: { c: string }) {
  // deterministic pseudo-random cloud so server and client render the same thing
  const cloud = Array.from({ length: 90 }, (_, i) => {
    const a = i * 2.399963;
    const r = 58 * Math.sqrt(((i * 37) % 90) / 90);
    const depth = ((i * 53) % 100) / 100;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.75 - depth * 12, d: depth };
  });

  return (
    <g>
      <g transform="translate(95 150)">
        <path
          d="M-34 60 L-34 -18 Q-34 -46 0 -46 Q34 -46 34 -18 L34 60 Z"
          fill="rgba(242,240,234,.16)"
          stroke="rgba(242,240,234,.45)"
          strokeWidth={1.5}
        />
        <text y={86} textAnchor="middle" fontFamily="monospace" fontSize={11} fill="rgba(242,240,234,.5)">
          silhouette
        </text>
      </g>

      <motion.g animate={{ x: [0, 6, 0], opacity: [0.35, 1, 0.35] }} transition={wave(2.6)}>
        <path d="M140 150 H190" stroke={c} strokeWidth={1.5} strokeDasharray="4 5" />
        <path d="M184 145 L192 150 L184 155" fill={c} />
      </motion.g>

      <motion.g animate={{ rotate: 360 }} transition={loop(18)} style={{ transformOrigin: "275px 150px" }}>
        {cloud.map((p, i) => (
          <circle key={i} cx={275 + p.x} cy={150 + p.y} r={0.8 + p.d * 1.8} fill={c} opacity={0.25 + p.d * 0.7} />
        ))}
      </motion.g>
      <text x={275} y={236} textAnchor="middle" fontFamily="monospace" fontSize={11} fill={c}>
        2,048 points
      </text>
    </g>
  );
}

/** A house outline with a price trend climbing behind it. */
function House({ c }: { c: string }) {
  const bars = [40, 62, 55, 84, 96, 120];
  return (
    <g>
      <g opacity={0.5}>
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={60 + i * 26}
            width={14}
            rx={3}
            fill={c}
            opacity={0.35}
            initial={{ y: 250, height: 0 }}
            animate={{ y: [250, 250 - h, 250 - h, 250], height: [0, h, h, 0] }}
            transition={{ duration: 5, delay: i * 0.12, repeat: Infinity, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }}
          />
        ))}
      </g>

      <motion.g animate={{ y: [0, -6, 0] }} transition={wave(4.5)}>
        <path d="M200 70 L290 140 V250 H110 V140 Z" fill={`${c}1f`} stroke={c} strokeWidth={1.8} strokeLinejoin="round" />
        <path d="M95 148 L200 62 L305 148" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={180} y={190} width={40} height={60} rx={3} fill="rgba(242,240,234,.14)" stroke={c} />
        <rect x={128} y={166} width={34} height={30} rx={3} fill="rgba(242,240,234,.1)" stroke={c} />
        <rect x={238} y={166} width={34} height={30} rx={3} fill="rgba(242,240,234,.1)" stroke={c} />
      </motion.g>

      <motion.path
        d="M70 230 L120 205 L170 212 L220 170 L270 150 L330 96"
        fill="none"
        stroke={c}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.45, 0.85, 1], ease: "easeInOut" }}
      />
      <g fontFamily="monospace" fontSize={11} fill="rgba(242,240,234,.75)">
        <text x={40} y={60}>w · x + b</text>
        <text x={40} y={78} fill={c}>
          numpy only
        </text>
      </g>
    </g>
  );
}

function Doc({ c }: { c: string }) {
  return (
    <g>
      <rect x={130} y={40} width={140} height={200} rx={10} fill="rgba(242,240,234,.04)" stroke="rgba(242,240,234,.3)" />
      <circle cx={160} cy={75} r={14} fill={`${c}55`} />
      <rect x={185} y={66} width={60} height={7} rx={3.5} fill="rgba(242,240,234,.5)" />
      <rect x={185} y={80} width={40} height={5} rx={2.5} fill="rgba(242,240,234,.25)" />
      {[110, 128, 146, 164, 182, 200].map((y, i) => (
        <rect key={y} x={150} y={y} width={i % 3 === 2 ? 60 : 100} height={6} rx={3} fill="rgba(242,240,234,.2)" />
      ))}
      <motion.rect x={138} width={124} height={18} rx={4} fill={`${c}40`} stroke={c} animate={{ y: [102, 194, 102] }} transition={wave(3.2)} />
      <motion.g animate={{ scale: [0.9, 1, 0.9] }} transition={wave(3.2)} style={{ originX: "300px", originY: "210px" }}>
        <circle cx={300} cy={210} r={30} fill="#09090b" stroke={c} strokeWidth={2} />
        <text x={300} y={216} textAnchor="middle" fontFamily="monospace" fontSize={16} fontWeight={700} fill={c}>
          A+
        </text>
      </motion.g>
    </g>
  );
}

function Leaf({ c }: { c: string }) {
  return (
    <g>
      <motion.g animate={{ rotate: [-4, 4, -4] }} transition={wave(6)} style={{ originX: "200px", originY: "250px" }}>
        <path d="M200 250 C120 210 110 110 200 45 C290 110 280 210 200 250Z" fill={`${c}22`} stroke={c} strokeWidth={1.8} />
        <path d="M200 250 L200 60" stroke={c} strokeWidth={1.5} />
        {[90, 125, 160, 195].map((y) => (
          <g key={y} stroke={c} strokeOpacity={0.6} fill="none">
            <path d={`M200 ${y + 20} Q175 ${y + 5} 155 ${y - 10}`} />
            <path d={`M200 ${y + 20} Q225 ${y + 5} 245 ${y - 10}`} />
          </g>
        ))}
        <circle cx={172} cy={150} r={9} fill="#ffb86b" opacity={0.8} />
        <circle cx={232} cy={118} r={6} fill="#ffb86b" opacity={0.7} />
      </motion.g>
      <motion.rect x={120} width={160} height={2} fill={c} animate={{ y: [50, 250, 50] }} transition={wave(3.5)} />
      <g fontFamily="monospace" fontSize={11} fill="rgba(242,240,234,.75)">
        <rect x={285} y={60} width={92} height={42} rx={6} fill="#09090b" stroke="rgba(242,240,234,.2)" />
        <text x={295} y={78}>early blight</text>
        <text x={295} y={93} fill={c}>
          96.4%
        </text>
      </g>
    </g>
  );
}

function Medal({ c }: { c: string }) {
  const bars = [
    { x: 125, h: 90, label: "2" },
    { x: 180, h: 130, label: "1" },
    { x: 235, h: 65, label: "3" },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width={40}
          rx={4}
          fill={i === 1 ? c : "rgba(242,240,234,.18)"}
          initial={{ y: 250, height: 0 }}
          animate={{ y: [250, 250 - b.h, 250 - b.h, 250], height: [0, b.h, b.h, 0] }}
          transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
        />
      ))}
      <motion.g animate={{ y: [0, -8, 0] }} transition={wave(3)}>
        <path d="M185 40 L200 75 L215 40" fill="none" stroke="rgba(242,240,234,.5)" strokeWidth={6} />
        <circle cx={200} cy={92} r={24} fill={c} />
        <circle cx={200} cy={92} r={16} fill="none" stroke="#09090b" strokeOpacity={0.4} strokeWidth={2} />
        <text x={200} y={98} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={15} fill="#09090b">
          1
        </text>
      </motion.g>
      <line x1={100} x2={300} y1={250} y2={250} stroke="rgba(242,240,234,.3)" />
    </g>
  );
}

function Pulse({ c }: { c: string }) {
  const d = "M20 170 H120 L140 170 L155 110 L175 230 L195 80 L215 200 L230 170 H380";
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(242,240,234,.12)" strokeWidth={2} />
      <motion.path
        d={d}
        fill="none"
        stroke={c}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={{ pathLength: [0, 0.35, 0.35], pathOffset: [0, 0.3, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        style={{ filter: `drop-shadow(0 0 6px ${c})` }}
      />
      <g fontFamily="monospace" fontSize={11} fill="rgba(242,240,234,.7)">
        <text x={30} y={60}>glucose</text>
        <text x={30} y={78} fill={c}>
          risk: low
        </text>
        <text x={290} y={60}>bmi 23.1</text>
        <text x={290} y={78}>age 34</text>
      </g>
    </g>
  );
}
