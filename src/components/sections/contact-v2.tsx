"use client";

/**
 * ContactV2 — the closing statement. Giant outlined typography,
 * magnetic amber orbit button, live Nairobi clock, availability
 * marquee and a compact recruiter quick-facts strip.
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { CharReveal, Magnetic2 } from "@/components/motion/kinetic";
import { Reveal, easeOutExpo } from "@/components/motion/primitives";

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

const ORBIT_TEXT = "OPEN TO GRADUATE OPPORTUNITIES — DESIGN — MANUFACTURING — ";

export function ContactV2({ onCV }: { onCV: () => void }) {
  const nairobi = useNairobiTime();

  return (
    <section id="contact" className="bg-blueprint relative overflow-hidden border-t border-border" aria-label="Contact">
      {/* availability marquee */}
      <div className="overflow-hidden border-b border-border bg-eng-amber py-2.5" aria-hidden="true">
        <div className="animate-marquee-fast flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-background">
                  Available for graduate engineering roles
                  <span className="mx-5 h-1.5 w-1.5 rotate-45 bg-background" aria-hidden="true" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-24 sm:px-8 md:pt-32">
        {/* header */}
        <Reveal variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}>
          <div className="mb-8 flex items-center gap-3">
            <span className="label-tech font-semibold text-eng-amber">14</span>
            <span className="h-px w-10 bg-eng-amber/50" aria-hidden="true" />
            <span className="label-tech">CONTACT — HIRE MERCY</span>
            <span className="label-tech ml-auto hidden text-[10px] sm:block">
              NAIROBI {nairobi} EAT
            </span>
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* giant statement */}
          <div className="lg:col-span-8">
            <h2 className="display-1 select-none" aria-label="Let's build something that works">
              <span className="block text-foreground" aria-hidden="true">
                <CharReveal text="LET'S BUILD" stagger={0.04} />
              </span>
              <span className="block" aria-hidden="true">
                <CharReveal text="SOMETHING" charClassName="text-outline" stagger={0.04} delay={0.12} />
              </span>
              <span className="block text-foreground" aria-hidden="true">
                <CharReveal text="THAT WORKS" stagger={0.04} delay={0.24} />
                <span className="text-eng-amber">.</span>
              </span>
            </h2>

            <Reveal delay={2} className="mt-8 max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {profile.availability} If your team needs an engineer who thinks from
                function to fabrication, let&apos;s talk.
              </p>
            </Reveal>

            {/* actions */}
            <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="MAIL"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-eng-amber px-8 py-4 text-sm font-semibold text-background"
              >
                <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <Mail className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative">Email Mercy</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-eng-amber/70 hover:text-eng-amber"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <button
                onClick={onCV}
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-eng-amber/70 hover:text-eng-amber"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </button>
            </Reveal>

            <Reveal delay={4} className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location} — contact details are placeholders pending verification
            </Reveal>
          </div>

          {/* magnetic orbit button */}
          <div className="flex justify-center lg:col-span-4">
            <Magnetic2 strength={0.4}>
              <motion.a
                href={`mailto:${profile.email}`}
                data-cursor="GO"
                className="group relative flex h-44 w-44 items-center justify-center md:h-52 md:w-52"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
                aria-label="Get in touch by email"
              >
                {/* rotating orbit text */}
                <svg
                  viewBox="0 0 200 200"
                  className="animate-spin-slow absolute inset-0 h-full w-full text-muted-foreground/60"
                  aria-hidden="true"
                >
                  <defs>
                    <path id="orbit-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                  </defs>
                  <text fill="currentColor" fontSize="10.5" fontFamily="var(--font-geist-mono)" letterSpacing="3.2">
                    <textPath href="#orbit-circle">{ORBIT_TEXT}</textPath>
                  </text>
                </svg>

                {/* amber core */}
                <span className="flex h-32 w-32 items-center justify-center rounded-full bg-eng-amber transition-all duration-500 group-hover:scale-110 md:h-36 md:w-36">
                  <span className="flex flex-col items-center gap-1 text-background">
                    <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">Get in touch</span>
                  </span>
                </span>
              </motion.a>
            </Magnetic2>
          </div>
        </div>

        {/* recruiter quick-facts strip */}
        <Reveal delay={2} className="mt-16 md:mt-20">
          <dl className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Education", "B.Eng. Mechanical & Production Engineering"],
              ["Institution", "Moi University · Eldoret, Kenya"],
              ["Graduation", "2026 — graduate roles"],
              ["Strongest evidence", "Final-year machine design · CAD · 12-week attachment"],
              ["Core tools", "SolidWorks · AutoCAD · MATLAB · Excel"],
              ["Availability", "Immediate — Kenya, open to relocation"],
            ].map(([k, v], i) => (
              <motion.div
                key={k}
                className="group border-r border-b border-border px-5 py-4 transition-colors duration-300 hover:bg-surface"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.05 }}
              >
                <dt className="label-tech text-[9px]">{k}</dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug transition-colors duration-300 group-hover:text-eng-amber">
                  {v}
                </dd>
              </motion.div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
