"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience, focusAreas, workshop, laboratories } from "@/data/experience";
import { Reveal, SectionHeader, Stagger, StaggerItem, easeOutExpo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

/* ══════════════ INDUSTRIAL ATTACHMENT ══════════════ */

export function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 border-t border-border bg-surface/50" aria-label="Industrial attachment experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          kicker="Industrial Attachment"
          title={<>What the plant floor teaches that CAD cannot.</>}
          description="A 12-week supervised attachment across maintenance, production and engineering services — observing, assisting and documenting."
        />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* responsibilities */}
          <div className="lg:col-span-5">
            <Reveal variants="slideInLeft">
              <div className="border border-border bg-surface p-6 md:p-8">
                <p className="label-tech text-eng-blue mb-2">ROLE</p>
                <h3 className="text-xl font-semibold tracking-tight leading-snug">{experience.role}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{experience.org}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 text-xs border-t border-border pt-5">
                  <div>
                    <p className="label-tech text-[9px]">PERIOD</p>
                    <p className="mt-1 font-mono">{experience.period} *</p>
                  </div>
                  <div>
                    <p className="label-tech text-[9px]">DEPARTMENT</p>
                    <p className="mt-1 font-mono">{experience.department}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variants="slideInLeft" delay={1} className="mt-6">
              <div className="border border-border bg-surface p-6 md:p-8">
                <p className="label-tech mb-5">SUPERVISED RESPONSIBILITIES</p>
                <Stagger as="ul" className="space-y-3">
                  {experience.responsibilities.map((r) => (
                    <StaggerItem as="li" key={r} className="flex gap-3 text-[13.5px] leading-relaxed">
                      <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-eng-blue/70 rotate-45" aria-hidden="true" />
                      <span className="text-foreground/90">{r}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="mt-5 pt-4 border-t border-border label-tech text-[9px]">
                  * DEMONSTRATION DATES — TO BE VERIFIED
                </p>
              </div>
            </Reveal>
          </div>

          {/* imagery + equipment + lessons */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal variants="slideInRight">
              <div className="grid sm:grid-cols-2 gap-4">
                <figure className="border border-border bg-surface p-2">
                  <div className="relative overflow-hidden aspect-[4/3] bg-surface-2">
                    <Image
                      src="/images/factory-floor.jpg"
                      alt="Production floor — industrial context imagery"
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-1 pt-2 label-tech text-[9px]">FIG 03 — PRODUCTION ENVIRONMENT · CONTEXT IMAGERY</figcaption>
                </figure>
                <figure className="border border-border bg-surface p-2">
                  <div className="relative overflow-hidden aspect-[4/3] bg-surface-2">
                    <Image
                      src="/images/measurement-machine.jpg"
                      alt="Industrial measurement machine — precision engineering context imagery"
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-1 pt-2 label-tech text-[9px]">FIG 04 — INSPECTION &amp; METROLOGY · CONTEXT IMAGERY</figcaption>
                </figure>
              </div>
            </Reveal>

            <Reveal variants="slideInRight" delay={1}>
              <div className="border border-border bg-surface p-6 md:p-8">
                <p className="label-tech mb-5">EQUIPMENT EXPOSURE</p>
                <div className="flex flex-wrap gap-2">
                  {experience.equipmentExposure.map((eq, i) => (
                    <motion.span
                      key={eq}
                      className="font-mono text-[10px] uppercase tracking-wider border border-border bg-surface-2/60 px-3 py-1.5 hover:border-eng-blue/60 hover:text-eng-blue transition-colors cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.04 }}
                    >
                      {eq}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variants="slideInRight" delay={2}>
              <blockquote className="border-l-2 border-eng-amber bg-surface p-6 md:p-8">
                <p className="label-tech text-eng-amber mb-4">WHAT I TOOK FROM IT</p>
                <p className="text-[15px] md:text-base leading-relaxed italic text-foreground/90">
                  &ldquo;{experience.lessons}&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ CAPABILITY AREAS ══════════════ */

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-20 md:py-28 border-t border-border" aria-label="Engineering capability areas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          kicker="Mechanical Capability Areas"
          title={<>Five disciplines, one engineering mindset.</>}
          description="The areas where Mercy's training runs deepest — each backed by coursework, laboratory work and documented projects."
        />

        <Stagger className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {focusAreas.map((area, i) => (
            <StaggerItem
              key={area.id}
              className={cn(
                "group border border-border bg-surface p-6 md:p-7 flex flex-col hover:border-eng-blue/60 transition-colors",
                i === 0 && "xl:col-span-2 bg-gradient-to-br from-surface to-eng-blue/[0.05]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label-tech text-eng-blue text-[10px]">AREA {area.code}</p>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-tight">{area.title}</h3>
                </div>
                <span className="font-mono text-3xl md:text-4xl font-semibold text-eng-blue/15 group-hover:text-eng-blue/30 transition-colors select-none" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-[13.5px] text-muted-foreground leading-relaxed">{area.positioning}</p>
              <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-x-4 gap-y-1.5">
                {area.topics.map((topic) => (
                  <span key={topic} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {topic}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}

          {/* filler card — philosophy teaser */}
          <StaggerItem className="border border-eng-amber/40 bg-eng-amber/[0.04] p-6 md:p-7 flex flex-col justify-between">
            <div>
              <p className="label-tech text-eng-amber text-[10px]">APPROACH</p>
              <p className="mt-3 font-mono text-sm leading-relaxed uppercase tracking-wide">
                Understand the function.
                <br />
                Calculate the loads.
                <br />
                Design for manufacture.
              </p>
            </div>
            <a href="#philosophy" className="mt-6 label-tech text-eng-amber hover:underline underline-offset-4">
              READ THE FULL PHILOSOPHY →
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* ══════════════ WORKSHOP & LABORATORIES ══════════════ */

export function WorkshopLabs() {
  const workshopGroups = [
    { title: "Machine Shop", items: workshop.machineShop },
    { title: "Fabrication", items: workshop.fabrication },
    { title: "Fitting", items: workshop.fitting },
    { title: "Metrology", items: workshop.metrology },
  ];

  return (
    <section id="workshop" className="relative py-20 md:py-28 border-t border-border bg-surface/50" aria-label="Workshop and laboratory exposure">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="09"
          kicker="Workshop & Laboratory Exposure"
          title={<>Hands count. So do calibrated instruments.</>}
          description="Documented practical exposure across the machine shop, fabrication bay, fitting bench and measurement lab — plus five engineering laboratories."
        />

        {/* image strip */}
        <Reveal className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/lathe-turning.jpg", alt: "Turning operation on a lathe", caption: "FIG 05 — TURNING" },
              { src: "/images/cnc-milling.jpg", alt: "CNC milling machine in operation", caption: "FIG 06 — CNC MILLING" },
              { src: "/images/welder-detail.jpg", alt: "Welder at work in fabrication bay", caption: "FIG 07 — WELDING" },
              { src: "/images/caliper.jpg", alt: "Vernier caliper measuring a machined part", caption: "FIG 08 — METROLOGY" },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                className="border border-border bg-surface p-2"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.09 }}
              >
                <div className="relative overflow-hidden aspect-square bg-surface-2">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
                <figcaption className="px-1 pt-2 label-tech text-[9px]">{img.caption} · CONTEXT</figcaption>
              </motion.figure>
            ))}
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* workshop */}
          <Reveal variants="slideInLeft">
            <div className="border border-border bg-surface p-6 md:p-8 h-full">
              <p className="label-tech text-eng-blue mb-6">WORKSHOP PRACTICE</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {workshopGroups.map((g) => (
                  <div key={g.title}>
                    <p className="text-sm font-semibold mb-3 pb-2 border-b border-border">{g.title}</p>
                    <ul className="space-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                          <span className="w-1 h-1 bg-eng-blue/70 rotate-45 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* labs */}
          <Reveal variants="slideInRight">
            <div className="border border-border bg-surface p-6 md:p-8 h-full">
              <p className="label-tech text-eng-blue mb-6">ENGINEERING LABORATORIES</p>
              <div className="space-y-6">
                {laboratories.map((lab, i) => (
                  <motion.div
                    key={lab.name}
                    className="border-l-2 border-eng-blue/40 pl-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.07 }}
                  >
                    <p className="text-sm font-semibold">{lab.name}</p>
                    <p className="mt-1.5 font-mono text-[11px] text-muted-foreground leading-relaxed">
                      {lab.work.join(" · ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
