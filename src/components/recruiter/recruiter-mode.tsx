"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, Download, Mail, Linkedin, ArrowRight, CheckCircle2 } from "lucide-react";
import { profile, currentlyLearning, philosophyLines } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience, education } from "@/data/experience";
import { easeOutExpo } from "@/components/motion/primitives";
import { lockPageScroll, unlockPageScroll } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/utils";

/* ══════════════ RECRUITER MODE — spec §50 ══════════════ */

export function RecruiterMode({
  open,
  onClose,
  onOpenProject,
  onCV,
}: {
  open: boolean;
  onClose: () => void;
  onOpenProject: (slug: string) => void;
  onCV: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const flagship = projects[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] bg-background overflow-y-auto no-scrollbar" data-lenis-prevent
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter summary"
        >
          <div className="sticky top-0 z-[80] bg-background/90 backdrop-blur-md border-b border-eng-amber/40">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-eng-amber animate-pulse-dot" aria-hidden="true" />
                <p className="label-tech text-eng-amber">RECRUITER MODE — 60-SECOND SUMMARY</p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 border border-border px-3.5 py-2 text-xs font-medium hover:border-foreground/50 transition-colors"
                aria-label="Exit recruiter mode"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Exit</span>
                <kbd className="hidden md:inline font-mono text-[9px] text-muted-foreground border border-border px-1 py-0.5">ESC</kbd>
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16 pb-24">
            {/* header */}
            <div className="grid md:grid-cols-[auto,1fr] gap-8 items-end pb-10 border-b border-border">
              <motion.div
                className="relative w-32 h-40 md:w-36 md:h-48 border border-border bg-surface p-1.5"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: easeOutExpo }}
              >
                <div className="relative overflow-hidden w-full h-full">
                  <Image src="/images/portrait-mercy.jpg" alt={`Portrait of ${profile.fullName}`} fill sizes="144px" className="object-cover" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6, ease: easeOutExpo }}
              >
                <p className="label-tech text-eng-blue mb-2">CANDIDATE FILE — {profile.partNumber}</p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{profile.fullName}</h1>
                <p className="mt-2 text-muted-foreground">{profile.professionalTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {education.institution} · Graduation {profile.graduationYear}
                </p>
              </motion.div>
            </div>

            {/* core focus + evidence */}
            <div className="grid md:grid-cols-2 gap-8 py-10 border-b border-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.6 }}
              >
                <p className="label-tech text-eng-amber mb-4">CORE FOCUS</p>
                <p className="text-xl font-semibold tracking-tight leading-snug">
                  Mechanical Design · Manufacturing · Production Systems
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {profile.availability}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Graduate Mechanical Engineer", "Graduate Production Engineer", "Manufacturing Engineer", "Maintenance Engineer", "CAD / Design Engineer", "Quality Engineer"].map((role) => (
                    <span key={role} className="font-mono text-[10px] uppercase tracking-wider border border-border px-2.5 py-1.5 text-muted-foreground">
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.6 }}
              >
                <p className="label-tech text-eng-amber mb-4">STRONGEST EVIDENCE</p>
                <ul className="space-y-2.5">
                  {[
                    "Final-year machine design project (design → build → test)",
                    "Documented CAD assemblies and drawing packages",
                    "12-week supervised industrial attachment",
                    "Production improvement study with measured cycle times",
                    "Thermofluids / mechanical laboratory work",
                  ].map((e) => (
                    <li key={e} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-eng-blue shrink-0" aria-hidden="true" />
                      {e}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* tools + attachment */}
            <div className="grid md:grid-cols-2 gap-8 py-10 border-b border-border">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52, duration: 0.6 }}>
                <p className="label-tech text-eng-amber mb-4">TOOLS</p>
                <div className="flex flex-wrap gap-2">
                  {["SolidWorks", "AutoCAD", "MATLAB", "Excel", "MS Project", "SolidWorks Simulation"].map((t) => (
                    <span key={t} className="border border-eng-blue/40 bg-eng-blue/[0.05] px-3 py-1.5 text-sm font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-5 label-tech text-eng-amber mb-3">PHILOSOPHY</p>
                <p className="font-mono text-xs leading-relaxed uppercase tracking-wide text-muted-foreground">
                  {philosophyLines.join(" ")}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
                <p className="label-tech text-eng-amber mb-4">INDUSTRIAL ATTACHMENT</p>
                <p className="text-sm font-medium">{experience.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{experience.period} · {experience.department}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {experience.lessons}
                </p>
                <p className="mt-5 label-tech text-eng-amber mb-3">DEVELOPING NOW</p>
                <div className="flex flex-wrap gap-2">
                  {currentlyLearning.slice(0, 5).map((c) => (
                    <span key={c.topic} className="font-mono text-[10px] uppercase tracking-wider border border-eng-amber/40 text-eng-amber px-2.5 py-1">
                      {c.topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* actions */}
            <motion.div
              className="pt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.6 }}
            >
              <button
                onClick={() => {
                  onClose();
                  onOpenProject(flagship.slug);
                }}
                className="group inline-flex items-center gap-2.5 bg-eng-blue text-primary-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View flagship project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <button
                onClick={onCV}
                className="inline-flex items-center gap-2.5 border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:border-eng-blue/60 hover:text-eng-blue transition-colors"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:border-eng-blue/60 hover:text-eng-blue transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Mercy
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:border-eng-blue/60 hover:text-eng-blue transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════ CV VIEW — print-optimized ══════════════ */

export function CVView({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] bg-surface-2/90 backdrop-blur-sm overflow-y-auto no-scrollbar" data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae — print view"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
            <div className="flex justify-between items-center mb-6 no-print">
              <p className="label-tech text-eng-blue">CV — PRINT-READY SUMMARY</p>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-eng-blue text-primary-foreground px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Print / Save PDF
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 text-xs font-medium hover:border-foreground/50 transition-colors"
                  aria-label="Close CV view"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Close
                </button>
              </div>
            </div>

            <motion.article
              className="print-zone bg-white text-[#151a1e] shadow-2xl border border-[#dce1e5]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            >
              {/* CV header */}
              <header className="border-b-2 border-[#2563eb] px-8 py-7 flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#151a1e]">{profile.fullName}</h1>
                  <p className="mt-1.5 text-[#2563eb] font-semibold text-sm">{profile.professionalTitle}</p>
                  <p className="mt-3 text-xs text-[#667078] leading-relaxed">
                    {profile.location} · {profile.email} · linkedin.com/in/mercy-achieng
                    <br />
                    <span className="text-[10px] italic">Contact placeholders — replace before distribution</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-[10px] tracking-widest text-[#667078]">REF</p>
                  <p className="font-mono text-sm font-semibold">{profile.partNumber}</p>
                </div>
              </header>

              <div className="px-8 py-6 space-y-7 text-[13px] leading-relaxed">
                {/* summary */}
                <section>
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                    Professional Summary
                  </h2>
                  <p className="text-[#333]">{profile.summary}</p>
                </section>

                {/* education */}
                <section>
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                    Education
                  </h2>
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-semibold">{education.degree}</p>
                      <p className="text-xs text-[#667078]">{education.institution} — {education.school}, {education.location}</p>
                    </div>
                    <p className="font-mono text-xs text-[#667078] shrink-0">{education.period} *</p>
                  </div>
                </section>

                {/* projects */}
                <section>
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                    Key Projects
                  </h2>
                  <ul className="space-y-3">
                    {projects.map((p) => (
                      <li key={p.slug}>
                        <div className="flex justify-between gap-4">
                          <p className="font-semibold">{p.shortTitle}</p>
                          <p className="font-mono text-[10px] text-[#667078] shrink-0">{p.type} · {p.year}</p>
                        </div>
                        <p className="text-xs text-[#667078] mt-0.5 leading-relaxed">{p.summary}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* experience */}
                <section>
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                    Industrial Attachment
                  </h2>
                  <div className="flex justify-between gap-4">
                    <p className="font-semibold">{experience.role}</p>
                    <p className="font-mono text-xs text-[#667078] shrink-0">{experience.period} *</p>
                  </div>
                  <p className="text-xs text-[#667078] mt-0.5">{experience.department} — supervised scope</p>
                  <ul className="mt-2 space-y-1 text-xs text-[#333]">
                    {experience.responsibilities.slice(0, 6).map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-[#2563eb]">▪</span> {r}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* skills */}
                <section className="grid grid-cols-2 gap-6">
                  <div>
                    <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                      Technical Skills
                    </h2>
                    <ul className="text-xs text-[#333] space-y-1">
                      <li>Machine design fundamentals — Strong</li>
                      <li>Thermodynamics &amp; fluid mechanics — Strong</li>
                      <li>2D/3D CAD &amp; drawing — Strong</li>
                      <li>Machining &amp; fabrication — Working knowledge</li>
                      <li>Preventive maintenance — Working knowledge</li>
                      <li>Quality control &amp; 5S — Working knowledge</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#2563eb] border-b border-[#dce1e5] pb-1.5 mb-3">
                      Software
                    </h2>
                    <ul className="text-xs text-[#333] space-y-1">
                      <li>SolidWorks — Strong</li>
                      <li>AutoCAD — Working knowledge</li>
                      <li>MATLAB — Working knowledge</li>
                      <li>Excel — Strong</li>
                      <li>SolidWorks Simulation — Working knowledge</li>
                    </ul>
                  </div>
                </section>

                <p className="text-[10px] text-[#667078] italic pt-2 border-t border-[#dce1e5]">
                  * Demonstration data pending verification. Full project evidence and metrics available
                  in the online portfolio.
                </p>
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
