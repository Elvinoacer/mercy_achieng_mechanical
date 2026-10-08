"use client";

import { Reveal } from "@/components/motion/primitives";
import { profile, navSections } from "@/data/profile";
import { Linkedin, Mail, Download } from "lucide-react";

export function Footer({ onCV }: { onCV: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print mt-auto border-t border-border bg-surface" role="contentinfo">
      {/* giant outline wordmark */}
      <div className="overflow-hidden border-b border-border" aria-hidden="true">
        <Reveal variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9 } } }}>
          <p className="text-outline font-display select-none whitespace-nowrap px-4 pt-10 text-center text-[8.2vw] font-extrabold leading-[0.85] tracking-tight sm:px-8">
            MERCY ACHIENG
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identity */}
          <Reveal className="md:col-span-5" variants="fadeIn">
            <div className="mb-4 flex items-baseline gap-2.5">
              <span className="font-display text-lg font-extrabold leading-none tracking-tight text-foreground">
                MA<span className="text-eng-amber">®</span>
              </span>
              <span className="label-tech text-[9px]">
                {profile.partNumber} · {profile.graduationYear}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.professionalTitle}. Graduate portfolio documenting machine design,
              manufacturing, thermofluids and production systems work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-eng-amber/60 hover:text-eng-amber"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-eng-amber/60 hover:text-eng-amber"
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
              </a>
              <button
                onClick={onCV}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-eng-amber/60 hover:text-eng-amber"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> CV
              </button>
            </div>
          </Reveal>

          {/* Section index */}
          <Reveal className="md:col-span-4" delay={1} variants="fadeIn">
            <p className="label-tech mb-4">Sheet Index</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navSections.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group inline-flex items-baseline gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[10px] text-eng-amber/70 group-hover:text-eng-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Title block mini */}
          <Reveal className="md:col-span-3" delay={2} variants="fadeIn">
            <p className="label-tech mb-4">Document Control</p>
            <dl className="space-y-2 divide-y divide-border border border-border font-mono text-xs">
              {[
                ["DWG NO.", profile.partNumber],
                ["REV", "PORTFOLIO 2.0 — OBSIDIAN"],
                ["SCALE", "FULL SIZE"],
                ["MATERIAL", "NEXT.JS 16 · LENIS · MOTION"],
                ["DATE", String(year)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-3 py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Verification notice — spec §2 policy */}
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="max-w-2xl font-mono text-[11px] leading-relaxed text-muted-foreground">
            DEMONSTRATION PORTFOLIO — Contact details, dates and project metrics marked
            [PLACEHOLDER] pending verification per publishing checklist. Some photographs are
            editorial context imagery pending replacement with verified project evidence.
          </p>
          <p className="shrink-0 font-mono text-[11px] text-muted-foreground">
            © {year} {profile.fullName} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
