"use client";

/**
 * Preloader — cinematic entry sequence.
 * 000→100 counter with technical readouts, masked name reveal,
 * then a staggered vertical-panel curtain lift. Skipped instantly
 * for reduced motion.
 */

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const PANELS = 5;
const easeEngineer = [0.76, 0, 0.24, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => setExiting(true), 320);
      },
    });
    return () => controls.stop();
  }, [reduce]);

  const onExitComplete = () => {
    if (!exiting) return;
    document.documentElement.style.overflow = "";
    setGone(true);
    onDone();
  };

  if (gone || reduce) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background"
      aria-label="Loading portfolio"
      role="status"
    >
      {/* curtain panels */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {Array.from({ length: PANELS }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-surface"
            initial={{ scaleY: 1 }}
            animate={exiting ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.85, ease: easeEngineer, delay: i * 0.055 }}
            style={{ transformOrigin: "top" }}
            onAnimationComplete={i === PANELS - 1 ? onExitComplete : undefined}
          />
        ))}
      </div>

      {/* content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-between px-6 py-6 sm:px-10 sm:py-8"
        animate={exiting ? { opacity: 0, y: -24 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        {/* top strip */}
        <div className="flex items-center justify-between">
          <motion.span
            className="label-tech text-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            PORTFOLIO / {profile.partNumber}
          </motion.span>
          <motion.span
            className="label-tech text-[10px] text-eng-amber"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            MECHANICAL &amp; PRODUCTION ENGINEERING
          </motion.span>
        </div>

        {/* centre — masked name reveal */}
        <div className="flex flex-col items-center gap-5" aria-hidden="true">
          <div className="overflow-hidden">
            <motion.h1
              className="display-3 text-foreground"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {profile.fullName.toUpperCase()}
            </motion.h1>
          </div>
          <motion.div
            className="h-px w-40 origin-left bg-eng-amber/70 sm:w-64"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: "linear", duration: 0.12 }}
          />
          <motion.p
            className="label-tech text-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            CALIBRATING SYSTEMS — PLEASE HOLD
          </motion.p>
        </div>

        {/* bottom strip — counter */}
        <div className="flex items-end justify-between">
          <motion.span
            className="label-tech hidden text-[10px] sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            NAIROBI, KENYA — EAT
          </motion.span>
          <span className="font-display text-6xl font-extrabold tabular-nums leading-none text-foreground sm:text-8xl">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
