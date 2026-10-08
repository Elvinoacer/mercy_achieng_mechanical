"use client";

/**
 * CapabilityRows — elite hover-list of the five engineering
 * disciplines. On desktop, hovering a row summons a floating
 * image preview that trails the cursor with spring physics;
 * the row's index column inverts to molten amber.
 */

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { focusAreas } from "@/data/experience";
import { Reveal, easeOutExpo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const PREVIEWS: Record<string, { src: string; alt: string }> = {
  A: { src: "/images/cad-workstation.jpg", alt: "CAD workstation with engineering drawings" },
  B: { src: "/images/cnc-milling.jpg", alt: "CNC milling machine in operation" },
  C: { src: "/images/pressure-gauges.jpg", alt: "Industrial pressure gauges on pipework" },
  D: { src: "/images/bearing.jpg", alt: "Precision rolling-element bearing" },
  E: { src: "/images/factory-floor.jpg", alt: "Industrial factory floor at dusk" },
};

export function CapabilityRows() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.5 });

  const activeIdx = focusAreas.findIndex((a) => a.id === active);
  const preview = active ? PREVIEWS[focusAreas[activeIdx]?.code] : undefined;

  const onRowMove = (e: React.MouseEvent) => {
    px.set(e.clientX + 28);
    py.set(e.clientY - 120);
  };

  return (
    <section id="capabilities" className="relative border-t border-border py-24 md:py-32" aria-label="Engineering capability areas">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <Reveal className="mb-12 md:mb-16" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}>
          <div className="mb-3 flex items-center gap-3">
            <span className="label-tech font-semibold text-eng-amber">05</span>
            <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
            <span className="label-tech">CAPABILITY AREAS</span>
          </div>
          <h2 className="display-2 text-foreground">
            Five disciplines. <span className="text-outline">One mindset.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            The areas where the training runs deepest — each backed by coursework, laboratory
            work and documented projects. Hover to inspect.
          </p>
        </Reveal>

        <ul className="border-t border-border" onMouseMove={onRowMove}>
          {focusAreas.map((area, i) => {
            const isActive = active === area.id;
            return (
              <motion.li
                key={area.id}
                className="row-line group relative border-b border-border"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.06 }}
                data-active={isActive}
                onMouseEnter={() => setActive(area.id)}
                onMouseLeave={() => setActive(null)}
              >
                <a
                  href="#skills"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 md:grid-cols-[5rem_1fr_auto_3rem] md:gap-8 md:py-9"
                  aria-label={`${area.title} — view skills detail`}
                >
                  {/* index */}
                  <span className="font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:text-eng-amber">
                    /{String(i + 1).padStart(2, "0")}
                  </span>

                  {/* title */}
                  <span className="display-3 block leading-none text-foreground/80 transition-all duration-500 group-hover:translate-x-3 group-hover:text-foreground">
                    {area.title}
                  </span>

                  {/* topics */}
                  <span className="hidden max-w-[26rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground/70 lg:block">
                    {area.topics.slice(0, 3).join(" · ")}
                  </span>

                  {/* arrow */}
                  <ArrowUpRight
                    className={cn(
                      "h-5 w-5 justify-self-end text-muted-foreground/40 transition-all duration-300",
                      "group-hover:rotate-45 group-hover:text-eng-amber"
                    )}
                    aria-hidden="true"
                  />
                </a>

                {/* positioning line — reveals on hover */}
                <AnimatePresence initial={false}>
                  {isActive && !reduce && (
                    <motion.p
                      className="pointer-events-none hidden max-w-xl pl-[calc(5rem+2.5rem)] text-[13px] leading-relaxed text-muted-foreground md:block"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                    >
                      {area.positioning}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* floating preview — trails the cursor (desktop) */}
      <AnimatePresence>
        {preview && !reduce && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[300px] lg:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.72, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.72, rotate: 4 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            aria-hidden="true"
          >
            <div className="corner-marks relative aspect-[4/3] overflow-hidden border border-eng-amber/40">
              <Image src={preview.src} alt="" fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-eng-amber/10 mix-blend-overlay" />
              <p className="label-tech absolute bottom-2 left-2 text-[8px] text-foreground">
                AREA {focusAreas[activeIdx]?.code} — REFERENCE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
