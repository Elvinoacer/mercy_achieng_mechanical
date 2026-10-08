import type { Proficiency } from "./profile";

/* ————————————————————————————————————————————————
   SKILLS — spec §16: no percentage bars, use proficiency levels
   ———————————————————————————————————————————————— */

export interface Skill {
  name: string;
  proficiency: Proficiency;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const proficiencyMeta: Record<
  Proficiency,
  { label: string; level: number; note: string }
> = {
  strong: { label: "Strong", level: 4, note: "Used repeatedly across coursework & projects" },
  "working-knowledge": { label: "Working Knowledge", level: 3, note: "Applied on guided projects & labs" },
  "academic-exposure": { label: "Academic Exposure", level: 2, note: "Coursework & laboratory exposure" },
  "currently-learning": { label: "Currently Learning", level: 1, note: "Actively developing" },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "mechanical-design",
    title: "Mechanical Design",
    description: "From functional requirements to analyzed, manufacturable components.",
    skills: [
      { name: "Engineering mechanics", proficiency: "strong" },
      { name: "Machine design fundamentals", proficiency: "strong" },
      { name: "Factor of safety", proficiency: "strong" },
      { name: "Shaft design", proficiency: "working-knowledge" },
      { name: "Bearing selection", proficiency: "working-knowledge" },
      { name: "Gear fundamentals", proficiency: "working-knowledge" },
      { name: "Fastener design", proficiency: "working-knowledge" },
      { name: "Stress analysis", proficiency: "working-knowledge" },
      { name: "Tolerance awareness", proficiency: "working-knowledge" },
      { name: "Design for manufacture", proficiency: "working-knowledge" },
    ],
  },
  {
    id: "cad-drawing",
    title: "CAD / Technical Drawing",
    description: "Modelling parts, assemblies and production-ready engineering drawings.",
    skills: [
      { name: "2D engineering drawing", proficiency: "strong" },
      { name: "3D part modelling", proficiency: "strong" },
      { name: "Engineering drawings", proficiency: "strong" },
      { name: "Assembly modelling", proficiency: "working-knowledge" },
      { name: "Exploded views", proficiency: "working-knowledge" },
      { name: "BOM preparation", proficiency: "working-knowledge" },
      { name: "GD&T fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Hands-on workshop processes and process selection reasoning.",
    skills: [
      { name: "Drilling", proficiency: "strong" },
      { name: "Turning", proficiency: "working-knowledge" },
      { name: "Milling", proficiency: "working-knowledge" },
      { name: "Welding fundamentals", proficiency: "working-knowledge" },
      { name: "Sheet-metal fabrication", proficiency: "working-knowledge" },
      { name: "Process selection", proficiency: "working-knowledge" },
      { name: "Casting fundamentals", proficiency: "academic-exposure" },
      { name: "CNC fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    id: "thermofluids",
    title: "Thermofluids",
    description: "Energy, heat and fluid behaviour inside mechanical systems.",
    skills: [
      { name: "Thermodynamics", proficiency: "strong" },
      { name: "Fluid mechanics", proficiency: "strong" },
      { name: "Heat transfer", proficiency: "working-knowledge" },
      { name: "Pumps", proficiency: "working-knowledge" },
      { name: "IC engines", proficiency: "working-knowledge" },
      { name: "Compressors", proficiency: "academic-exposure" },
      { name: "HVAC fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    id: "production-engineering",
    title: "Production Engineering",
    description: "How people, machines and materials come together in production.",
    skills: [
      { name: "Production planning", proficiency: "working-knowledge" },
      { name: "Process mapping", proficiency: "working-knowledge" },
      { name: "Quality-control fundamentals", proficiency: "working-knowledge" },
      { name: "5S", proficiency: "working-knowledge" },
      { name: "Root-cause analysis", proficiency: "working-knowledge" },
      { name: "Lean manufacturing", proficiency: "academic-exposure" },
      { name: "Time study", proficiency: "academic-exposure" },
      { name: "Inventory fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Keeping machines available by understanding how they fail.",
    skills: [
      { name: "Preventive maintenance", proficiency: "working-knowledge" },
      { name: "Lubrication fundamentals", proficiency: "working-knowledge" },
      { name: "Bearing failure awareness", proficiency: "working-knowledge" },
      { name: "Maintenance records", proficiency: "working-knowledge" },
      { name: "Troubleshooting methodology", proficiency: "working-knowledge" },
      { name: "Alignment concepts", proficiency: "academic-exposure" },
    ],
  },
];

/* ————————————————————————————————————————————————
   ENGINEERING SOFTWARE — spec §17: show actual use, not logo walls
   ———————————————————————————————————————————————— */

export interface SoftwareTool {
  name: string;
  proficiency: Proficiency;
  usage: string;
}

export interface SoftwareGroup {
  id: string;
  title: string;
  tools: SoftwareTool[];
}

export const softwareGroups: SoftwareGroup[] = [
  {
    id: "cad-cae",
    title: "CAD / CAE",
    tools: [
      { name: "SolidWorks", proficiency: "strong", usage: "Academic part modelling, assemblies, engineering drawings and selected mechanical design projects." },
      { name: "AutoCAD", proficiency: "working-knowledge", usage: "2D engineering drawings, layouts and workshop practice documentation." },
      { name: "Autodesk Inventor", proficiency: "academic-exposure", usage: "Coursework exposure to part and assembly modelling." },
      { name: "Fusion 360", proficiency: "academic-exposure", usage: "Introductory CAD coursework and simple part studies." },
    ],
  },
  {
    id: "analysis",
    title: "Analysis",
    tools: [
      { name: "SolidWorks Simulation", proficiency: "working-knowledge", usage: "Static structural studies on academic machine-design components." },
      { name: "MATLAB", proficiency: "working-knowledge", usage: "Engineering calculations, data processing and lab-result analysis." },
      { name: "ANSYS", proficiency: "academic-exposure", usage: "Introductory FEA coursework; currently deepening." },
      { name: "Simulink", proficiency: "academic-exposure", usage: "Modelling of simple engineering systems in coursework." },
    ],
  },
  {
    id: "production-data",
    title: "Production / Data",
    tools: [
      { name: "Microsoft Excel", proficiency: "strong", usage: "Calculations sheets, BOMs, test-data tables and process data analysis." },
      { name: "Microsoft Project", proficiency: "working-knowledge", usage: "Project scheduling for academic engineering projects." },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    tools: [
      { name: "MATLAB scripting", proficiency: "working-knowledge", usage: "Automated calculations and lab-data processing." },
      { name: "Python", proficiency: "currently-learning", usage: "Currently learning for engineering data analysis." },
    ],
  },
];
