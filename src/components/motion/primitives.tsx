"use client";

/**
 * Motion primitives — reusable scroll-reveal, stagger,
 * parallax and counter components built on Framer Motion.
 * All respect `prefers-reduced-motion`.
 */

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Base variants ─────────────────────────────────── */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeEngineer = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo, delay: i * 0.08 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay: i * 0.08 },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeOutExpo, delay: i * 0.08 },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeOutExpo, delay: i * 0.08 },
  }),
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

/* ── Reveal wrapper ────────────────────────────────── */

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants | "fadeIn" | "fadeUp" | "slideInLeft" | "slideInRight";
  delay?: number;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span" | "p";
  once?: boolean;
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = 0.3,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const resolvedVariants =
    typeof variants === "string"
      ? { fadeIn, fadeUp, slideInLeft, slideInRight }[variants]
      : variants;
  return (
    <Comp
      className={className}
      variants={reduce ? fadeIn : resolvedVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

/* ── Stagger container ─────────────────────────────── */

export function Stagger({
  children,
  className,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "ul" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={staggerItem}>
      {children}
    </Comp>
  );
}

/* ── Parallax ──────────────────────────────────────── */

export function Parallax({
  children,
  className,
  offset = 60,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset * 0.5, -offset * 0.5]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ── Animated counter ──────────────────────────────── */

export function Counter({
  value,
  suffix = "",
  className,
  duration = 1.8,
  raw = false,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
  raw?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, duration]);

  const shown = reduce ? value : display;
  const formatted = raw ? String(shown) : shown.toLocaleString();

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ── Animated text lines (typographic reveals) ─────── */

export function TextLines({
  lines,
  className,
  lineClassName,
  once = true,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: i * 0.1 } },
          }}
        >
          <motion.div
            className={lineClassName}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "110%" },
              visible: reduce
                ? { opacity: 1, transition: { duration: 0.5 } }
                : { y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
            }}
          >
            {line}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Word-by-word heading reveal ───────────────────── */

export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: delay + i * 0.05 } },
          }}
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "105%" },
              visible: reduce
                ? { opacity: 1, transition: { duration: 0.5 } }
                : { y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

/* ── Section header with mono index ────────────────── */

export function SectionHeader({
  index,
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center flex flex-col items-center",
        className
      )}
    >
      <Reveal className="flex items-center gap-3 mb-4" variants={fadeIn}>
        <span className="label-tech font-semibold text-eng-amber">{index}</span>
        <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
        <span className="label-tech">{kicker}</span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="display-3 text-balance text-foreground">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2} className={cn("mt-4 max-w-2xl text-muted-foreground text-[15px] md:text-base leading-relaxed", align === "center" && "mx-auto")}>
          {description}
        </Reveal>
      )}
    </div>
  );
}

/* ── Magnetic hover wrapper (subtle) ───────────────── */

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{ transform }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTransform("translate(0px, 0px)")}
    >
      {children}
    </div>
  );
}

export type { MotionValue };
