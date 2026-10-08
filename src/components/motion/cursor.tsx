"use client";

/**
 * Cursor — bespoke pointer for fine-pointer devices.
 * Amber dot tracks 1:1; trailing ring uses springs; elements with
 * `data-cursor="LABEL"` morph the ring into a filled "view" badge;
 * links/buttons enlarge the ring. Fully hidden on touch / reduced motion.
 */

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role='button'], input, textarea, select, label, summary");
      setLabel(tagged?.dataset.cursor ?? null);
      setHovering(Boolean(tagged || interactive));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (typeof window === "undefined") return null;

  return (
    <div aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[120]">
      {/* trailing ring / label badge */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          animate={{
            width: label ? 88 : hovering ? 56 : 34,
            height: label ? 88 : hovering ? 56 : 34,
            scale: pressed ? 0.82 : 1,
            backgroundColor: label ? "rgba(255,92,31,1)" : "rgba(255,92,31,0)",
            borderColor: label ? "rgba(255,92,31,1)" : "rgba(236,231,221,0.5)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="select-none font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-background"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* precise dot */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x, y, opacity: visible && !label ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-eng-amber"
          animate={{ width: hovering ? 5 : 7, height: hovering ? 5 : 7 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
