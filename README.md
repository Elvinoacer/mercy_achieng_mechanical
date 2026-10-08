# Mercy Achieng — Mechanical & Production Engineering Portfolio

A state-of-the-art graduate engineering portfolio built to the full specification in
`docs/MERCY_ACHIENG_MECHANICAL_PRODUCTION_PORTFOLIO_SPEC.md`. Single-page immersive
experience with engineering-drawing visual language, scroll-driven motion, case-study
overlays, recruiter mode and a print-ready CV view.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-e64ce6)

## Quick start

```bash
npm install        # or: bun install / pnpm install
npm run dev        # develop at http://localhost:3000
npm run build && npm start   # production
```

Deploy in one click to **Vercel** (zero config) or any Node host.

## What's inside

| Area | Implementation |
|---|---|
| **Sections (spec §10)** | Hero → Snapshot → Featured Project → Project Grid → Industrial Attachment → Capability Areas → Skills → Software → Education → Workshop & Labs → Timeline → Currently Learning → Philosophy → About → Contact |
| **Motion** | Framer Motion 12: scroll reveals, stagger grids, word-reveal headings, animated counters, parallax gear watermarks, drawing-in dimension frames, timeline progress rail, marquee ticker, hide-on-scroll nav with scroll-spy |
| **Visual language** | Blueprint grids, engineering title blocks, exploded-assembly SVG, gear-train schematic, dimension callouts, mono technical labels — all custom SVG |
| **Theming** | Light + dark with exact spec §7 palettes (engineering blue `#2563EB`/`#60A5FA`, industrial amber `#E08A24`/`#F59E0B`) |
| **Case studies** | All 6 projects open a full-screen overlay following the 15-part case template (spec §35/§70): Problem → Requirements → Calculations → CAD → Materials → Manufacturing → Testing → Lessons → Improvements |
| **Recruiter mode** | 60-second summary view (spec §50) — toggle from the navbar |
| **CV** | Print-optimized CV overlay with dedicated print stylesheet (Print / Save PDF) |
| **SEO** | Metadata, OpenGraph, JSON-LD `Person` + `ProfilePage` structured data (spec §62) |
| **Accessibility** | Semantic HTML, keyboard navigation, focus states, ARIA labels, `prefers-reduced-motion` support |
| **Performance** | 19 optimized JPEGs (~130KB avg), `next/image`, static SVG illustrations, no 3D runtime |

## Customization — replace placeholders before publishing

Per the spec's verification policy (§2), this is a demonstration profile. Edit these
files to make it yours:

```
src/data/profile.ts      ← name, headline, email, LinkedIn, stats, philosophy
src/data/skills.ts       ← proficiency levels (Strong / Working / Exposure / Learning)
src/data/projects.ts     ← six project case studies (full 15-section content)
src/data/experience.ts   ← attachment, focus areas, education, timeline, labs
public/images/           ← replace portrait + context imagery with real project evidence
```

Every `[PLACEHOLDER]` badge in the UI marks data awaiting verification — the footer
discloses the demo status until you remove it (`src/components/layout/footer.tsx`).

## Project structure

```
src/
├── app/                  layout (SEO + fonts + theme), page, globals.css (design tokens)
├── components/
│   ├── layout/           navbar (scroll-spy, progress, theme), footer (title block)
│   ├── motion/           reveal / stagger / counter / word-reveal primitives
│   ├── technical/        exploded assembly, gear train, dimension frames, title blocks
│   ├── sections/         hero, snapshot, projects, experience, skills, education, contact
│   ├── projects/         full-screen case study overlay
│   └── recruiter/        recruiter mode + CV print view
└── data/                 all portfolio content (edit here)
```

## Publishing checklist (spec §74)

- [ ] Replace portrait with a real photograph
- [ ] Verify graduation year, classification and dates
- [ ] Insert real email / LinkedIn / phone
- [ ] Replace context imagery with real CAD, drawings and prototype photos
- [ ] Fill `[PROJECT DATA]` metrics with measured test values
- [ ] Remove the demo-profile notice in the footer
- [ ] Validate accessibility and Lighthouse scores
