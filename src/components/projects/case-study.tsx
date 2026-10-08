"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects, type CaseSection } from "@/data/projects";
import { easeOutExpo } from "@/components/motion/primitives";
import { lockPageScroll, unlockPageScroll } from "@/components/motion/smooth-scroll";
import { ProcessFlow } from "@/components/technical/illustrations";
import { cn } from "@/lib/utils";

export function CaseStudyOverlay({
  slug,
  onClose,
  onNavigate,
}: {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const project = slug ? getProject(slug) : null;

  // lock scroll + keyboard escape
  useEffect(() => {
    if (!project) return;
    lockPageScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] bg-background overflow-y-auto no-scrollbar" data-lenis-prevent
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          {/* sticky bar */}
          <div className="fixed top-0 inset-x-0 z-[80] bg-background/90 backdrop-blur-md border-b border-border no-print">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="label-tech text-[9px] text-eng-blue truncate">
                  {project.type.toUpperCase()} · {project.category.toUpperCase()} · {project.year}
                </p>
                <p className="font-semibold tracking-tight text-sm truncate">{project.shortTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 border border-border px-3.5 py-2 text-xs font-medium hover:border-foreground/50 transition-colors shrink-0"
                aria-label="Close case study"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Close</span>
                <kbd className="hidden md:inline font-mono text-[9px] text-muted-foreground border border-border px-1 py-0.5">ESC</kbd>
              </button>
            </div>
          </div>

          <div className="pt-16">
            {/* ── case header ── */}
            <header className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 md:pt-16 pb-10">
              <motion.p
                className="label-tech text-eng-blue mb-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                PROJECT {project.number} / {String(projects.length).padStart(2, "0")} — {project.type.toUpperCase()}
              </motion.p>
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-balance max-w-3xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.6, ease: easeOutExpo }}
              >
                {project.title}
              </motion.h1>
              <motion.div
                className="mt-8 grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-y md:divide-y-0 divide-border bg-surface text-xs"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: easeOutExpo }}
              >
                {[
                  ["ROLE", project.role],
                  ["DURATION", project.duration],
                  ["TEAM", project.team],
                  ["TOOLS", project.tools.join(" · ")],
                ].map(([k, v]) => (
                  <div key={k} className="px-4 py-3.5">
                    <p className="label-tech text-[9px]">{k}</p>
                    <p className="mt-1.5 font-medium leading-snug">{v}</p>
                  </div>
                ))}
              </motion.div>
            </header>

            {/* ── hero image ── */}
            <motion.div
              className="mx-auto max-w-5xl px-4 sm:px-6 pb-12"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: easeOutExpo }}
            >
              <div className="relative border border-border bg-surface p-2.5">
                <div className="relative overflow-hidden aspect-[21/9] bg-surface-2">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" aria-hidden="true" />
                  <p className="absolute bottom-3 left-3 label-tech text-[9px]">
                    CONTEXT IMAGERY — PROJECT EVIDENCE PENDING VERIFICATION
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── numbered case sections ── */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
              {project.caseSections.map((section, i) => (
                <CaseBlock key={section.id} section={section} index={i + 1} />
              ))}
            </div>

            {/* ── next project ── */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-24">
              <button
                onClick={() => {
                  const next = getProject(project.nextProject);
                  if (next) {
                    onNavigate(next.slug);
                    window.scrollTo({ top: 0 });
                  }
                }}
                className="group w-full border border-border bg-surface p-6 md:p-8 flex items-center justify-between gap-6 hover:border-eng-blue/60 transition-colors text-left"
              >
                <div>
                  <p className="label-tech text-eng-blue mb-2">Next Project</p>
                  <p className="text-xl md:text-2xl font-semibold tracking-tight text-balance">
                    {getProject(project.nextProject)?.shortTitle}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center h-12 w-12 shrink-0 border border-eng-blue/50 text-eng-blue group-hover:bg-eng-blue group-hover:text-primary-foreground transition-colors">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </button>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all projects
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────── */

function CaseBlock({ section, index }: { section: CaseSection; index: number }) {
  return (
    <motion.section
      className="border-t border-border py-12 md:py-16 grid md:grid-cols-12 gap-6 md:gap-10"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: easeOutExpo }}
    >
      {/* header column */}
      <div className="md:col-span-3">
        <div className="md:sticky md:top-24">
          <p className="font-mono text-[11px] tracking-widest text-eng-blue">
            {String(index).padStart(2, "0")}
          </p>
          <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight leading-tight text-balance">
            {section.title}
          </h2>
          <span className="block mt-4 h-px w-10 bg-eng-blue/60" aria-hidden="true" />
        </div>
      </div>

      {/* content column */}
      <div className="md:col-span-9 space-y-6">
        {section.body && (
          <p className="text-[15px] md:text-base leading-relaxed text-muted-foreground max-w-2xl">
            {section.body}
          </p>
        )}

        {section.bullets && (
          <ul className="space-y-2.5 max-w-2xl">
            {section.bullets.map((b, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-[14px] leading-relaxed"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: easeOutExpo }}
              >
                <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-eng-blue rotate-45" aria-hidden="true" />
                <span className="text-foreground/90">{b}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* formula card */}
        {section.formula && (
          <div className="border border-eng-blue/30 bg-eng-blue/[0.04] p-5 max-w-xl">
            <p className="label-tech text-eng-blue mb-3">{section.formula.caption}</p>
            <div className="font-mono text-sm leading-loose space-y-1">
              {section.formula.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="border-l-2 border-eng-blue/40 pl-4"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        )}

        {/* table */}
        {section.table && (
          <div className="overflow-x-auto no-scrollbar border border-border max-w-2xl">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-surface-2/70 border-b border-border">
                  {section.table.headers.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {section.table.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-surface-2/40 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={cn("px-4 py-3", j === 0 && "font-medium")}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* flow diagram */}
        {section.flow && (
          <div className="border border-border bg-surface p-5">
            <p className="label-tech mb-4">Process Sequence</p>
            <ProcessFlow steps={section.flow} horizontal />
          </div>
        )}

        {/* images */}
        {section.images && (
          <div className={cn("grid gap-4", section.images.length > 1 ? "sm:grid-cols-2" : "")}>
            {section.images.map((img, i) => (
              <figure key={i} className="border border-border bg-surface p-2">
                <div className="relative overflow-hidden aspect-[4/3] bg-surface-2">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-1 pt-2 label-tech text-[9px] leading-relaxed">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
