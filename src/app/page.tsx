"use client";

import { useCallback, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Manifesto, KineticBand } from "@/components/sections/manifesto";
import { WorkReel } from "@/components/sections/work-reel";
import { Snapshot, About } from "@/components/sections/snapshot";
import { Experience, WorkshopLabs } from "@/components/sections/experience";
import { CapabilityRows } from "@/components/sections/capability-rows";
import { Skills, Software } from "@/components/sections/skills";
import { Education, Timeline, Learning, Philosophy } from "@/components/sections/education";
import { ContactV2 } from "@/components/sections/contact-v2";
import { CaseStudyOverlay } from "@/components/projects/case-study";
import { RecruiterMode, CVView } from "@/components/recruiter/recruiter-mode";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { Preloader } from "@/components/motion/preloader";

export default function PortfolioExperience() {
  const [caseSlug, setCaseSlug] = useState<string | null>(null);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openCase = useCallback((slug: string) => setCaseSlug(slug), []);
  const closeCase = useCallback(() => setCaseSlug(null), []);

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-background">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}

        {/* global chrome */}
        <Cursor />
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar onRecruiter={() => setRecruiterOpen(true)} />

        <main className="flex-1">
          <Hero onCV={() => setCvOpen(true)} started={loaded} />
          <Manifesto />
          <KineticBand />
          <WorkReel onOpen={openCase} />
          <Snapshot />
          <Experience />
          <CapabilityRows />
          <Skills />
          <Software />
          <Education />
          <WorkshopLabs />
          <Timeline />
          <Learning />
          <Philosophy />
          <About />
          <ContactV2 onCV={() => setCvOpen(true)} />
        </main>

        <Footer onCV={() => setCvOpen(true)} />

        {/* Overlays */}
        <CaseStudyOverlay slug={caseSlug} onClose={closeCase} onNavigate={openCase} />
        <RecruiterMode
          open={recruiterOpen}
          onClose={() => setRecruiterOpen(false)}
          onOpenProject={openCase}
          onCV={() => {
            setRecruiterOpen(false);
            setCvOpen(true);
          }}
        />
        <CVView open={cvOpen} onClose={() => setCvOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
