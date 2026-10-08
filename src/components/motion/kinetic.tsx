"use client";

/**
 * Kinetic primitives — elite-tier motion building blocks:
 *  - CharReveal: per-character masked type reveals
 *  - WordScrub:  scroll-driven word-by-word illumination
 *  - ParallaxImage: inner-image parallax inside a clipped frame
 *  - Magnetic2: spring-physics magnetic hover (no re-renders)
 * All respect `prefers-reduced-motion`.
 */

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/* ── Per-character masked reveal ─────────────────────── */

export function CharReveal({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.028,
  started,
  once = true,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  /** When provided, the reveal is controlled (preloader orchestration). */
  started?: boolean;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);
  const controlled = typeof started === "boolean";

  const wrapperProps = controlled
    ? { initial: "hidden", animate: started ? "visible" : "hidden" }
    : { initial: "hidden", whileInView: "visible", viewport: { once, amount: 0.4 } };

  return (
    <span className={cn("inline-block", className)} aria-label={text} role="text">
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em] align-bottom"
          aria-hidden="true"
          {...wrapperProps}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: delay + i * stagger } },
          }}
        >
          <motion.span
            className={cn("inline-block will-change-transform", charClassName)}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "112%", rotate: 4 },
              visible: reduce
                ? { opacity: 1, transition: { duration: 0.5 } }
                : { y: 0, rotate: 0, transition: { duration: 0.85, ease: easeOutExpo } },
            }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

/* ── Scroll-driven word scrub (illumination) ────────── */

export function WordScrub({
  text,
  className,
  highlight = [],
  highlightClassName = "text-eng-amber",
}: {
  text: string;
  className?: string;
  highlight?: string[];
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHi = highlight.some((h) => h.toLowerCase() === clean);
        return (
          <ScrubWord
            key={`${w}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]}
            className={isHi ? highlightClassName : undefined}
          >
            {w}
          </ScrubWord>
        );
      })}
    </p>
  );
}

function ScrubWord({
  progress,
  range,
  children,
  className,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("mr-[0.26em] inline-block", className)}>
      {children}
    </motion.span>
  );
}

/* ── Parallax image in clipped frame ────────────────── */

export function ParallaxImage({
  src,
  alt,
  className,
  sizes,
  speed = 0.14,
  priority = false,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  speed?: number;
  priority?: boolean;
  imgClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const room = Math.max(0.1, speed);
  const y = useTransform(scrollYProgress, [0, 1], [`${-room * 70}%`, `${room * 70}%`]);
  const over = Math.round(room * 160);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? undefined
            : {
                y,
                top: `-${over}%`,
                bottom: `-${over}%`,
                height: `calc(100% + ${over * 2}%)`,
              }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 60vw"}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}

/* ── Magnetic hover (spring physics, zero re-renders) ── */

export function Magnetic2({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * strength);
    my.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
