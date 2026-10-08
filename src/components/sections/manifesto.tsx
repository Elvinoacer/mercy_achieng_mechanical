"use client";

/**
 * Manifesto — scroll-scrubbed word-by-word illumination of the
 * engineering philosophy, flanked by technical annotations.
 * KineticBand — full-bleed tilted outlined-text marquee.
 */

import { motion } from "framer-motion";
import { marqueeItems } from "@/data/profile";
import { WordScrub } from "@/components/motion/kinetic";
import { Reveal, easeOutExpo } from "@/components/motion/primitives";

const STATEMENT =
  "Every machine begins as a calculation. I turn those numbers into systems that can actually be built, operated and maintained — where performance, safety, materials, cost and reliability are weighed together, not traded off blindly.";

const HIGHLIGHTS = ["calculation", "numbers", "systems", "built", "operated", "maintained", "reliability"];

const ANNOTATIONS = ["FUNCTION", "LOADS", "MATERIALS", "MANUFACTURE", "RELIABILITY"];

export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-28 md:py-40" aria-label="Engineering manifesto">
      {/* faint oversized watermark */}
      <span
        className="text-outline-faint font-display pointer-events-none absolute -top-6 right-0 select-none text-[22vw] font-extrabold leading-none opacity-60"
        aria-hidden="true"
      >
        01
      </span>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <Reveal className="mb-10 flex items-center gap-3 md:mb-14" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}>
          <span className="label-tech font-semibold text-eng-amber">01</span>
          <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
          <span className="label-tech">MANIFESTO — HOW I ENGINEER</span>
        </Reveal>

        <WordScrub
          text={STATEMENT}
          highlight={HIGHLIGHTS}
          className="display-2 max-w-6xl font-bold text-foreground"
        />

        {/* technical annotations row */}
        <Reveal className="mt-14 md:mt-20" delay={2}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
            {ANNOTATIONS.map((a, i) => (
              <motion.span
                key={a}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.07 }}
              >
                <span className="h-1 w-1 rotate-45 bg-eng-amber" aria-hidden="true" />
                <span className="label-tech text-[10px]">{a}</span>
              </motion.span>
            ))}
            <span className="label-tech ml-auto hidden text-[10px] text-muted-foreground/60 md:block">
              REF: DESIGN PHILOSOPHY — M. ACHIENG
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Full-bleed tilted outlined marquee band ─────────── */

export function KineticBand() {
  const phrase = "DESIGN FOR MANUFACTURE — BUILD FOR RELIABILITY — IMPROVE THROUGH TESTING — ";
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-6 md:py-8" aria-hidden="true">
      <div className="rotate-[-1.2deg] scale-[1.02]">
        <div className="animate-marquee-slow flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              <span className="font-display text-[7vw] font-extrabold leading-none tracking-tight md:text-[4.5vw]">
                <span className="text-outline">{phrase}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* secondary technical ticker */}
      <div className="mt-4 border-t border-border/60 pt-3 md:mt-5">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {marqueeItems.map((item, i) => (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span className="label-tech text-[10px]">{item}</span>
                  <span
                    className={("mx-6 h-1 w-1 rotate-45 " + (i % 3 === 0 ? "bg-eng-amber" : "bg-foreground/25"))}
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
