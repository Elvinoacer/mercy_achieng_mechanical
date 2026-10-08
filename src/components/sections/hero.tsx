"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type TargetAndTransition,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, heroStats } from "@/data/profile";
import { Counter, easeOutExpo } from "@/components/motion/primitives";
import { CharReveal } from "@/components/motion/kinetic";
import { DotWave } from "@/components/motion/dot-wave";
import { Gear } from "@/components/technical/illustrations";

/* ── live Nairobi clock (EAT) ── */
function useNairobiTime() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Hero({ onCV, started }: { onCV: () => void; started: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const nairobi = useNairobiTime();

  /* scroll parallax — layered depth */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });
  const nameMX = useTransform(sx, [-1, 1], [10, -10]);
  const nameMY = useTransform(sy, [-1, 1], [6, -6]);
  const portraitMX = useTransform(sx, [-1, 1], [-14, 14]);
  const portraitMY = useTransform(sy, [-1, 1], [-9, 9]);
  const gearMX = useTransform(sx, [-1, 1], [16, -16]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const go = (target: TargetAndTransition) => (started ? target : undefined);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-blueprint relative flex min-h-screen flex-col overflow-hidden"
      onMouseMove={onMouseMove}
      aria-label="Introduction"
    >
      {/* dot-matrix wave field */}
      <DotWave className="opacity-90" />

      {/* rotating gear watermark */}
      <motion.div
        className="pointer-events-none absolute -right-48 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 text-eng-amber/[0.07] lg:block"
        style={{ x: gearMX }}
        aria-hidden="true"
      >
        <Gear teeth={20} className="animate-spin-slower h-full w-full" spin={false} strokeWidth={0.5} />
      </motion.div>

      {/* ── HUD frame labels ── */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block" aria-hidden="true">
        <span className="label-tech absolute left-6 top-24 text-[10px]">{profile.partNumber}</span>
        <span className="label-tech absolute right-6 top-24 text-[10px]">
          1.29°S / 36.82°E — NAIROBI {nairobi}
        </span>
        <span className="label-tech writing-vertical absolute bottom-40 left-6 text-[10px] tracking-[0.3em]">
          PORTFOLIO — 2026
        </span>
      </div>

      {/* ── main stage ── */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-36">
        {/* name block */}
        <motion.div
          className="relative z-10 lg:col-span-8"
          style={reduce ? undefined : { y: nameY }}
        >
          {/* availability pill */}
          <motion.div
            className="mb-7 inline-flex items-center gap-3 border border-eng-amber/40 bg-eng-amber/[0.06] px-4 py-2"
            initial={{ opacity: 0, y: 18 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
          >
            <span className="animate-pulse-dot h-1.5 w-1.5 bg-eng-amber" aria-hidden="true" />
            <span className="label-tech text-[10px] text-eng-amber">
              OPEN TO GRADUATE ENGINEERING OPPORTUNITIES
            </span>
          </motion.div>

          {/* the name — kinetic type */}
          <motion.h1
            className="display-1 select-none"
            style={reduce ? undefined : { x: nameMX, y: nameMY }}
            aria-label={`${profile.fullName} — ${profile.professionalTitle}`}
          >
            <span className="sr-only">
              {profile.fullName} — {profile.professionalTitle}
            </span>
            <span className="block text-foreground" aria-hidden="true">
              <CharReveal text="MERCY" started={started} delay={0.25} stagger={0.045} />
            </span>
            <span className="block" aria-hidden="true">
              <CharReveal
                text="ACHIENG"
                started={started}
                delay={0.5}
                stagger={0.045}
                charClassName="text-outline hover:text-foreground transition-colors duration-500"
              />
              <span className="text-outline-amber -ml-[0.08em] align-top text-[0.32em] font-bold">®</span>
            </span>
          </motion.h1>

          {/* role + summary */}
          <motion.div
            className="mt-8 max-w-xl"
            style={reduce ? undefined : { opacity: metaOpacity }}
          >
            <motion.p
              className="text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={go({ opacity: 1, y: 0 })}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.85 }}
            >
              Mechanical &amp; Production Engineer —{" "}
              <span className="text-eng-amber">designing</span>,{" "}
              <span className="text-eng-amber">manufacturing</span> &amp;{" "}
              <span className="text-eng-amber">maintaining</span> systems that work in the real world.
            </motion.p>
            <motion.p
              className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={go({ opacity: 1, y: 0 })}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 }}
            >
              From engineering calculations and CAD models to manufacturable, reliable products —
              machine design, thermofluids, production systems and everything in between.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={go({ opacity: 1, y: 0 })}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 1.15 }}
            >
              <a
                href="#work"
                data-cursor="SCROLL"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-eng-amber px-7 py-4 text-sm font-semibold text-background"
              >
                <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative">Explore the work</span>
                <ArrowUpRight
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </a>
              <button
                onClick={onCV}
                className="inline-flex items-center gap-3 border border-border px-7 py-4 text-sm font-medium text-foreground transition-colors duration-300 hover:border-eng-amber/70 hover:text-eng-amber"
              >
                Download CV
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* portrait — clip reveal + parallax */}
        <div className="relative z-0 flex justify-center lg:col-span-4 lg:justify-end">
          <motion.figure
            className="corner-marks relative w-64 sm:w-72 lg:w-[21rem] xl:w-[23rem]"
            style={reduce ? undefined : { y: portraitY, x: portraitMX }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={go({ clipPath: "inset(0% 0% 0% 0%)" })}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
          >
            <motion.div
              style={reduce ? undefined : { y: portraitMY }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/portrait-mercy.jpg"
                alt="Portrait of Mercy Achieng, graduate mechanical and production engineer"
                fill
                priority
                sizes="(max-width: 1024px) 288px, 368px"
                className="object-cover grayscale-[0.2] contrast-[1.05]"
              />
              {/* amber duotone wash on hover */}
              <div
                className="absolute inset-0 bg-eng-amber/10 mix-blend-overlay transition-opacity duration-500"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/90 to-transparent"
                aria-hidden="true"
              />
              <p className="label-tech absolute bottom-3 left-3 text-[9px] text-foreground/90">
                FIG. 00 — M. ACHIENG · B.ENG
              </p>
              <p className="label-tech absolute right-3 top-3 text-[9px] text-eng-amber">SCALE 1:1</p>
            </motion.div>
          </motion.figure>
        </div>
      </div>

      {/* ── stats band ── */}
      <motion.div className="relative z-20 border-t border-border/70">
        <motion.dl
          className="mx-auto grid max-w-[1600px] grid-cols-2 divide-x divide-border/70 md:grid-cols-4"
          initial={{ opacity: 0, y: 26 }}
          animate={go({ opacity: 1, y: 0 })}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 1.3 }}
        >
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="group px-5 py-5 transition-colors duration-300 hover:bg-surface sm:px-7"
              initial={{ opacity: 0, y: 18 }}
              animate={go({ opacity: 1, y: 0 })}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 1.35 + i * 0.09 }}
            >
              <dd className="font-display text-3xl font-bold tabular-nums leading-none text-foreground transition-colors duration-300 group-hover:text-eng-amber sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} raw={s.raw} />
              </dd>
              <dt className="label-tech mt-2 text-[9px]">{s.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#manifesto"
        className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-eng-amber md:flex"
        initial={{ opacity: 0 }}
        animate={go({ opacity: 1 })}
        transition={{ delay: 1.9, duration: 0.8 }}
        aria-label="Scroll to manifesto"
      >
        <span className="label-tech text-[9px]">SCROLL TO INSPECT</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
