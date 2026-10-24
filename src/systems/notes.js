/**
 * Engineering Notes.
 *
 * Each note is a summary of a decision that is actually visible in a repository — a README
 * statement or an architectural choice in the code. Nothing here is an invented article, and
 * no note claims production experience that cannot be evidenced.
 *
 * `source` names the repository the note is derived from so a reviewer can verify it.
 */

export const NOTES = [
  {
    id: "provider-agnostic-agents",
    title: "Provider-agnostic coding agents",
    body: "Binding an agent to one model provider means every provider change becomes a rewrite. MyPI resolves a backend through a provider registry (Groq, Vercel AI Gateway, Anthropic SDK, OpenAI-compatible), so adding a backend is a registration step rather than a change to the agent loop.",
    source: "MyPI — src/providers/*, src/index.ts",
    systems: ["mypi"],
  },
  {
    id: "normalising-tool-calls",
    title: "Normalising tool calls across providers",
    body: "Tool-calling schemas differ between providers. MyPI keeps a single tool registry (read, write, edit, delete, list, stats, find, search, grep, bash) and maps it per provider, so the loop has one contract to satisfy regardless of which model is answering.",
    source: "MyPI — src/tools/index.ts",
    systems: ["mypi"],
  },
  {
    id: "bounded-agent-loops",
    title: "Bounding an agent loop",
    body: "An agent loop that can keep requesting tools is an unbounded cost. Two limits apply: the turn budget (20 by default) and per-tool output caps — 2000 lines / 50KB for shell, 200 and 100 results for search and grep. A large tool result is truncated rather than allowed to consume the whole context.",
    source: "MyPI — src/agent/loop.ts",
    systems: ["mypi"],
  },
  {
    id: "deterministic-verdicts",
    title: "Separating probabilistic interpretation from deterministic decisions",
    body: "In Studio Lead Automation the model extracts typed fields from a free-text inquiry; it does not decide whether the lead qualifies. That decision is scored by deterministic Python rules (budget, deadline, project type, contact details) with visible thresholds. The same email always produces the same verdict, and the rule is readable by someone who does not write Python.",
    source: "Studio Lead Automation — README qualification rules",
    systems: ["studio-lead-automation"],
  },
  {
    id: "hybrid-retrieval",
    title: "Why hybrid retrieval beats embedding-only search",
    body: "Engram fuses dense and sparse results with RRF instead of relying on embeddings alone. Dense retrieval handles paraphrase; sparse (BM25) handles exact terms. Storing temporal metadata alongside each memory makes time-aware questions answerable, which pure similarity search cannot do.",
    source: "Engram — packages/providers, packages/retrieval",
    systems: ["engram"],
  },
  {
    id: "context-budgeting",
    title: "Context budgeting and artifact parking",
    body: "Engram treats context as a budget. Large tool outputs are parked as restorable artifacts and inlined only on demand, so they stay available without paying their token cost on every turn of the conversation.",
    source: "Engram — artifact mechanism",
    systems: ["engram"],
  },
  {
    id: "distribution-shift",
    title: "Measuring a model under distribution shift",
    body: "The industrial vision platform reports clean-set accuracy (99.72%) and drifted-set accuracy (58.60–62.94%) side by side rather than only the headline number, and uses embedding drift distance as an early signal that the input distribution has moved — visible before accuracy has had time to fall.",
    source: "industrial-ai-vision-platform — README results",
    systems: ["industrial-ai-vision"],
  },
  {
    id: "guarded-generation",
    title: "Refusing to answer is a valid outcome",
    body: "SentinelRAG classifies the domain, audits what was actually retrieved, and applies a domain-specific confidence threshold before generating. The thresholds differ by domain because the cost of a wrong answer does not. Failed retrievals and traces are persisted so each bad answer informs the next iteration.",
    source: "auto-rag-guardrail — SentinelRAG agent chain",
    systems: ["sentinelrag"],
  },
  {
    id: "controlling-for-the-baseline",
    title: "Holding the comparison constant",
    body: "GraphRAG Benchmark runs the same question set and corpus through LLM-only, basic RAG and GraphRAG pipelines, so the pipeline is the only variable. Cost and token usage are measured alongside accuracy, because an accuracy gain has to be reported with what it costs.",
    source: "graphrag-benchmark — README",
    systems: ["graphrag-benchmark"],
  },
  {
    id: "structure-before-pixels",
    title: "Capturing structure, not pixels",
    body: "RepliUI loads a page in Playwright at two widths (1440×900 and 390×844) and reduces the captured DOM and visual signals to a typed WebsiteSpec before generating. The model works from structure rather than a screenshot, and the self-repair loop is capped at three attempts so a stuck case terminates instead of looping.",
    source: "RepliUI — README",
    systems: ["replui"],
  },
  {
    id: "decoupling-ingestion",
    title: "Decoupling ingestion from delivery",
    body: "The BSE Trades Dashboard pulls take up to 15 minutes, so nothing live can be built directly on the upstream feed. Ingestion runs as a BullMQ worker, persists to PostgreSQL, then publishes to Redis Pub/Sub; Socket.IO fans it out to the browser. Because the write happens before the publish, the live view and the stored history cannot disagree.",
    source: "BSE-Trades-Dashboard — README architecture",
    systems: ["bse-trades-dashboard"],
  },
  {
    id: "human-in-the-loop",
    title: "Approval before irreversible action",
    body: "SecureIntent Orchestrator interprets an email into a structured action plan and requires explicit approval before executing it. The interpretation is shown as a readable plan rather than acted on silently, so a misreading can be corrected before it costs anything.",
    source: "SecureIntent-Orchestrator — README",
    systems: ["secureintent-orchestrator"],
  },
  {
    id: "explainable-scores",
    title: "A score you cannot defend is not a product",
    body: "The fraud platform pairs every XGBoost risk score with a SHAP explanation, and tracks runs in MLflow. That makes the output contestable by the person being flagged and auditable later — and makes a model promotion decision reproducible from the run that produced the model.",
    source: "TransactionFraud-Risk-Platform — README",
    systems: ["transaction-fraud"],
  },
  {
    id: "honest-methodology",
    title: "Designing an experiment so the answer is worth having",
    body: "The NIFTY event study fixes its development/OOS split at a fixed date in advance and performs no threshold or holding-period optimization. With only 53 events (38 development, 15 OOS), that restraint is the point: it is what keeps the out-of-sample period genuinely held out.",
    source: "nifty-recovery-event-study — README",
    systems: ["nifty-event-study"],
  },
  {
    id: "client-side-when-possible",
    title: "Choosing not to add a backend",
    body: "Property Post Maker renders a 1080×1350 creative and exports it as a PNG entirely in the browser — no API, no database. For a task that is fundamentally a rendering problem, adding server infrastructure would be cost without benefit.",
    source: "property-post-maker — README",
    systems: ["property-post-maker"],
  },
  {
    id: "collab-persistence",
    title: "Real-time collaboration is a persistence problem",
    body: "VedLab persists each project rather than holding state only in memory, so a collaborator joining late still sees the full document. Real-time cursors and comments are a layer on top of that persisted state, not a replacement for it.",
    source: "vedlab — README",
    systems: ["vedlab"],
  },
];

/** The six notes surfaced on the homepage, chosen for role breadth. */
export const FEATURED_NOTE_IDS = [
  "provider-agnostic-agents",
  "deterministic-verdicts",
  "distribution-shift",
  "guarded-generation",
  "controlling-for-the-baseline",
  "decoupling-ingestion",
];

export const FEATURED_NOTES = FEATURED_NOTE_IDS.map(
  (id) => NOTES.find((note) => note.id === id),
).filter(Boolean);