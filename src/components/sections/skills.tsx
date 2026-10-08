"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { skillGroups, softwareGroups, proficiencyMeta } from "@/data/skills";
import type { Proficiency } from "@/data/profile";
import { Reveal, SectionHeader, easeOutExpo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";
import { Wrench, Calculator, FlaskConical, Factory, Gauge, ClipboardCheck, Boxes } from "lucide-react";

/* ── proficiency level indicator (not a % bar) ── */
function LevelIndicator({ proficiency }: { proficiency: Proficiency }) {
  const meta = proficiencyMeta[proficiency];
  return (
    <span className="inline-flex items-center gap-1" title={`${meta.label} — ${meta.note}`} aria-label={`${meta.label}: ${meta.note}`}>
      {[1, 2, 3, 4].map((lvl) => (
        <span
          key={lvl}
          className={cn(
            "w-[7px] h-[7px] rotate-45 border",
            lvl <= meta.level
              ? proficiency === "strong"
                ? "bg-eng-blue border-eng-blue"
                : proficiency === "working-knowledge"
                  ? "bg-eng-blue/70 border-eng-blue/70"
                  : proficiency === "academic-exposure"
                    ? "bg-eng-blue/40 border-eng-blue/40"
                    : "bg-eng-amber/60 border-eng-amber/60"
              : "border-border bg-transparent"
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

const groupIcons: Record<string, React.ReactNode> = {
  "mechanical-design": <Calculator className="h-4 w-4" aria-hidden="true" />,
  "cad-drawing": <Boxes className="h-4 w-4" aria-hidden="true" />,
  manufacturing: <Wrench className="h-4 w-4" aria-hidden="true" />,
  thermofluids: <FlaskConical className="h-4 w-4" aria-hidden="true" />,
  "production-engineering": <Factory className="h-4 w-4" aria-hidden="true" />,
  maintenance: <Gauge className="h-4 w-4" aria-hidden="true" />,
};

export function Skills() {
  const [openGroup, setOpenGroup] = useState<string | null>("mechanical-design");
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative py-20 md:py-28 border-t border-border" aria-label="Technical skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          kicker="Technical Skills"
          title={<>Honest proficiency levels, not percentage bars.</>}
          description="Skills are self-assessed against actual use in coursework, laboratories and documented projects — using four levels: Strong, Working Knowledge, Academic Exposure and Currently Learning."
        />

        {/* legend */}
        <Reveal className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border border-border bg-surface px-5 py-4">
          {(Object.keys(proficiencyMeta) as Proficiency[]).map((key) => (
            <span key={key} className="inline-flex items-center gap-2.5">
              <LevelIndicator proficiency={key} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {proficiencyMeta[key].label}
              </span>
            </span>
          ))}
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => {
            const open = openGroup === group.id;
            return (
              <motion.div
                key={group.id}
                className={cn(
                  "border bg-surface overflow-hidden",
                  open ? "border-eng-blue/50" : "border-border"
                )}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: (gi % 2) * 0.1 }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left hover:bg-surface-2/50 transition-colors"
                  onClick={() => setOpenGroup(open ? null : group.id)}
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-3.5">
                    <span className={cn(
                      "flex h-9 w-9 items-center justify-center border transition-colors",
                      open ? "border-eng-blue bg-eng-blue/10 text-eng-blue" : "border-border text-muted-foreground"
                    )}>
                      {groupIcons[group.id]}
                    </span>
                    <span>
                      <span className="block font-semibold tracking-tight text-[15px]">{group.title}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{group.description}</span>
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                    {group.skills.length} ITEMS
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <ul className="px-5 md:px-6 pb-5 divide-y divide-border/70">
                    {group.skills.map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        className="flex items-center justify-between gap-4 py-2.5"
                        initial={{ opacity: 0, x: -12 }}
                        animate={open ? { opacity: 1, x: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.35, delay: open ? i * 0.035 : 0 }}
                      >
                        <span className="text-[13.5px] text-foreground/90">{skill.name}</span>
                        <LevelIndicator proficiency={skill.proficiency} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ SOFTWARE ══════════════ */

export function Software() {
  return (
    <section id="software" className="relative py-20 md:py-28 border-t border-border bg-surface/50" aria-label="Engineering software">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="07"
          kicker="Engineering Software"
          title={<>Tools, judged by what they produced.</>}
          description="No logo walls — each tool listed with the actual work it did. Claims stay at the level the coursework and projects can support."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {softwareGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              className="border border-border bg-surface p-6 md:p-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: (gi % 2) * 0.1 }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="label-tech text-eng-blue">{group.title}</p>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="space-y-5">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5">
                    <div className="flex items-center gap-2.5 min-w-[150px]">
                      <span className="text-sm font-semibold">{tool.name}</span>
                    </div>
                    <p className="text-[12.5px] text-muted-foreground leading-relaxed self-center">
                      {tool.usage}
                    </p>
                    <div className="col-start-1 flex items-center gap-2">
                      <LevelIndicator proficiency={tool.proficiency} />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {proficiencyMeta[tool.proficiency].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
