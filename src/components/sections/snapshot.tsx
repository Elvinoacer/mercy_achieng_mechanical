"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { snapshot, aboutParagraphs } from "@/data/profile";
import { improvementCycle, diagnosticProcess } from "@/data/experience";
import { Reveal, SectionHeader, easeOutExpo } from "@/components/motion/primitives";
import { TitleBlock, ProcessFlow, GearTrain } from "@/components/technical/illustrations";
import { Badge } from "@/components/ui/badge";

export function Snapshot() {
  return (
    <section id="snapshot" className="relative py-20 md:py-28 border-t border-border" aria-label="Candidate snapshot">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          kicker="Candidate Snapshot"
          title={<>The specification sheet.</>}
          description="Key facts about Mercy's engineering profile — presented the way an engineer reads a data sheet."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Data table */}
          <Reveal className="lg:col-span-7" variants="slideInLeft">
            <div className="border border-border bg-surface overflow-hidden">
              <div className="grid grid-cols-[130px_1fr] text-sm">
                {snapshot.map((row, i) => (
                  <motion.div
                    key={row.item}
                    className="contents"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.05 }}
                  >
                    <div className="px-4 py-3.5 border-b border-r border-border bg-surface-2/60 font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center">
                      {row.item}
                    </div>
                    <div className="px-4 py-3.5 border-b border-border flex items-center gap-2.5 flex-wrap">
                      <span className="font-medium">{row.value}</span>
                      {row.tag && (
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-wider border-eng-amber/50 text-eng-amber">
                          {row.tag}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 py-3 bg-surface-2/60 flex justify-between items-center">
                <span className="label-tech text-[9px]">STATUS: GRADUATE — OPEN TO OPPORTUNITIES</span>
                <span className="label-tech text-[9px] text-eng-blue">FORM MA-01</span>
              </div>
            </div>
          </Reveal>

          {/* Title block + gear train */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal variants="slideInRight">
              <TitleBlock
                title="Mercy Achieng"
                subtitle="Graduate Mechanical & Production Engineer"
                partNo="MA-ENG-2026"
                rev="1.0"
                scale="1:1"
                sheet="1 / 1"
              />
            </Reveal>
            <Reveal variants="slideInRight" delay={1}>
              <div className="border border-border bg-surface p-6">
                <p className="label-tech mb-4 text-eng-blue">Machine Elements — Working Principle</p>
                <GearTrain className="w-full h-auto text-muted-foreground" />
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  Positive mechanical transmission — the design vocabulary behind shafts,
                  gears and bearings used across Mercy&apos;s machine-design work.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 border-t border-border bg-surface/50" aria-label="About Mercy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <SectionHeader
              index="13"
              kicker="About"
              title={<>Engineering, from first principles to the shop floor.</>}
            />
            <div className="space-y-5">
              {aboutParagraphs.map((p, i) => (
                <Reveal key={i} delay={i} as="p" className="text-[15px] md:text-base leading-relaxed text-muted-foreground">
                  {p}
                </Reveal>
              ))}
            </div>

            {/* Frameworks */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Reveal variants="fadeUp">
                <p className="label-tech mb-4 text-eng-blue">Quality &amp; Improvement Loop</p>
                <ProcessFlow steps={improvementCycle} />
              </Reveal>
              <Reveal variants="fadeUp" delay={1}>
                <p className="label-tech mb-4 text-eng-blue">Structured Machine Diagnosis</p>
                <ProcessFlow steps={diagnosticProcess.slice(0, 6)} />
              </Reveal>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5 relative">
            <Reveal variants="slideInRight" className="relative">
              <div className="relative border border-border bg-surface p-2.5 sticky top-24">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Image
                    src="/images/welding-sparks.jpg"
                    alt="Welder working with sparks — fabrication context imagery"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" aria-hidden="true" />
                  <p className="absolute bottom-3 left-3 right-3 label-tech text-[9px] leading-relaxed">
                    FIG 01 — WHERE CALCULATIONS MEET THE WORKSHOP FLOOR · CONTEXT IMAGERY
                  </p>
                </div>
                <div className="flex justify-between pt-2 px-1">
                  <span className="label-tech text-[9px]">DOC — ABOUT</span>
                  <span className="label-tech text-[9px] text-eng-amber">EVIDENCE PENDING</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
