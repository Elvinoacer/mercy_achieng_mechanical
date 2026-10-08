"use client";

/**
 * WorkReel — the signature showcase.
 * Desktop: section height maps 1:1 to a pinned horizontal track
 * that travels through 6 cinematic project posters, each with
 * inner image parallax, huge outline indices and a live counter.
 * Mobile / reduced-motion: elegant vertical stack with natural
 * parallax imagery.
 */

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { easeOutExpo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

/* ── Poster card ─────────────────────────────────────── */

function PosterCard({
  project,
  onOpen,
  progress,
}: {
  project: Project;
  onOpen: (slug: string) => void;
  progress?: MotionValue<number>;
}) {
  const i = Number(project.number);
  const total = projects.length;
  const fallback = useMotionValue(0);
  const source = progress ?? fallback;

  // horizontal inner parallax while the reel travels
  const imgX = useTransform(
    source,
    [Math.max(0, (i - 2) / total), Math.min(1, (i + 1) / total)],
    ["7%", "-7%"]
  );

  return (
    <motion.article
      className="group relative w-[86vw] shrink-0 snap-center sm:w-[70vw] lg:w-[52vw] xl:w-[46vw]"
      whileHover="hover"
    >
      {/* poster frame */}
      <button
        onClick={() => onOpen(project.slug)}
        data-cursor="VIEW"
        className="relative block w-full text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="corner-marks relative aspect-[4/3] overflow-hidden border border-border bg-surface-2 lg:aspect-[16/10] lg:h-[58vh] lg:w-auto">
          <motion.div
            className="absolute inset-[-8%]"
            style={progress ? { x: imgX } : undefined}
            variants={{ hover: { scale: 1.045 } }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 86vw, 52vw"
              className="object-cover"
            />
          </motion.div>

          {/* cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-eng-amber/0 mix-blend-overlay transition-colors duration-700 group-hover:bg-eng-amber/15" aria-hidden="true" />

          {/* huge outline index */}
          <span
            className="text-outline font-display pointer-events-none absolute -top-3 left-4 select-none text-[5.5rem] font-extrabold leading-none md:text-[7rem]"
            aria-hidden="true"
          >
            {project.number}
          </span>

          {/* top meta */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="border border-eng-amber/50 bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-eng-amber backdrop-blur-sm">
              {project.type}
            </span>
          </div>
          <p className="label-tech absolute right-4 top-12 text-[9px] text-foreground/70">
            {project.year}
          </p>

          {/* bottom copy */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <p className="label-tech mb-2 text-[9px] text-eng-amber">{project.category}</p>
            <h3 className="display-3 max-w-[90%] text-foreground transition-colors duration-300">
              {project.shortTitle}
            </h3>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="border border-foreground/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-eng-amber">
                Case Study
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* amber sweep line on hover */}
          <motion.span
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-eng-amber"
            variants={{ hover: { scaleX: 1 } }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* beneath-card summary strip */}
      <div className="mt-4 hidden max-w-2xl items-start gap-4 lg:flex">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{project.summary}</p>
      </div>
    </motion.article>
  );
}

/* ── Desktop: pinned horizontal reel ─────────────────── */

function ReelDesktop({ onOpen }: { onOpen: (slug: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 600); // after images settle
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(projects.length, Math.max(1, Math.round(v * (projects.length - 1)) + 1))).padStart(2, "0")
  );
  const barScale = scrollYProgress;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative"
      style={{ height: range > 0 ? `calc(100vh + ${range}px)` : "320vh" }}
      aria-label="Selected engineering projects"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* header row */}
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-8 pb-8 pt-24">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="label-tech font-semibold text-eng-amber">02</span>
              <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
              <span className="label-tech">SELECTED WORK</span>
            </div>
            <h2 className="display-2 text-foreground">
              Six problems. <span className="text-outline">Six machines.</span>
            </h2>
          </div>
          <div className="hidden items-center gap-3 xl:flex">
            <span className="label-tech text-[10px]">DRAG THE SCROLL — THE REEL MOVES SIDEWAYS</span>
            <ArrowRight className="h-4 w-4 text-eng-amber" aria-hidden="true" />
          </div>
        </div>

        {/* horizontal track */}
        <motion.div
          ref={trackRef}
          className="flex w-max items-stretch gap-[6vw] px-8 will-change-transform"
          style={{ x }}
        >
          {/* intro card */}
          <div className="flex w-[30vw] shrink-0 flex-col justify-center">
            <p className="label-tech mb-4 text-[10px]">2022 — 2026 ARCHIVE</p>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Documented engineering work — from a pedal-powered threshing machine to heat
              exchanger design and production systems. Every project opens as a full
              technical case study.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-16 bg-eng-amber" aria-hidden="true" />
              <span className="label-tech text-[10px] text-eng-amber">06 CASE STUDIES</span>
            </div>
          </div>

          {projects.map((p) => (
            <PosterCard key={p.slug} project={p} onOpen={onOpen} progress={scrollYProgress} />
          ))}

          {/* outro card */}
          <a
            href="#contact"
            className="group flex w-[34vw] shrink-0 flex-col items-start justify-center"
            data-cursor="END"
          >
            <span className="text-outline font-display select-none text-[6vw] font-extrabold leading-[0.95] transition-colors duration-500 group-hover:text-eng-amber">
              END OF
              <br />
              THE LINE
            </span>
            <span className="mt-6 inline-flex items-center gap-3 border border-eng-amber/50 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-eng-amber transition-all duration-300 group-hover:bg-eng-amber group-hover:text-background">
              Let&apos;s build something
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            </span>
          </a>
        </motion.div>

        {/* progress HUD */}
        <div className="mx-auto mt-10 flex w-full max-w-[1600px] items-center gap-5 px-8 pb-8">
          <span className="font-display text-2xl font-bold tabular-nums text-foreground">
            <motion.span className="text-eng-amber">{counter}</motion.span>
            <span className="text-muted-foreground/60"> / {String(projects.length).padStart(2, "0")}</span>
          </span>
          <div className="relative h-px flex-1 bg-border">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-eng-amber" style={{ scaleX: barScale }} />
          </div>
          <span className="label-tech hidden text-[9px] sm:block">SCROLL-DRIVEN REEL</span>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / reduced: vertical stack ────────────────── */

function ReelStack({ onOpen }: { onOpen: (slug: string) => void }) {
  const reduce = useReducedMotion();
  return (
    <section id="work" className="relative py-24 md:py-32" aria-label="Selected engineering projects">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="label-tech font-semibold text-eng-amber">02</span>
            <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
            <span className="label-tech">SELECTED WORK</span>
          </div>
          <h2 className="display-2 text-foreground">
            Six problems. <span className="text-outline">Six machines.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Documented engineering work — each project opens as a full technical case study:
            requirements, calculations, CAD, fabrication and testing.
          </p>
        </div>

        <div className={cn("flex flex-col gap-16", !reduce && "cv-auto")}>
          {projects.map((p, idx) => (
            <div key={p.slug}>
              <StackCard project={p} onOpen={onOpen} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: (slug: string) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const even = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className={cn("grid items-center gap-6 md:grid-cols-12", even ? "" : "md:[direction:rtl]")}
    >
      <div className="md:col-span-7 md:[direction:ltr]">
        <button
          onClick={() => onOpen(project.slug)}
          data-cursor="VIEW"
          className="corner-marks group relative block w-full overflow-hidden border border-border bg-surface-2 text-left"
          aria-label={`Open case study: ${project.title}`}
        >
          <div className="relative aspect-[16/10]">
            <motion.div className="absolute inset-[-10%]" style={{ y }}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden="true" />
            <span className="text-outline font-display pointer-events-none absolute -top-2 left-3 select-none text-6xl font-extrabold" aria-hidden="true">
              {project.number}
            </span>
          </div>
        </button>
      </div>
      <div className="md:col-span-5 md:[direction:ltr]">
        <p className="label-tech mb-2 text-[9px] text-eng-amber">
          {project.type} · {project.category}
        </p>
        <h3 className="display-3 text-foreground">{project.shortTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onOpen(project.slug)}
          className="group mt-5 inline-flex items-center gap-2.5 border-b border-eng-amber/60 pb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-eng-amber transition-colors hover:border-eng-amber"
        >
          Open case study
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

/* ── Export: chooses layout ──────────────────────────── */

export function WorkReel({ onOpen }: { onOpen: (slug: string) => void }) {
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  if (desktop === null || !desktop) return <ReelStack onOpen={onOpen} />;
  return <ReelDesktop onOpen={onOpen} />;
}
