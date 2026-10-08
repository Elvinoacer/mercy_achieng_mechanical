/**
 * EXPERIENCE, EDUCATION, CAPABILITIES, WORKSHOP & TIMELINE
 * — spec §15, §18, §36–§44
 */

export const experience = {
  role: "Mechanical Engineering Intern — Industrial Attachment",
  org: "[Engineering / Manufacturing Company — to be verified]",
  period: "May 2025 – August 2025", // [PLACEHOLDER]
  department: "Maintenance / Production / Engineering Services",
  scope: "Supervised graduate-level attachment",
  responsibilities: [
    "Assisted with preventive maintenance activities under supervision",
    "Observed machine inspection and servicing procedures",
    "Supported lubrication checks and schedules",
    "Participated in workshop tasks under supervision",
    "Assisted with measurement of machine components",
    "Read and interpreted basic mechanical drawings",
    "Observed bearing replacement and alignment procedures",
    "Supported maintenance-record updates",
    "Participated in production-floor observations",
    "Assisted with fault-report documentation",
    "Observed welding, machining and fabrication operations",
    "Participated in safety briefings",
    "Learned production workflow and downtime implications",
  ],
  equipmentExposure: [
    "Pumps",
    "Compressors",
    "Motors",
    "Gearboxes",
    "Conveyors",
    "Bearings",
    "Heat exchangers",
    "Machining equipment",
    "Welding equipment",
    "Pneumatic systems",
    "Hydraulic systems",
    "Production lines",
  ],
  lessons:
    "Industrial attachment showed me how mechanical engineering connects design, maintenance and production. A machine may be technically well designed, but plant performance still depends on lubrication, alignment, inspection, operator practices, spare parts, safety, maintenance planning and production scheduling. I also learned how costly unplanned downtime can be.",
};

export const focusAreas = [
  {
    id: "mechanical-design",
    code: "A",
    title: "Mechanical Design",
    positioning: "Turning functional requirements into mechanical components and assemblies that can be analyzed, built and maintained.",
    topics: ["Shafts", "Bearings", "Gears", "Fasteners", "Springs", "Mechanisms", "Design calculations", "Tolerances", "Design for manufacture"],
  },
  {
    id: "manufacturing-production",
    code: "B",
    title: "Manufacturing & Production",
    positioning: "Understanding how engineered parts move from drawings into repeatable production.",
    topics: ["Machining", "Casting", "Welding", "Forming", "Fabrication", "CNC fundamentals", "Production planning", "Process selection", "Lean principles"],
  },
  {
    id: "thermofluids",
    code: "C",
    title: "Thermofluids",
    positioning: "Understanding how energy, heat and fluids behave inside mechanical systems.",
    topics: ["Thermodynamics", "Fluid mechanics", "Heat transfer", "Pumps", "Compressors", "IC engines", "HVAC fundamentals", "Energy systems"],
  },
  {
    id: "maintenance-reliability",
    code: "D",
    title: "Maintenance & Reliability",
    positioning: "Improving equipment availability by understanding how machines fail and how failures can be prevented.",
    topics: ["Preventive maintenance", "Condition monitoring", "Failure modes", "Bearings", "Lubrication", "Alignment", "Root cause thinking", "Documentation"],
  },
  {
    id: "industrial-systems",
    code: "E",
    title: "Industrial & Production Systems",
    positioning: "Improving how people, machines, materials and processes work together.",
    topics: ["Production planning", "Quality control", "Work measurement", "Process improvement", "Inventory", "Operations", "Layout planning", "Lean manufacturing"],
  },
];

export const education = {
  institution: "Moi University",
  school: "School of Engineering",
  location: "Eldoret, Kenya",
  degree: "Bachelor of Engineering in Mechanical & Production Engineering",
  period: "2021 – 2026", // [PLACEHOLDER]
  classification: "[Classification — to be verified]",
  coursework: [
    {
      category: "Mechanical Design",
      modules: ["Engineering Mechanics", "Strength of Materials", "Theory of Machines", "Machine Design", "Mechanical Vibrations", "Engineering Drawing", "CAD"],
    },
    {
      category: "Manufacturing",
      modules: ["Manufacturing Processes", "Workshop Technology", "Production Engineering", "Metrology", "Machine Tools", "CNC Fundamentals", "Welding / Fabrication", "Manufacturing Systems"],
    },
    {
      category: "Thermofluids",
      modules: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer", "Internal Combustion Engines", "Energy Systems", "Refrigeration & Air Conditioning"],
    },
    {
      category: "Materials",
      modules: ["Engineering Materials", "Materials Science", "Metallurgy", "Failure fundamentals", "Heat treatment"],
    },
    {
      category: "Industrial / Production Engineering",
      modules: ["Operations Research", "Production Planning", "Quality Control", "Work Study", "Engineering Economics", "Project Management", "Industrial Management"],
    },
    {
      category: "Engineering Foundations",
      modules: ["Engineering Mathematics", "Numerical Methods", "Electrical Engineering basics", "Programming", "Engineering Ethics", "Technical Communication"],
    },
  ],
};

export const workshop = {
  machineShop: ["Lathe", "Milling", "Drilling", "Grinding", "Measurement", "Cutting tools", "Workholding", "Safety"],
  fabrication: ["Arc welding", "Sheet-metal work", "Cutting", "Bending", "Fitting"],
  fitting: ["Filing", "Drilling", "Tapping", "Assembly", "Measurement"],
  metrology: ["Vernier calipers", "Micrometers", "Dial indicators", "Gauges", "Tolerance checking"],
};

export const laboratories = [
  { name: "Materials Laboratory", work: ["Tensile test", "Hardness test", "Impact test", "Microstructure observation"] },
  { name: "Thermodynamics Laboratory", work: ["Engine performance", "Refrigeration cycle", "Energy balances", "Efficiency measurement"] },
  { name: "Fluid Mechanics Laboratory", work: ["Flow measurement", "Pipe losses", "Pump characteristics", "Bernoulli experiments"] },
  { name: "Heat Transfer Laboratory", work: ["Conduction", "Convection", "Heat exchanger performance"] },
  { name: "Vibrations / Dynamics Laboratory", work: ["Natural frequency", "Damping", "Forced vibration", "Balancing"] },
];

export const timeline = [
  {
    year: "2021",
    title: "Engineering Foundations",
    body: "Mathematics, mechanics, technical drawing and materials basics.",
    code: "Y1",
  },
  {
    year: "2022",
    title: "Manufacturing & Thermofluids",
    body: "Workshop processes, thermodynamics, fluid mechanics and strength of materials.",
    code: "Y2",
  },
  {
    year: "2023",
    title: "Machine Design & Production",
    body: "Machine elements, manufacturing systems, heat transfer and production engineering.",
    code: "Y3",
  },
  {
    year: "2024",
    title: "Integrated Mechanical Projects",
    body: "CAD, machine design, process planning and practical projects.",
    code: "Y4",
  },
  {
    year: "2025",
    title: "Industrial Attachment",
    body: "Practical exposure to plant, maintenance, production and workshop systems.",
    code: "IA",
  },
  {
    year: "2026",
    title: "Final-Year Project & Graduation",
    body: "Completed an integrated mechanical design / manufacturing project and prepared for graduate roles.",
    code: "FY",
  },
];

export const improvementCycle = [
  "Define Problem",
  "Measure Current State",
  "Identify Root Cause",
  "Develop Improvement",
  "Implement",
  "Measure Again",
  "Standardize",
];

export const diagnosticProcess = [
  "Identify symptom",
  "Establish operating conditions",
  "Inspect visually",
  "Check lubrication / alignment / fasteners",
  "Measure temperature / vibration / pressure",
  "Isolate likely failure mode",
  "Correct under proper supervision",
  "Test machine",
  "Record findings",
  "Update preventive action",
];
