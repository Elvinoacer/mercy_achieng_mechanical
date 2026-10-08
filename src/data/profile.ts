/**
 * MERCY ACHIENG — PORTFOLIO DATA
 * ────────────────────────────────────────────────────────────
 * Profile configuration per spec §2 (Placeholder / Verification
 * Policy). Items marked [PLACEHOLDER] must be replaced with
 * verified candidate information before publishing.
 */

export type Proficiency =
  | "strong"
  | "working-knowledge"
  | "academic-exposure"
  | "currently-learning";

export interface Link {
  platform: string;
  label: string;
  url: string;
}

export const profile = {
  fullName: "Mercy Achieng",
  professionalTitle: "Graduate Mechanical & Production Engineer",
  headline:
    "Mechanical & Production Engineering Graduate focused on Design, Manufacturing & Industrial Systems",
  eyebrow: "Moi University · B.Eng. Mechanical & Production Engineering",
  summary:
    "I am interested in how mechanical systems move from engineering calculations and CAD models into manufacturable, maintainable and reliable products. My training spans machine design, manufacturing processes, thermofluids, materials, production systems, maintenance and engineering analysis.",
  availability:
    "Open to graduate mechanical, manufacturing, maintenance, production and design engineering opportunities.",
  location: "Kenya",
  graduationYear: "2026", // [PLACEHOLDER]
  partNumber: "MA-ENG-2026",
  // [PLACEHOLDER] — replace with real contact details before publishing
  email: "mercy.achieng@example.com",
  phone: "+254 7XX XXX XXX", // [OPTIONAL]
  linkedin: "https://www.linkedin.com/in/mercy-achieng",
  github: undefined, // [OPTIONAL] CAD repository
} as const;

export const snapshot = [
  { item: "Degree", value: "B.Eng. Mechanical & Production Engineering" },
  { item: "University", value: "Moi University · Eldoret, Kenya" },
  { item: "Graduation", value: "2026", tag: "PLACEHOLDER" },
  { item: "Focus", value: "Design · Manufacturing · Industrial Systems" },
  { item: "Projects", value: "5+ documented engineering projects", tag: "PLACEHOLDER" },
  { item: "Industrial Attachment", value: "12 weeks supervised", tag: "PLACEHOLDER" },
  { item: "Core Tools", value: "SolidWorks · AutoCAD · MATLAB", tag: "PLACEHOLDER" },
  { item: "Location", value: "Kenya · Open to relocation" },
  { item: "Availability", value: "Graduate opportunities" },
];

export const heroStats = [
  { value: 6, suffix: "", label: "Documented projects" },
  { value: 12, suffix: " wks", label: "Industrial attachment" },
  { value: 5, suffix: "", label: "Engineering focus areas" },
  { value: 2026, suffix: "", label: "B.Eng. graduation", raw: true },
];

export const marqueeItems = [
  "Machine Design",
  "GD&T",
  "SolidWorks",
  "Thermodynamics",
  "Tolerance ±0.05",
  "Fluid Mechanics",
  "Preventive Maintenance",
  "Lean Manufacturing",
  "Heat Transfer",
  "Root Cause Analysis",
  "CAD Assembly",
  "Process Planning",
  "Factor of Safety 2.0",
  "Quality Control",
  "Shaft Design",
  "5S",
  "Bearing Selection",
  "Heat Exchangers",
];

export const philosophyLines = [
  "Understand the function.",
  "Calculate the loads.",
  "Design for manufacture.",
  "Build for reliability.",
  "Improve through testing.",
];

export const philosophyExpanded =
  "I see mechanical engineering as the discipline of turning physical requirements into systems that can actually be made, operated and maintained. A successful design must balance performance, safety, materials, manufacturing, cost, reliability and maintenance — not only calculations.";

export const currentlyLearning = [
  { topic: "Advanced SolidWorks", status: "In progress", goal: "Surfacing, weldments & advanced assemblies" },
  { topic: "GD&T", status: "In progress", goal: "Datum systems & functional tolerancing" },
  { topic: "ANSYS FEA", status: "Started", goal: "Static structural & modal analysis" },
  { topic: "CNC Programming", status: "Next", goal: "2.5-axis milling fundamentals" },
  { topic: "Lean Manufacturing", status: "In progress", goal: "Value-stream mapping & standard work" },
  { topic: "Vibration Analysis", status: "Next", goal: "Condition-monitoring basics" },
  { topic: "Python for Engineering", status: "Started", goal: "Data analysis for test results" },
  { topic: "PLC Fundamentals", status: "Next", goal: "Industrial automation basics" },
];

export const aboutParagraphs = [
  "I am a Mechanical & Production Engineering graduate from Moi University with strong interest in machine design, manufacturing systems, maintenance and industrial process improvement.",
  "My degree has exposed me to engineering mechanics, machine elements, thermodynamics, fluid mechanics, heat transfer, manufacturing processes, CAD, materials engineering, production planning, quality control and maintenance systems.",
  "I am especially interested in the transition from design to production: how a mechanical idea is analyzed, modelled, manufactured, assembled, tested, maintained and continuously improved.",
  "I approach engineering problems by understanding the required function, loading, materials, manufacturing constraints, reliability expectations and cost before selecting a practical design.",
  "I am looking for graduate opportunities where I can strengthen my engineering judgment, contribute to real products and industrial systems, and grow under experienced engineers.",
];

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "manifesto", label: "Manifesto" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Engineering" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const seo = {
  title: "Mercy Achieng | Mechanical & Production Engineer",
  description:
    "Mercy Achieng is a Moi University Mechanical & Production Engineering graduate focused on design, manufacturing and industrial systems. Explore her engineering projects, CAD work, industrial experience and technical portfolio.",
  keywords: [
    "Mercy Achieng Mechanical Engineer",
    "Moi University Mechanical Engineering Graduate",
    "Graduate Mechanical Engineer Kenya",
    "Production Engineer Kenya",
    "Manufacturing Engineer Graduate Kenya",
  ],
};
