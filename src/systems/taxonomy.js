/**
 * System layer taxonomy for the engineering map.
 *
 * `key` values are stable identifiers used by the SVG map, the case-study views and the
 * filter state. Every `systemIds` list elsewhere in the codebase refers to these keys.
 *
 * LAYER ORDERING (top of the stack to bottom) is intentional: it mirrors how a request
 * flows through a system, which is what makes the map readable at a glance.
 */
export const SYSTEM_LAYERS = [
  {
    key: "interface",
    label: "Interfaces & Product",
    short: "Interfaces",
    blurb: "User-facing surfaces and real-time product experience.",
  },
  {
    key: "orchestration",
    label: "Agents & Orchestration",
    short: "Agents",
    blurb: "Multi-step agent loops, routers and approval workflows.",
  },
  {
    key: "llm",
    label: "LLMs & Models",
    short: "LLMs",
    blurb: "Model providers, prompts and structured extraction.",
  },
  {
    key: "retrieval",
    label: "Retrieval & Vector Search",
    short: "Retrieval",
    blurb: "Embeddings, vector indexes and hybrid search.",
  },
  {
    key: "tools",
    label: "Tools & Execution",
    short: "Tools",
    blurb: "Shell, filesystem, browser and external service calls.",
  },
  {
    key: "data",
    label: "Data & Storage",
    short: "Data",
    blurb: "Relational stores, queues and object storage.",
  },
  {
    key: "api",
    label: "APIs & Backend Services",
    short: "Backend",
    blurb: "HTTP services, streaming and background workers.",
  },
  {
    key: "infra",
    label: "Infrastructure & Deployment",
    short: "Infra",
    blurb: "Containers, CI pipelines and hosting configuration.",
  },
];

export const SYSTEM_LAYER_KEYS = SYSTEM_LAYERS.map((layer) => layer.key);

/** Layer groups used by the role filters to explain *why* a system was matched. */
export const LAYER_GROUPS = {
  ai: ["orchestration", "llm", "retrieval"],
  ml: ["retrieval", "data"],
  app: ["interface", "api", "data"],
  ops: ["infra", "tools"],
};

export const LAYER_GROUP_LABELS = {
  ai: "AI",
  ml: "ML",
  app: "Application",
  ops: "Operations",
};

/**
 * Hiring perspectives. A system may appear under several roles when its real implementation
 * supports them — this is an evidence claim, not a preference.
 */
export const ROLES = [
  {
    key: "sde",
    label: "SDE",
    blurb: "Interfaces, APIs, data models and background workers.",
  },
  {
    key: "ai-engineer",
    label: "AI Engineer",
    blurb: "Agent loops, LLM workflows, retrieval and guardrails.",
  },
  {
    key: "fde",
    label: "FDE",
    blurb: "Taking an unproven model or workflow to something usable end to end.",
  },
  {
    key: "ml-engineer",
    label: "ML Engineer",
    blurb: "Training, evaluation, drift and inference endpoints.",
  },
  {
    key: "fullstack",
    label: "Full-Stack",
    blurb: "Shipped products spanning frontend, backend and deployment.",
  },
];

export const ROLE_KEYS = ROLES.map((role) => role.key);

export const LAYER_BY_KEY = Object.fromEntries(
  SYSTEM_LAYERS.map((layer) => [layer.key, layer]),
);

export const ROLE_BY_KEY = Object.fromEntries(
  ROLES.map((role) => [role.key, role]),
);

/**
 * Engineering domains used to group the full project index. Membership is declared once,
 * per system id, so the grouping is auditable and cannot drift when the data changes.
 */
export const DOMAIN_ORDER = [
  "Agent Systems",
  "Retrieval Systems",
  "Machine Learning & Vision",
  "Product Engineering",
  "Workflow Automation",
  "Developer Tools",
  "Real-Time & 3D Web",
];

const GROUP_BY_ID = {
  // Agent systems: a loop that plans, calls tools and revises.
  mypi: "Agent Systems",
  "secureintent-orchestrator": "Agent Systems",
  sentinelrag: "Agent Systems",
  engram: "Agent Systems",
  replui: "Agent Systems",
  "agentic-code-review": "Agent Systems",

  // Retrieval systems: embeddings, indexes and grounded answers.
  "recall-tabs": "Retrieval Systems",
  contextai: "Retrieval Systems",
  "graphrag-benchmark": "Retrieval Systems",

  // ML and computer vision.
  "industrial-ai-vision": "Machine Learning & Vision",
  "transaction-fraud": "Machine Learning & Vision",
  "consumer-sentiment": "Machine Learning & Vision",
  "audio-cnn-visualizer": "Machine Learning & Vision",
  "nifty-event-study": "Machine Learning & Vision",
  "trader-sentiment": "Machine Learning & Vision",

  // Product engineering: shipped end-to-end applications.
  vedlab: "Product Engineering",
  omnigen: "Product Engineering",
  veddev: "Product Engineering",
  "bse-trades-dashboard": "Product Engineering",
  agencyflow: "Product Engineering",
  aivoa: "Product Engineering",
  "property-post-maker": "Product Engineering",
  healspace: "Product Engineering",

  // Workflow automation.
  "studio-lead-automation": "Workflow Automation",
  orchestrion: "Workflow Automation",
  "web-scraper-cli": "Workflow Automation",
  "trading-bot": "Workflow Automation",

  // Developer tools.

  "prompt-ops-dashboard": "Developer Tools",

  // Real-time and 3D web.
  "fabric-fusion": "Real-Time & 3D Web",
};

/** Falls back to Product Engineering so no system can ever be left ungrouped. */
export function groupOf(system) {
  return GROUP_BY_ID[system.id] ?? "Product Engineering";
}