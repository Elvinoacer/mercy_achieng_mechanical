"use client";

/**
 * Technical SVG illustration set — the portfolio's signature
 * visual language: exploded assemblies, gear trains, dimension
 * frames, title blocks. All animated with Framer Motion.
 */

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/primitives";

/* ════════════════════════════════════════════════════
   GEAR — parametric involute-style gear (simplified)
   ════════════════════════════════════════════════════ */

function gearPath(teeth: number, outerR: number, innerR: number): string {
  const steps: string[] = [];
  const N = teeth * 4;
  for (let i = 0; i <= N; i++) {
    const angle = (i / N) * Math.PI * 2;
    const phase = i % 4;
    const r = phase === 0 || phase === 3 ? outerR : innerR;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    steps.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return steps.join(" ") + " Z";
}

export function Gear({
  teeth = 12,
  className,
  spin = true,
  duration = 24,
  color = "currentColor",
  fill = "none",
  strokeWidth = 1.5,
  hub = true,
}: {
  teeth?: number;
  className?: string;
  spin?: boolean;
  duration?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number;
  hub?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={spin && !reduce ? { duration, repeat: Infinity, ease: "linear" } : undefined}
      aria-hidden="true"
    >
      <path
        d={gearPath(teeth, 46, 38)}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {hub && <circle cx="50" cy="50" r="12" fill={fill} stroke={color} strokeWidth={strokeWidth} />}
      {hub && <circle cx="50" cy="50" r="4" fill={color} />}
      {teeth >= 10 && (
        <>
          <line x1="50" y1="26" x2="50" y2="38" stroke={color} strokeWidth={strokeWidth * 0.7} />
          <line x1="50" y1="62" x2="50" y2="74" stroke={color} strokeWidth={strokeWidth * 0.7} />
          <line x1="26" y1="50" x2="38" y2="50" stroke={color} strokeWidth={strokeWidth * 0.7} />
          <line x1="62" y1="50" x2="74" y2="50" stroke={color} strokeWidth={strokeWidth * 0.7} />
        </>
      )}
    </motion.svg>
  );
}

/* ════════════════════════════════════════════════════
   GEAR TRAIN — meshing pair, rotating opposite directions
   ════════════════════════════════════════════════════ */

export function GearTrain({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const common = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: easeOutExpo },
  } as const;
  return (
    <motion.svg viewBox="0 0 220 120" className={className} {...common} aria-hidden="true">
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ originX: "62px", originY: "60px" }}
      >
        <path
          d={gearPath(14, 54, 45)}
          transform="translate(12,10)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="62" cy="60" r="14" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="62" cy="60" r="4.5" fill="currentColor" />
      </motion.g>
      <motion.g
        animate={reduce ? undefined : { rotate: -360 }}
        transition={reduce ? undefined : { duration: 20 * (14 / 9), repeat: Infinity, ease: "linear" }}
        style={{ originX: "168px", originY: "60px" }}
      >
        <path
          d={gearPath(9, 36, 30)}
          transform="translate(132,24)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="168" cy="60" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="168" cy="60" r="3" fill="currentColor" />
      </motion.g>
      {/* centre distance dimension */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.55">
        <line x1="62" y1="104" x2="168" y2="104" />
        <line x1="62" y1="99" x2="62" y2="109" />
        <line x1="168" y1="99" x2="168" y2="109" />
      </g>
      <text x="115" y="117" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.7" fontFamily="var(--font-geist-mono)">
        a = 106
      </text>
    </motion.svg>
  );
}

/* ════════════════════════════════════════════════════
   EXPLODED ASSEMBLY — pedal thresher, animated stack-up
   Shows the machine "assembling" as you scroll into view
   ════════════════════════════════════════════════════ */

export function ExplodedAssembly({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const assemble = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: -90, y: -40 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 1, ease: easeOutExpo, delay },
  });

  const stroke = { stroke: "currentColor", strokeWidth: 1.4, fill: "none" } as const;

  return (
    <svg viewBox="0 0 320 340" className={className} aria-label="Exploded view of the pedal-assisted threshing machine" role="img">
      {/* alignment axis */}
      <line x1="160" y1="8" x2="160" y2="332" stroke="currentColor" strokeWidth="0.7" strokeDasharray="6 5" opacity="0.4" />

      {/* ——— guard (top) ——— */}
      <motion.g {...assemble(0.1)}>
        <path d="M78 40 L242 40 L242 24 L78 24 Z" {...stroke} />
        <path d="M78 40 Q160 58 242 40" {...stroke} />
        <text x="252" y="36" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">GUARD</text>
      </motion.g>

      {/* ——— threshing drum ——— */}
      <motion.g {...assemble(0.25)}>
        <rect x="96" y="72" width="128" height="46" rx="4" {...stroke} />
        <line x1="96" y1="95" x2="224" y2="95" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        {[112, 128, 144, 160, 176, 192, 208].map((x) => (
          <line key={x} x1={x} y1="72" x2={x} y2="118" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        ))}
        <text x="252" y="98" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">DRUM</text>
      </motion.g>

      {/* ——— bearings ——— */}
      <motion.g {...assemble(0.4)}>
        <g transform="translate(160,150)">
          <rect x="-104" y="-11" width="30" height="22" rx="2" {...stroke} />
          <rect x="74" y="-11" width="30" height="22" rx="2" {...stroke} />
          <circle cx="-89" cy="0" r="4" fill="currentColor" />
          <circle cx="89" cy="0" r="4" fill="currentColor" />
        </g>
        <text x="252" y="152" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">BRG ×2</text>
      </motion.g>

      {/* ——— main shaft ——— */}
      <motion.g {...assemble(0.55)}>
        <line x1="44" y1="200" x2="276" y2="200" {...stroke} strokeWidth={5} strokeLinecap="round" opacity="0.85" />
        <line x1="44" y1="200" x2="276" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
        <rect x="128" y="192" width="18" height="16" {...stroke} />
        <text x="252" y="204" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">SHAFT Ø25</text>
      </motion.g>

      {/* ——— chain drive ——— */}
      <motion.g {...assemble(0.7)}>
        <g transform="translate(160,246)">
          <circle cx="-70" cy="0" r="26" {...stroke} />
          <circle cx="-70" cy="0" r="7" {...stroke} />
          <circle cx="70" cy="0" r="17" {...stroke} />
          <circle cx="70" cy="0" r="5" {...stroke} />
          <path d="M-45.4 -16.7 L55.9 -12.2 M-45.4 16.7 L55.9 12.2" stroke="currentColor" strokeWidth="1.1" strokeDasharray="4 3" fill="none" />
        </g>
        <text x="252" y="248" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">CHAIN ⅜&quot;</text>
      </motion.g>

      {/* ——— pedal crank ——— */}
      <motion.g {...assemble(0.85)}>
        <g transform="translate(160,300)">
          <rect x="-110" y="-10" width="54" height="20" rx="3" {...stroke} />
          <rect x="56" y="-10" width="54" height="20" rx="3" {...stroke} />
          <circle cx="-83" cy="0" r="3.5" fill="currentColor" />
          <circle cx="83" cy="0" r="3.5" fill="currentColor" />
        </g>
        <text x="252" y="302" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.8">PEDAL</text>
      </motion.g>

      {/* overall dimension line */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        <line x1="24" y1="14" x2="24" y2="326" />
        <line x1="19" y1="14" x2="29" y2="14" />
        <line x1="19" y1="326" x2="29" y2="326" />
      </g>
      <text x="14" y="172" fontSize="9" fill="currentColor" fontFamily="var(--font-geist-mono)" opacity="0.7" transform="rotate(-90 14 172)">
        EXPLODED VIEW · SCALE 1:10
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   DIMENSION FRAME — technical border with callouts
   Wraps imagery like an engineering drawing sheet
   ════════════════════════════════════════════════════ */

export function DimensionFrame({
  children,
  width = 160,
  height = 100,
  label = "FIG",
  className,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0.4 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 1.4, ease: easeOutExpo },
  };
  return (
    <div className={cn("relative", className)}>
      {/* corner brackets */}
      <motion.svg
        className="absolute -top-2 -left-2 w-6 h-6 text-eng-blue pointer-events-none z-10"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <motion.path d="M1 23 V6 Q1 1 6 1 H23" fill="none" stroke="currentColor" strokeWidth="2" {...draw} />
      </motion.svg>
      <motion.svg
        className="absolute -top-2 -right-2 w-6 h-6 text-eng-blue pointer-events-none z-10"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <motion.path d="M23 23 V6 Q23 1 18 1 H1" fill="none" stroke="currentColor" strokeWidth="2" {...draw} />
      </motion.svg>
      <motion.svg
        className="absolute -bottom-2 -left-2 w-6 h-6 text-eng-blue pointer-events-none z-10"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <motion.path d="M1 1 V18 Q1 23 6 23 H23" fill="none" stroke="currentColor" strokeWidth="2" {...draw} />
      </motion.svg>
      <motion.svg
        className="absolute -bottom-2 -right-2 w-6 h-6 text-eng-blue pointer-events-none z-10"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <motion.path d="M23 1 V18 Q23 23 18 23 H1" fill="none" stroke="currentColor" strokeWidth="2" {...draw} />
      </motion.svg>
      {children}
      {/* dimension label */}
      <div className="absolute -bottom-7 left-0 label-tech text-eng-blue whitespace-nowrap">
        {label} · {width} × {height}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TITLE BLOCK — engineering drawing sheet header
   ════════════════════════════════════════════════════ */

export function TitleBlock({
  title,
  subtitle,
  partNo,
  rev,
  scale = "1:1",
  sheet = "1 of 1",
  className,
}: {
  title: string;
  subtitle?: string;
  partNo: string;
  rev: string;
  scale?: string;
  sheet?: string;
  className?: string;
}) {
  const rows = [
    ["DWG NO.", partNo],
    ["REV", rev],
    ["SCALE", scale],
    ["SHEET", sheet],
  ];
  return (
    <div className={cn("border border-border bg-surface", className)} aria-label="Drawing title block">
      <div className="border-b border-border px-4 py-3">
        <p className="label-tech mb-1">Title</p>
        <p className="font-semibold tracking-tight leading-tight">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k} className="border-r border-border last:border-r-0 px-3 py-2">
            <p className="label-tech text-[9px]">{k}</p>
            <p className="font-mono text-xs mt-0.5">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   PROCESS FLOW — animated vertical process diagram
   ════════════════════════════════════════════════════ */

export function ProcessFlow({
  steps,
  className,
  horizontal = false,
}: {
  steps: string[];
  className?: string;
  horizontal?: boolean;
}) {
  const reduce = useReducedMotion();
  if (horizontal) {
    return (
      <div className={cn("flex items-stretch gap-0 overflow-x-auto no-scrollbar", className)} role="img" aria-label={`Process flow: ${steps.join(", ")}`}>
        {steps.map((step, i) => (
          <div key={step} className="flex items-center shrink-0">
            <motion.div
              className="border border-border bg-surface px-4 py-3 font-mono text-[11px] tracking-wide uppercase whitespace-nowrap"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.07 }}
            >
              {step}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className="w-8 h-px bg-eng-blue shrink-0"
                initial={reduce ? { opacity: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.25 }}
                style={{ originX: 0 }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <ol className={cn("relative", className)} aria-label={`Process flow: ${steps.join(", ")}`}>
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
      {steps.map((step, i) => (
        <motion.li
          key={step}
          className="relative pl-8 pb-4 last:pb-0"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
        >
          <span className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-eng-blue bg-background" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wide">{String(i + 1).padStart(2, "0")} — {step}</p>
        </motion.li>
      ))}
    </ol>
  );
}

/* ════════════════════════════════════════════════════
   CALLOUT — floating technical annotation
   ════════════════════════════════════════════════════ */

export function Callout({
  label,
  value,
  className,
  side = "left",
}: {
  label: string;
  value: string;
  className?: string;
  side?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute z-20 flex items-center gap-2 pointer-events-none",
        side === "left" ? "flex-row" : "flex-row-reverse",
        className
      )}
      aria-hidden="true"
    >
      <span className={cn("h-px w-8 bg-eng-blue/70", side === "left" ? "" : "")} />
      <div className="border border-eng-blue/40 bg-background/85 backdrop-blur-sm px-2.5 py-1.5">
        <p className="label-tech text-[9px] text-eng-blue">{label}</p>
        <p className="font-mono text-[11px] leading-none mt-1">{value}</p>
      </div>
    </div>
  );
}
