/**
 * PROJECTS — spec §19–§34
 * Six documented projects. The flagship thresher case study follows
 * the 15-part mechanical case-study template (spec §35 / §70).
 */

export interface CaseSection {
  id: string;
  title: string;
  body?: string;
  bullets?: string[];
  formula?: { caption: string; lines: string[] };
  table?: { headers: string[]; rows: string[][] };
  flow?: string[];
  images?: { src: string; alt: string; caption: string }[];
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  type: string;
  year: string;
  featured: boolean;
  role: string;
  duration: string;
  team: string;
  summary: string;
  tools: string[];
  image: string;
  imageAlt: string;
  tags: string[];
  caseSections: CaseSection[];
  nextProject: string;
}

const IMG = "/images";

export const projects: Project[] = [
  /* ─────────── FLAGSHIP — Multi-Crop Threshing Machine ─────────── */
  {
    slug: "multi-crop-thresher",
    number: "01",
    title: "Design & Development of a Pedal-Assisted Multi-Crop Threshing Machine",
    shortTitle: "Multi-Crop Threshing Machine",
    category: "Machine Design / Manufacturing",
    type: "Final-Year Project",
    year: "2026",
    featured: true,
    role: "Mechanical Design · CAD · Fabrication Support · Testing",
    duration: "Two semesters",
    team: "Final-year project",
    summary:
      "A low-cost, mechanically assisted threshing machine intended to reduce manual effort and improve throughput for small-scale crop processing — taken from functional requirements through mechanism selection, machine design, CAD modelling, fabrication and performance testing.",
    tools: ["SolidWorks", "AutoCAD", "Excel", "Workshop Fabrication"],
    image: `${IMG}/thresher.jpg`,
    imageAlt: "Pedal-assisted multi-crop threshing machine — academic prototype context",
    tags: ["Mechanisms", "Transmission Design", "Fabrication", "Testing"],
    caseSections: [
      {
        id: "problem",
        title: "Problem",
        body: "Manual threshing remains labor-intensive, slow, inconsistent and physically demanding, and is associated with higher post-harvest losses for small-scale farmers. The engineering challenge was to develop a machine that increases throughput while remaining affordable, easy to operate, manufacturable with locally available materials and common workshop processes, easy to maintain, and safe for the operator.",
        bullets: [
          "Increase threshing throughput versus manual methods",
          "Keep the machine affordable for small-scale users",
          "Use locally available materials and standard parts",
          "Ensure safe operation and simple maintenance",
        ],
      },
      {
        id: "requirements",
        title: "Functional Requirements",
        bullets: [
          "Separate grain from stalks with minimal grain damage",
          "Operate from human pedal input with acceptable effort",
          "Target drum speed in the range identified from threshing-mechanism references",
          "Tolerate dust, crop variability and continuous feeding",
          "Allow one operator to feed, pedal and monitor simultaneously",
          "Permit tool-free access for cleaning and blade inspection",
        ],
      },
      {
        id: "concept",
        title: "Concept Development",
        body: "Three transmission concepts were compared before selection. Each was scored against cost, availability, maintenance, efficiency, shock tolerance and safety. A chain drive offered the best balance of positive engagement, availability of standard sprockets locally, and tolerance of dusty conditions.",
        table: {
          headers: ["Criterion", "Belt Drive", "Chain Drive", "Gear Drive"],
          rows: [
            ["Cost", "Low", "Medium", "High"],
            ["Slip under load", "Possible", "None (positive)", "None (positive)"],
            ["Shock tolerance", "Good", "Good", "Poor without damping"],
            ["Local availability", "Good", "Good", "Limited"],
            ["Maintenance", "Tensioning", "Lubrication", "Lubrication + sealing"],
            ["Selected", "—", "✓", "—"],
          ],
        },
      },
      {
        id: "calculations",
        title: "Engineering Calculations",
        body: "The power requirement follows from the estimated operating torque at the threshing drum and the target rotational speed. Shaft diameter was then determined from combined bending and torsion using an allowable shear stress with a factor of safety, before rounding up to a standard bar size.",
        formula: {
          caption: "Design basis — values finalized from project test data",
          lines: [
            "P = T × ω",
            "ω = 2πN / 60",
            "d³ = 16 / (π·τ_allow) × √[(kₘM)² + (kₜT)²]",
            "n_s = 2.0 (selected factor of safety)",
          ],
        },
        bullets: [
          "Target drum speed, operating torque and required power established from loading assumptions and measured test values",
          "Bending moment diagram drawn for the loaded shaft span between bearings",
          "Combined stress checked against allowable shear with the selected factor of safety",
          "Bearing radial loads estimated from shaft reactions at running speed",
        ],
      },
      {
        id: "cad",
        title: "CAD Design",
        body: "The complete machine was modelled as an assembly in SolidWorks — frame, main shaft, bearings, drive sprockets, threshing drum and guards — with an exploded view and a drawing set used for fabrication. Interference and fit checks were completed before any material was cut.",
        images: [
          {
            src: `${IMG}/technical-drawing.jpg`,
            alt: "Example engineering technical drawing with dimensions",
            caption: "FIG A — Engineering drawing practice: dimensioned part drawing (context imagery)",
          },
          {
            src: `${IMG}/cad-workstation.jpg`,
            alt: "CAD workstation with mechanical design software",
            caption: "FIG B — CAD modelling environment for the assembly (context imagery)",
          },
        ],
      },
      {
        id: "materials",
        title: "Material Selection",
        table: {
          headers: ["Part", "Material / Type", "Selection Reason"],
          rows: [
            ["Frame", "Mild steel angle & square tube", "Availability, weldability, rigidity"],
            ["Main shaft", "Bright mild steel bar", "Machinability, adequate strength for loads"],
            ["Bearings", "Standard pillow-block units", "Sealed, tolerant of dust, locally available"],
            ["Drum bars", "Mild steel rod", "Wear resistance adequate, replaceable"],
            ["Guard", "Sheet metal", "Cut and bent to form, low cost"],
          ],
        },
      },
      {
        id: "manufacturing",
        title: "Manufacturing Plan",
        body: "The build sequence followed the standard route from material selection to testing, with each stage documented in the workshop build book.",
        flow: [
          "Material selection",
          "Cutting",
          "Machining",
          "Drilling",
          "Welding",
          "Shaft / bearing fitment",
          "Assembly",
          "Alignment",
          "Guard installation",
          "Testing",
        ],
      },
      {
        id: "fabrication",
        title: "Fabrication",
        bullets: [
          "Frame members cut, drilled and welded with jigs to keep squares true",
          "Shaft turned to bearing fits; keyways cut for sprocket and drum hubs",
          "Guards cut from sheet, edges deburred and folded around rotating parts",
          "Purchased parts: bearings, sprockets, chain, fasteners",
        ],
        images: [
          {
            src: `${IMG}/welding-color.jpg`,
            alt: "Welding of steel frame members",
            caption: "FIG C — Frame fabrication: welding operations (context imagery)",
          },
          {
            src: `${IMG}/lathe-turning.jpg`,
            alt: "Turning operations on a lathe",
            caption: "FIG D — Shaft turning to bearing fits (context imagery)",
          },
        ],
      },
      {
        id: "safety",
        title: "Safety Design",
        bullets: [
          "Guards fully enclose rotating chain and drum assemblies",
          "Pinch points identified and shielded at the feed opening",
          "Frame checked for stability under pedalling loads",
          "Operator distance to threshing mechanism set by ergonomic reach study",
          "Safe feeding method defined and labelled on the machine",
          "Sharp edges removed; maintenance access designed without guard removal",
        ],
      },
      {
        id: "testing",
        title: "Testing",
        body: "Testing progressed from no-load checks to continuous operation, with measured values recorded for the final report.",
        bullets: [
          "No-load run: vibration observation and speed measurement",
          "Throughput tests across crop batches",
          "Threshing efficiency and grain damage assessment",
          "Operator effort evaluation during continuous use",
          "Bearing temperature and alignment inspection after runs",
        ],
        table: {
          headers: ["Metric", "Result"],
          rows: [
            ["Throughput", "[PROJECT DATA] kg/h"],
            ["Threshing efficiency", "[PROJECT DATA] %"],
            ["Grain damage rate", "[PROJECT DATA] %"],
            ["Operating speed", "[PROJECT DATA] rpm"],
          ],
        },
      },
      {
        id: "failures-iteration",
        title: "What Failed & Iteration",
        bullets: [
          "First drum speed caused excessive grain damage — drive ratio revised",
          "Initial chain tensioning method slipped under shock loads — idler added",
          "Frame vibration at running speed — gussets added at high-stress welds",
          "Feed opening size caused bridging of stalks — opening reprofiled",
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "The project showed me that a successful mechanical design is not just a set of calculations. Performance depends on fabrication accuracy, alignment, material availability, ergonomics, safety, maintenance and how the machine behaves under real operating conditions. Testing and iteration were essential for identifying weaknesses that were not obvious in CAD.",
      },
      {
        id: "improvements",
        title: "Future Improvements",
        bullets: [
          "Electric motor option with clutch for stationary use",
          "Interchangeable threshing drums for different crops",
          "Formal fatigue analysis and FEA of the shaft and frame",
          "Improved bearing protection against dust ingestion",
          "Adjustable drum speed and modular, lighter frame",
        ],
      },
    ],
    nextProject: "scissor-jack",
  },

  /* ─────────── Project 2 — Scissor Jack ─────────── */
  {
    slug: "scissor-jack",
    number: "02",
    title: "Mechanical Scissor Jack Design",
    shortTitle: "Scissor Jack Design",
    category: "Machine Design",
    type: "Academic Project",
    year: "2024",
    featured: false,
    role: "Design calculations · CAD modelling",
    duration: "6 weeks",
    team: "Individual coursework",
    summary:
      "Design of a manually operated scissor jack for a specified load — from load analysis through screw and link sizing to a complete CAD model and drawing package.",
    tools: ["SolidWorks", "Hand calculations", "Excel"],
    image: `${IMG}/caliper-blueprint.jpg`,
    imageAlt: "Caliper and engineering drawings on a workbench",
    tags: ["Load Analysis", "Screw Design", "Factor of Safety"],
    caseSections: [
      {
        id: "problem",
        title: "Problem",
        body: "Design a manually operated scissor jack to lift a specified load through a defined travel, using standard materials and processes, with a verifiable factor of safety against failure in the screw, links and pins.",
      },
      {
        id: "work",
        title: "Design Work",
        bullets: [
          "Load analysis for tipping and offset loading cases",
          "Power screw design: torque, efficiency and self-locking check",
          "Link member sizing from combined axial load and buckling check",
          "Pin selection on shear and bearing",
          "Factor of safety verified across all critical members",
          "Material selection for strength, weldability and cost",
        ],
      },
      {
        id: "evidence",
        title: "Evidence",
        bullets: [
          "Free-body diagrams of the loaded mechanism",
          "Complete calculation set with assumptions and standards references",
          "SolidWorks part and assembly models",
          "Fully dimensioned engineering drawing",
        ],
        images: [
          {
            src: `${IMG}/caliper-blueprint.jpg`,
            alt: "Caliper on engineering drawing",
            caption: "FIG A — Dimension verification practice (context imagery)",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "The dominating design lesson was how quickly mechanism geometry amplifies loads: small changes in link angle change pin loads substantially, and the self-locking check on the screw proved to be the real safety-critical item rather than raw strength.",
      },
    ],
    nextProject: "heat-exchanger",
  },

  /* ─────────── Project 3 — Heat Exchanger ─────────── */
  {
    slug: "heat-exchanger",
    number: "03",
    title: "Heat Exchanger Performance Analysis",
    shortTitle: "Heat Exchanger Analysis",
    category: "Thermofluids",
    type: "Laboratory / Academic Project",
    year: "2024",
    featured: false,
    role: "Experimentation · Data analysis · Reporting",
    duration: "4 weeks",
    team: "Pair work",
    summary:
      "Laboratory investigation of a shell-and-tube heat exchanger — measuring inlet and outlet temperatures, estimating heat-transfer rate and effectiveness, and comparing parallel and counter-flow configurations.",
    tools: ["Thermocouples", "Excel", "MATLAB"],
    image: `${IMG}/heatex-diagram.jpg`,
    imageAlt: "Shell and tube heat exchanger diagram",
    tags: ["Heat Transfer", "Effectiveness", "NTU Method"],
    caseSections: [
      {
        id: "work",
        title: "Experimental Work",
        bullets: [
          "Measured inlet/outlet temperatures for both streams across flow rates",
          "Estimated heat-transfer rate from energy balance on each stream",
          "Determined effectiveness using the NTU method",
          "Compared parallel-flow and counter-flow configurations",
          "Quantified heat losses to ambient and their effect on the energy balance",
        ],
      },
      {
        id: "evidence",
        title: "Evidence",
        bullets: [
          "Experiment setup with instrument locations",
          "Temperature measurement tables for all runs",
          "Effectiveness calculations with uncertainty notes",
          "Heat-transfer plots for both configurations",
        ],
        images: [
          {
            src: `${IMG}/heatex-diagram.jpg`,
            alt: "Shell and tube heat exchanger schematic",
            caption: "FIG A — Shell-and-tube configuration studied (context imagery)",
          },
          {
            src: `${IMG}/heatex-types.jpg`,
            alt: "Heat exchanger types reference",
            caption: "FIG B — Configuration comparison reference (context imagery)",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "Counter-flow clearly outperformed parallel flow at the same flow conditions, and the largest source of error was heat loss to ambient rather than instrument precision — a practical reminder that the energy balance closes only when the system boundary is drawn honestly.",
      },
    ],
    nextProject: "production-line-study",
  },

  /* ─────────── Project 4 — Production Line Study ─────────── */
  {
    slug: "production-line-study",
    number: "04",
    title: "Production Line Improvement Study",
    shortTitle: "Production Line Study",
    category: "Production Engineering",
    type: "Academic / Team Project",
    year: "2025",
    featured: false,
    role: "Process observation · Cycle-time recording · Analysis",
    duration: "8 weeks",
    team: "Four-member team",
    summary:
      "Analysis of a simulated academic production process with delays, excessive movement and unbalanced workstations — mapping the process, measuring cycle times, identifying bottlenecks and proposing a rebalanced layout.",
    tools: ["Process mapping", "Time study", "Excel"],
    image: `${IMG}/factory-floor.jpg`,
    imageAlt: "Factory production floor with machinery",
    tags: ["Process Mapping", "Takt Time", "Layout"],
    caseSections: [
      {
        id: "problem",
        title: "Problem",
        body: "The studied process suffered from delays, unnecessary material movement and unbalanced workstation loading. The team's brief was to map the current state, measure it honestly, and develop a defensible improved layout.",
      },
      {
        id: "work",
        title: "Work Performed",
        bullets: [
          "Mapped the complete process before and after improvement",
          "Recorded cycle times at every workstation across repeated runs",
          "Identified the bottleneck station and quantified waiting waste",
          "Applied takt and capacity concepts to set target cycle times",
          "Proposed a rebalanced workstation layout reducing movement",
          "Documented improvement recommendations with expected effects",
        ],
      },
      {
        id: "evidence",
        title: "Evidence",
        bullets: [
          "Before/after process maps",
          "Cycle-time measurement tables",
          "Proposed layout drawing",
          "Improvement recommendation register",
        ],
        images: [
          {
            src: `${IMG}/factory-floor.jpg`,
            alt: "Production floor layout",
            caption: "FIG A — Production environment studied (context imagery)",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "No savings were claimed without measured data — the study proposed changes and their expected direction of effect. The sharpest learning was that layout decisions ripple into inventory and waiting: moving one operation eliminated two handling steps downstream.",
      },
    ],
    nextProject: "pump-system",
  },

  /* ─────────── Project 5 — Pump System ─────────── */
  {
    slug: "pump-system",
    number: "05",
    title: "Pump Selection & Piping Analysis",
    shortTitle: "Pump & Piping System",
    category: "Fluid Systems",
    type: "Academic Project",
    year: "2023",
    featured: false,
    role: "System analysis · Pump selection",
    duration: "5 weeks",
    team: "Pair work",
    summary:
      "Fluid systems design exercise — determining flow requirements, computing static and friction head losses, developing the system curve, selecting a suitable pump and evaluating the operating point.",
    tools: ["Hand calculations", "Excel", "Pump catalogs"],
    image: `${IMG}/pump-diagram.jpg`,
    imageAlt: "Centrifugal pump cross-section diagram",
    tags: ["System Curve", "TDH", "Pump Selection"],
    caseSections: [
      {
        id: "work",
        title: "Work Performed",
        bullets: [
          "Determined required flow rate from the service brief",
          "Calculated static head from the installation geometry",
          "Estimated friction losses using the Darcy-Weisbach approach with fittings",
          "Developed the system curve across the operating range",
          "Selected a candidate pump from catalog curves",
          "Evaluated the operating point and checked against best-efficiency region",
        ],
      },
      {
        id: "evidence",
        title: "Evidence",
        bullets: [
          "Piping schematic with fittings schedule",
          "System curve development calculations",
          "Pump curve overlay and operating point",
          "Complete calculation set",
        ],
        images: [
          {
            src: `${IMG}/pump-diagram.jpg`,
            alt: "Pump cross section technical diagram",
            caption: "FIG A — Centrifugal pump geometry reference (context imagery)",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "The exercise taught me that a pump is selected against a system, not in isolation: the operating point only exists where the curves intersect, and over-specifying head wastes energy at every hour of operation.",
      },
    ],
    nextProject: "gearbox-design",
  },

  /* ─────────── Project 6 — Gearbox ─────────── */
  {
    slug: "gearbox-design",
    number: "06",
    title: "Gearbox / Power Transmission Assembly",
    shortTitle: "Reduction Gearbox Assembly",
    category: "Mechanical Design",
    type: "CAD / Academic Project",
    year: "2024",
    featured: false,
    role: "Design · CAD modelling · Drawing package",
    duration: "6 weeks",
    team: "Individual coursework",
    summary:
      "Design of a small reduction-drive assembly — from speed ratio and gear selection through shaft sizing and bearing placement to a housing, lubrication considerations and a complete assembly drawing set.",
    tools: ["SolidWorks", "Hand calculations"],
    image: `${IMG}/bearing.jpg`,
    imageAlt: "Ball bearing components close up",
    tags: ["Speed Ratio", "Shaft Sizing", "Assembly Design"],
    caseSections: [
      {
        id: "work",
        title: "Work Performed",
        bullets: [
          "Established the required speed reduction ratio",
          "Selected gear pair with module and face-width checks",
          "Sized both shafts for torque and bending with bearing reactions",
          "Positioned bearings with span and deflection checks",
          "Designed the housing with lubrication and sealing considerations",
          "Produced exploded view, BOM and assembly drawings",
        ],
      },
      {
        id: "evidence",
        title: "Evidence",
        bullets: [
          "Exploded assembly view",
          "Bill of materials",
          "Assembly drawing with fits and tolerances",
          "Selected gear and shaft calculations",
        ],
        images: [
          {
            src: `${IMG}/bearing.jpg`,
            alt: "Ball bearing components",
            caption: "FIG A — Rolling-element bearings studied (context imagery)",
          },
          {
            src: `${IMG}/cnc-milling.jpg`,
            alt: "CNC milling machine",
            caption: "FIG B — Machining context for housing production (context imagery)",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons",
        body: "Assembly design is a negotiation: bearing span, gear mesh alignment and housing stiffness all constrain each other. Defining the datum scheme early — and modelling around it — kept the drawing package coherent instead of contradictory.",
      },
    ],
    nextProject: "multi-crop-thresher",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
