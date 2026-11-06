/**
 * Role-first views for recruiter-oriented navigation.
 *
 * Each role references project ids from `src/systems/projects.js` (one authoritative record
 * per project). Featured lists are curated from the verified inventory; no project is invented
 * and no recency is claimed where it cannot be established.
 */

export const ROLE_SLUGS = {
  sde: "sde",
  "ai-engineer": "ai-engineer",
  fde: "fde",
  "ml-engineer": "ml-engineer",
  "full-stack": "fullstack",
};

export const SLUG_TO_ROLE = {
  sde: "sde",
  "ai-engineer": "ai-engineer",
  fde: "fde",
  "ml-engineer": "ml-engineer",
  "full-stack": "fullstack",
};

export const ROLE_VIEWS = {
  sde: {
    slug: "sde",
    title: "Software Development Engineer",
    short: "SDE",
    intro:
      "I build and ship full-stack products end to end: React/Next.js interfaces, Node and FastAPI services, relational data models, and deployment pipelines. My work spans collaborative editors, AI SaaS, workflow automation, and trading dashboards.",
    strengths: [
      "Full-stack product engineering (React, Next.js, Node, FastAPI)",
      "API design and backend services",
      "Data modeling and persistence (PostgreSQL, Prisma, MongoDB)",
      "Deployment and CI (Docker, Vercel)",
      "Real-time collaboration and state sync",
      "Workflow automation and integrations",
    ],
    featured: ["vedlab", "orchestrion", "transaction-fraud", "bse-trades-dashboard", "aivoa"],
    evidence: [
      "VedLab: built a real-time collaborative canvas on the T3 stack with live cursors, comments and persistent project data.",
      "Orchestrion: workflow orchestration combining code-level control with no-code execution speed.",
      "Transaction Fraud Risk Platform: end-to-end fraud detection with FastAPI serving, Streamlit dashboard and Docker deployment.",
      "BSE Trades Dashboard: shipped product spanning frontend, backend and deployment.",
    ],
  },
  "ai-engineer": {
    slug: "ai-engineer",
    title: "AI Engineer",
    short: "AI Engineer",
    intro:
      "I design and ship LLM-powered systems: agent loops with tool calling, RAG and GraphRAG retrieval, prompt pipelines, and evaluation harnesses. Work includes a prompt-to-site builder, a multi-modal SaaS, and a controlled GraphRAG benchmark.",
    strengths: [
      "Agent orchestration and tool calling",
      "RAG and GraphRAG retrieval",
      "LLM evaluation and benchmarking",
      "Prompt engineering and structured extraction",
      "Guardrails and human-in-the-loop flows",
      "Backend services for AI (FastAPI, vector stores)",
    ],
    featured: ["veddev", "omnigen", "orchestrion", "secureintent-orchestrator", "graphrag-benchmark"],
    evidence: [
      "VedDev: prompt-to-site builder producing a previewable, deployable web experience from natural language.",
      "Omnigen: multi-modal generative AI SaaS behind subscription and auth.",
      "SecureIntent Orchestrator: Gmail-embedded, human-in-the-loop automation turning mail into an explainable action plan.",
      "GraphRAG Benchmark: controlled comparison of LLM-only vs. basic RAG vs. GraphRAG across a 2M-token corpus.",
    ],
  },
  fde: {
    slug: "fde",
    title: "Forward Deployed Engineer",
    short: "FDE",
    intro:
      "I take unproven models and workflows to usable end-to-end products: integrating LLMs into real user surfaces, building approval flows, and shipping deployable demos that a customer can actually use.",
    strengths: [
      "End-to-end AI product delivery",
      "Model-to-product integration",
      "Human-in-the-loop approval workflows",
      "Rapid prototyping and deployment",
      "Cross-functional delivery",
      "Evaluation and iteration",
    ],
    featured: ["veddev", "omnigen", "orchestrion", "secureintent-orchestrator", "graphrag-benchmark", "transaction-fraud"],
    evidence: [
      "VedDev and Omnigen: shipped deployable AI products with preview and subscription flows.",
      "SecureIntent Orchestrator: converts incoming communication into structured, explainable action plans users can approve or reject.",
      "GraphRAG Benchmark: measurable retrieval quality, latency, token usage and cost comparisons.",
      "Transaction Fraud Risk Platform: end-to-end ML product with serving, dashboard and Docker deployment.",
    ],
  },
  "ml-engineer": {
    slug: "ml-engineer",
    title: "Machine Learning Engineer",
    short: "ML Engineer",
    intro:
      "I build ML systems with training, evaluation and serving: fraud detection with XGBoost and SHAP explainability, computer vision for industrial inspection, sentiment analysis, and audio CNNs.",
    strengths: [
      "Model training and evaluation",
      "Feature engineering",
      "Explainability (SHAP)",
      "Model serving (FastAPI)",
      "Experiment tracking (MLflow)",
      "Computer vision and CNNs",
    ],
    featured: ["transaction-fraud", "graphrag-benchmark", "industrial-ai-vision", "consumer-sentiment", "audio-cnn-visualizer"],
    evidence: [
      "Transaction Fraud Risk Platform: XGBoost risk scoring with SHAP explanations, served over FastAPI and tracked in MLflow.",
      "Industrial AI Vision Platform: computer-vision system for industrial inspection.",
      "GraphRAG Benchmark: retrieval quality and answer accuracy evaluation across pipelines.",
      "Consumer Sentiment Analysis and Audio CNN Visualizer: applied ML with evaluation.",
    ],
  },
  fullstack: {
    slug: "full-stack",
    title: "Full-Stack Engineer",
    short: "Full-Stack",
    intro:
      "I ship products across the whole stack: React/Next.js UIs, APIs, databases, auth and deployment. From collaborative canvases to AI SaaS, dashboards and automation tools.",
    strengths: [
      "React/Next.js frontend engineering",
      "API and backend services",
      "Database design and ORM",
      "Auth and subscriptions",
      "Real-time features",
      "Deployment and DevOps",
    ],
    featured: ["vedlab", "veddev", "omnigen", "bse-trades-dashboard", "aivoa", "property-post-maker"],
    evidence: [
      "VedLab: end-to-end collaborative canvas with realtime sync and persistent storage.",
      "VedDev and Omnigen: full-stack AI products with auth, storage and deployment.",
      "BSE Trades Dashboard and Property Post Maker: shipped products spanning frontend, backend and deployment.",
      "AIVOA.AI: AI product with frontend, backend and deployment.",
    ],
  },
};

export const ROLE_ORDER = ["sde", "ai-engineer", "fde", "ml-engineer", "fullstack"];
