"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, timeline } from "@/data/experience";
import { currentlyLearning, philosophyLines, philosophyExpanded, profile } from "@/data/profile";
import { Reveal, SectionHeader, TextLines, easeOutExpo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Mail, Linkedin, Download, MapPin } from "lucide-react";

/* ══════════════ EDUCATION ══════════════ */

export function Education() {
  return (
    <section id="education" className="relative py-20 md:py-28 border-t border-border" aria-label="Education">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="08"
          kicker="Academic Foundation"
          title={<>A degree built like a machine — element by element.</>}
          description="Five years of mechanical and production engineering at Moi University's School of Engineering, Eldoret."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* degree card */}
          <Reveal className="lg:col-span-4" variants="slideInLeft">
            <div className="border border-border bg-surface p-6 md:p-8 lg:sticky lg:top-24">
              <span className="flex h-11 w-11 items-center justify-center border border-eng-blue/50 bg-eng-blue/10 text-eng-blue mb-6">
                <GraduationCap className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <p className="label-tech text-eng-blue mb-2">DEGREE</p>
              <h3 className="text-lg font-semibold tracking-tight leading-snug">{education.degree}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{education.institution}</p>
              <p className="text-sm text-muted-foreground">{education.school} · {education.location}</p>
              <dl className="mt-6 space-y-3 border-t border-border pt-5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="label-tech">PERIOD</dt>
                  <dd className="font-mono">{education.period} *</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="label-tech">CLASSIFICATION</dt>
                  <dd className="font-mono text-muted-foreground">{education.classification}</dd>
                </div>
              </dl>
              <figure className="mt-6 border border-border p-2 bg-surface-2/40">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <Image
                    src="/images/cad-workstation.jpg"
                    alt="CAD workstation — engineering coursework context imagery"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-1 pt-2 label-tech text-[9px]">FIG 09 — CAD COURSEWORK · CONTEXT</figcaption>
              </figure>
            </div>
          </Reveal>

          {/* coursework */}
          <div className="lg:col-span-8">
            <Reveal className="mb-5 flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-eng-blue" aria-hidden="true" />
              <p className="label-tech">COURSEWORK MAP — {education.coursework.reduce((n, c) => n + c.modules.length, 0)} MODULES</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {education.coursework.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  className={cn(
                    "border border-border bg-surface p-5 hover:border-eng-blue/50 transition-colors",
                    i === 0 && "sm:col-span-2 bg-gradient-to-br from-surface to-eng-blue/[0.04]"
                  )}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: easeOutExpo, delay: (i % 2) * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <p className="text-sm font-semibold tracking-tight">{cat.category}</p>
                    <span className="font-mono text-[10px] text-eng-blue">{String(cat.modules.length).padStart(2, "0")}</span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {cat.modules.map((m) => (
                      <li
                        key={m}
                        className="font-mono text-[10px] uppercase tracking-wider border border-border bg-surface-2/50 px-2 py-1 text-muted-foreground"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 label-tech text-[9px]">* DEMONSTRATION DATES — TO BE VERIFIED</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ TIMELINE ══════════════ */

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative overflow-x-clip py-20 md:py-28 border-t border-border bg-surface/50" aria-label="Engineering timeline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="10"
          kicker="Engineering Timeline"
          title={<>Five years, one continuous build-up.</>}
          description="From engineering foundations to final-year project and graduation — the complete training sequence."
        />

        <div ref={ref} className="relative">
          {/* rail */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" aria-hidden="true" />
          {!reduce && (
            <motion.div
              className="absolute left-[27px] md:left-1/2 top-0 w-px bg-eng-blue md:-translate-x-1/2 origin-top"
              style={{ height: lineH }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-10 md:space-y-0">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  className={cn(
                    "relative md:w-1/2 md:py-6 pl-16 md:pl-0",
                    left ? "md:pr-14" : "md:ml-auto md:pl-14"
                  )}
                  initial={{ opacity: 0, y: 30, x: reduce ? 0 : left ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  {/* node */}
                  <span
                    className={cn(
                      "absolute top-1 md:top-7 flex items-center justify-center w-[55px] h-[55px] border border-eng-blue/50 bg-background",
                      "left-0 md:left-auto",
                      left ? "md:-right-[27.5px]" : "md:-left-[27.5px]"
                    )}
                    aria-hidden="true"
                  >
                    <span className="font-mono text-[10px] font-semibold text-eng-blue">{item.code}</span>
                  </span>

                  <div className="border border-border bg-surface p-5 md:p-6 hover:border-eng-blue/50 transition-colors">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <p className="font-mono text-2xl font-semibold tracking-tight text-eng-blue">{item.year}</p>
                      <p className="label-tech">{item.code === "IA" ? "ATTACHMENT" : `YEAR ${item.code.replace("Y", "")}`}</p>
                    </div>
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ CURRENTLY LEARNING ══════════════ */

export function Learning() {
  return (
    <section id="learning" className="relative py-20 md:py-28 border-t border-border" aria-label="Currently learning">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="11"
          kicker="Currently Learning"
          title={<>The next capabilities on the bench.</>}
          description="Active self-development areas — each with a concrete goal, tracked as work-in-progress."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyLearning.map((item, i) => (
            <motion.div
              key={item.topic}
              className="border border-border bg-surface p-5 group hover:border-eng-blue/50 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: (i % 4) * 0.07 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-widest px-2 py-1 border",
                    item.status === "In progress"
                      ? "border-eng-blue/50 text-eng-blue bg-eng-blue/[0.06]"
                      : item.status === "Started"
                        ? "border-eng-amber/50 text-eng-amber bg-eng-amber/[0.06]"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold tracking-tight leading-snug">{item.topic}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.goal}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ PHILOSOPHY ══════════════ */

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-24 md:py-36 border-t border-border overflow-hidden bg-surface/50" aria-label="Engineering philosophy">
      {/* backdrop image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/plant-dusk.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.07] dark:opacity-[0.12] grayscale"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal className="flex items-center justify-center gap-3 mb-10" variants="fadeIn">
          <span className="label-tech text-eng-blue font-semibold">12</span>
          <span className="h-px w-10 bg-eng-blue/50" aria-hidden="true" />
          <span className="label-tech">Engineering Philosophy</span>
        </Reveal>

        <TextLines
          lines={philosophyLines.slice(0, 2)}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.12]"
          lineClassName=""
        />
        <TextLines
          lines={philosophyLines.slice(2)}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.12] mt-2 text-eng-blue"
          lineClassName=""
        />

        <Reveal delay={3} className="mt-12 max-w-2xl mx-auto">
          <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
            {philosophyExpanded}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════ CONTACT ══════════════ */

export function Contact({ onCV }: { onCV: () => void }) {
  return (
    <section id="contact" className="relative py-20 md:py-28 border-t border-border bg-blueprint" aria-label="Contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3 mb-5" variants="fadeIn">
              <span className="label-tech text-eng-blue font-semibold">14</span>
              <span className="h-px w-10 bg-eng-blue/50" aria-hidden="true" />
              <span className="label-tech">Contact / Hire Mercy</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
                Interested in building better machines and better processes?
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed text-[15px] md:text-base">
                {profile.availability} Let&apos;s talk about how a graduate engineer with
                design-to-production thinking can contribute to your team.
              </p>
            </Reveal>

            <Reveal delay={3} className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2.5 bg-eng-blue text-primary-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Mercy
              </a>
              <button
                onClick={onCV}
                className="inline-flex items-center gap-2.5 border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:border-eng-blue/60 hover:text-eng-blue transition-colors"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </button>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:border-eng-blue/60 hover:text-eng-blue transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </Reveal>

            <Reveal delay={4} className="mt-8 flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location} · CONTACT DETAILS ARE PLACEHOLDERS PENDING VERIFICATION
            </Reveal>
          </div>

          {/* quick facts card */}
          <Reveal className="lg:col-span-5" variants="slideInRight">
            <div className="border border-border bg-surface overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <p className="label-tech">QUICK FACTS — RECRUITERS</p>
                <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse-dot" aria-hidden="true" />
              </div>
              <dl className="divide-y divide-border text-sm">
                {[
                  ["Education", "B.Eng. Mechanical & Production Engineering"],
                  ["Institution", "Moi University, Eldoret"],
                  ["Graduation", "2026"],
                  ["Strongest evidence", "Final-year machine design project · CAD · attachment"],
                  ["Core tools", "SolidWorks · AutoCAD · MATLAB · Excel"],
                  ["Availability", "Immediate — graduate roles"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px,1fr] gap-3 px-6 py-3.5">
                    <dt className="label-tech pt-0.5">{k}</dt>
                    <dd className="font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
