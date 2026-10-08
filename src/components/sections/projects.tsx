"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal, SectionHeader, easeOutExpo } from "@/components/motion/primitives";
import { ExplodedAssembly } from "@/components/technical/illustrations";
import { cn } from "@/lib/utils";

/* ══════════════ FEATURED — flagship thresher ══════════════ */

export function FeaturedProject({ onOpen }: { onOpen: (slug: string) => void }) {
  const flagship = projects[0];
  const reduce = useReducedMotion();
  if (!flagship) return null;

  return (
    <section id="featured" className="relative py-20 md:py-28 border-t border-border overflow-hidden" aria-label="Featured project">
      {/* faint blueprint backdrop */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          kicker="Featured — Final-Year Project"
          title={<>From problem statement to working prototype.</>}
          description="The flagship project: a complete mechanical design exercise — requirements, calculations, CAD, fabrication and testing."
        />

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Visual — exploded assembly + photo */}
          <Reveal className="lg:col-span-6" variants="slideInLeft">
            <div className="relative border border-border bg-surface p-3 h-full">
              <div className="relative overflow-hidden aspect-[16/10] bg-surface-2">
                <Image
                  src={flagship.image}
                  alt="Multi-crop threshing machine — academic prototype context imagery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" aria-hidden="true" />
                {/* overlay label */}
                <div className="absolute top-3 left-3 flex items-center gap-2 border border-eng-amber/60 bg-background/80 backdrop-blur-sm px-2.5 py-1.5">
                  <span className="w-1.5 h-1.5 bg-eng-amber" aria-hidden="true" />
                  <span className="label-tech text-[9px] text-eng-amber">FINAL-YEAR PROJECT · {flagship.year}</span>
                </div>
                <p className="absolute bottom-3 left-3 right-3 label-tech text-[9px] leading-relaxed">
                  FIG 02 — THRESHING MACHINE REFERENCE · CONTEXT IMAGERY
                </p>
              </div>

              {/* exploded assembly panel */}
              <div className="mt-3 border border-border bg-surface-2/40 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="label-tech text-eng-blue">Exploded Assembly — Schematic</p>
                  <p className="label-tech text-[9px]">6 SUB-ASSEMBLIES</p>
                </div>
                <ExplodedAssembly className="w-full h-auto max-h-[340px] mx-auto text-foreground/80" />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal variants="slideInRight">
              <p className="label-tech text-eng-blue mb-3">{flagship.type} · {flagship.category}</p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-balance">
                {flagship.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
                {flagship.summary}
              </p>
            </Reveal>

            {/* meta grid */}
            <Reveal variants="slideInRight" delay={1} className="mt-7">
              <dl className="grid grid-cols-2 sm:grid-cols-4 border border-border divide-x divide-y sm:divide-y-0 divide-border bg-surface text-xs">
                {[
                  ["ROLE", flagship.role],
                  ["DURATION", flagship.duration],
                  ["TEAM", flagship.team],
                  ["YEAR", flagship.year],
                ].map(([k, v]) => (
                  <div key={k} className="px-3.5 py-3">
                    <dt className="label-tech text-[9px]">{k}</dt>
                    <dd className="mt-1.5 font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* pipeline */}
            <Reveal variants="slideInRight" delay={2} className="mt-7">
              <p className="label-tech mb-3">Design Pipeline</p>
              <div className="flex flex-wrap gap-2" role="img" aria-label="Design stages: requirements, calculations, CAD, fabrication, testing">
                {["Requirements", "Calculations", "CAD", "Fabrication", "Testing"].map((stage, i) => (
                  <motion.span
                    key={stage}
                    className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: easeOutExpo, delay: i * 0.08 }}
                  >
                    <span className="text-eng-blue font-semibold">{String(i + 1).padStart(2, "0")}</span>
                    {stage}
                    {i < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" aria-hidden="true" />}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal variants="slideInRight" delay={3} className="mt-auto pt-8">
              <button
                onClick={() => onOpen(flagship.slug)}
                className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-eng-blue hover:text-primary-foreground transition-colors"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Explore the Engineering Case Study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <p className="mt-3 label-tech text-[9px]">
                15 SECTIONS — PROBLEM → REQUIREMENTS → CALCULATIONS → … → IMPROVEMENTS
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ PROJECTS GRID ══════════════ */

export function ProjectsGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  const rest = projects.slice(1);
  return (
    <section id="projects" className="relative py-20 md:py-28 border-t border-border" aria-label="Selected engineering projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          kicker="Selected Engineering Work"
          title={<>Six documented projects. Six engineering problems.</>}
          description="Academic, laboratory and team projects spanning machine design, thermofluids, production and fluid systems — each documented as a full engineering case study."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.article
      className="group relative border border-border bg-surface overflow-hidden flex flex-col cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: easeOutExpo, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project.slug);
        }
      }}
      aria-label={`Open case study: ${project.title}`}
    >
      {/* image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-surface-2">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80" aria-hidden="true" />
        {/* index + type */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-foreground/90 border border-foreground/20 bg-background/60 backdrop-blur-sm px-2 py-1">
            PRJ — {project.number}
          </span>
          <span className="label-tech text-[9px] text-foreground/90 bg-background/60 backdrop-blur-sm border border-foreground/20 px-2 py-1 uppercase">
            {project.type}
          </span>
        </div>
        {/* hover annotation line */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          aria-hidden="true"
        >
          <span className="h-px w-6 bg-eng-blue" />
          <span className="label-tech text-[9px] text-eng-blue">OPEN CASE STUDY</span>
        </div>
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="label-tech text-[9px] text-eng-blue mb-2">{project.category} · {project.year}</p>
        <h3 className="text-lg font-semibold tracking-tight leading-snug text-balance">
          {project.shortTitle}
        </h3>
        <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "font-mono text-[9px] uppercase tracking-wider border border-border px-2 py-1 text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="label-tech text-[9px]">{project.caseSections.length} SECTIONS</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-eng-blue">
            Case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
