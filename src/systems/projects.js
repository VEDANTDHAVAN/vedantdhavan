/**
 * Single source of truth for every system in the portfolio.
 *
 * ── Preservation contract ────────────────────────────────────────────────────────────────
 * Every field that existed on the original `projects` array in
 * `src/sections/ShowcaseSection.jsx` is carried over here under the SAME NAME and with the
 * SAME VALUE: `title`, `category`, `domain`, `href`, `demoUrl`, `image`, `imageClass`,
 * `featured`, `tech[]`, `description`. The legacy shape is re-exported verbatim from
 * `legacyProjects()` so nothing can silently drift.
 *
 * ── Evidence rules ───────────────────────────────────────────────────────────────────────
 * `systemIds` lists only layers that are evidenced by a README line, a named file or a
 * dependency in the repository. Unverifiable layers are omitted rather than guessed.
 * `evidence` carries the exact source for each claim. `unverified` is set when a link or
 * repository could not be reached, and those systems are never given system-layer claims.
 * No metric, contribution or achievement appears here unless it is quoted from a source.
 */

// ── Original 16 systems, preserved field-for-field ──────────────────────────────────────────

const PRESERVED = [
  {
    id: "vedlab",
    title: "VedLab",
    category: "Realtime",
    domain: "Real-time Collaboration / Design Systems",
    href: "https://github.com/VEDANTDHAVAN/vedlab",
    demoUrl: "https://vedlab.vercel.app",
    image: "/images/project1.png",
    imageClass: "",
    featured: true,
    tech: ["Realtime", "Collaboration", "Design Systems", "Full-Stack"],
    description:
      "A collaborative UI canvas inspired by Figma, built for real-time visual editing and multiplayer design workflows using modern full-stack tooling.",
    summary:
      "A real-time collaborative design canvas on the T3 stack, with live cursors, comments and persistent project data.",
    systemIds: ["interface", "api", "data"],
    roles: ["sde", "fde", "fullstack"],
    stage: "shipped",
    evidence: [
      "README: \"a real-time collaborative design canvas built with the T3 Stack\".",
      "README: \"support for live cursors, comments, drag-and-drop elements, and persistent project data\".",
      "README Tech Stack sections: Frameworks & Tools, Real-time Collaboration, Database & Backend, UI Primitives.",
    ],
    caseStudy: {
      problem:
        "Interface design work is single-player: feedback happens in screenshots, and two people cannot shape the same file at once.",
      contribution:
        "Built the collaborative canvas end to end — realtime session layer, canvas editor and persistent project storage.",
      design:
        "A T3-stack client holds the canvas state and renders live collaborators; a realtime channel keeps cursors, comments and element edits in sync; the database layer persists each project so a session can be resumed later.",
      decisions: [
        "Composing T3 (Next.js + tRPC + Prisma) keeps the type contract shared between client and server instead of hand-written REST types.",
        "Persisting every project rather than only in-memory state means a collaborator joining late still sees the full document.",
      ],
      challenges:
        "Multi-user editing means every change has to merge rather than overwrite, and the canvas has to stay responsive while remote updates arrive.",
      tech: ["Next.js (T3 Stack)", "tRPC", "Prisma", "Realtime collaboration", "UI primitives"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/vedlab" },
        { label: "Live demo", href: "https://vedlab.vercel.app" },
      ],
    },
  },
  {
    id: "fabric-fusion",
    title: "Fabric Fusion",
    category: "3D Web",
    domain: "E-commerce / 3D Product Customization",
    href: "https://github.com/VEDANTDHAVAN/ECOMMERCE_CLOTHING_STORE",
    image: "/images/project2.png",
    imageClass: "bg-[#47e6ff]",
    featured: false,
    tech: ["3D", "E-commerce", "Product Customization", "Full-Stack"],
    description:
      "An e-commerce clothing platform with a 3D shirt model for trying textures and designs, combining storefront flows with interactive product visualization.",
    summary:
      "A storefront with a 3D garment viewer, letting customers try textures and designs before buying.",
    systemIds: ["interface"],
    roles: ["sde", "fullstack"],
    stage: "shipped",
    evidence: [
      "Repository description: an e-commerce clothing store project.",
      "Original portfolio description: \"combining storefront flows with interactive product visualization\".",
      "Only the interface layer is claimed; no backend or data claim is evidenced.",
    ],
    caseStudy: {
      problem:
        "Textile and apparel products are hard to judge from flat photographs, so customers cannot tell how a fabric or print will actually look.",
      contribution: "Built the storefront and the interactive 3D product visualization.",
      design:
        "A product surface presents the item as an interactive 3D model; swapping texture or design updates the model in place instead of navigating to new images.",
      decisions: [
        "Rendering customization live in the product view keeps the decision loop inside one screen rather than sending the customer back to a gallery.",
      ],
      challenges:
        "Holding a smooth frame rate while loading heavier textures and designs.",
      tech: ["3D", "E-commerce", "Product Customization", "Full-Stack"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/ECOMMERCE_CLOTHING_STORE" }],
    },
  },
  {
    id: "healspace",
    title: "HealSpace",
    category: "Full-Stack",
    domain: "HealthTech / Booking Platform",
    href: "https://github.com/VEDANTDHAVAN/Therapy_Website",
    image: "/images/project3.png",
    imageClass: "bg-[#fc46ff]",
    featured: false,
    tech: ["HealthTech", "Booking", "Discovery", "Full-Stack"],
    description:
      "A therapy booking platform that connects people with nearby therapists. This belongs with full-stack product apps because its main domain is scheduling, discovery, and service booking.",
    summary:
      "A therapy discovery and booking platform matching people with nearby therapists.",
    systemIds: ["interface"],
    roles: ["sde", "fullstack"],
    stage: "shipped",
    evidence: [
      "Repository exists at VEDANTDHAVAN/Therapy_Website.",
      "The repository README is empty (verified: a zero-length file on both main and master), so only the original portfolio description is available.",
      "Only the interface layer is claimed, because the repository documents nothing further.",
    ],
    unverified: ["Repository README is empty — no backend, data or infrastructure claim can be verified."],
    caseStudy: {
      problem:
        "Finding a therapist is a search problem with a scheduling problem attached, and the current flow makes a person do both by hand.",
      contribution: "Built the discovery and booking experience.",
      design: "Discovery surfaces nearby therapists; a person chooses one and books a slot, so search and scheduling stay in one product.",
      decisions: [
        "Keeping discovery and booking in one product means a person does not re-enter their criteria after choosing a therapist.",
      ],
      challenges: "Keeping availability information consistent between what a person sees and what can actually be booked.",
      tech: ["HealthTech", "Booking", "Discovery", "Full-Stack"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/Therapy_Website" }],
    },
  },
  {
    id: "veddev",
    title: "VedDev",
    category: "AI",
    domain: "Generative AI / Website Builder",
    href: "https://github.com/VEDANTDHAVAN/AI-Website-Builder",
    demoUrl: "https://veddev.vercel.app",
    image: "/images/project10.png",
    imageClass: "",
    featured: true,
    tech: ["Generative AI", "Website Builder", "Preview", "Deployment"],
    description:
      "An AI website builder that turns natural-language prompts into launch-ready web experiences with preview and deployment-oriented workflows.",
    summary:
      "A prompt-to-site builder that produces a previewable, deployable web experience from natural language.",
    systemIds: ["interface", "llm"],
    roles: ["ai-engineer", "fde", "fullstack"],
    stage: "shipped",
    evidence: [
      "Repository description: \"AI-powered website builder that creates fully responsive, SEO-friendly websites from natural language prompts using GPT-4\".",
      "Live deployment at https://veddev.vercel.app.",
    ],
    caseStudy: {
      problem:
        "A generated page that cannot be previewed or deployed is a snippet, not a product — the gap is between generation and something shippable.",
      contribution: "Built the generation pipeline and the preview-to-deploy flow.",
      design:
        "A natural-language prompt drives generation; the result lands in a preview surface the user can iterate on; deployment takes the approved output forward.",
      decisions: [
        "Running preview and deployment as separate steps from generation means an unreviewed output is never the thing that goes live.",
      ],
      challenges: "Turning free-form generation into valid, deployable front-end code rather than prose.",
      tech: ["GPT-4", "Generative AI", "Website Builder", "Preview", "Deployment"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/AI-Website-Builder" },
        { label: "Live demo", href: "https://veddev.vercel.app" },
      ],
    },
  },
  {
    id: "omnigen",
    title: "Omnigen",
    category: "AI",
    domain: "Generative AI SaaS / Multi-modal Generation",
    href: "https://github.com/VEDANTDHAVAN/multimodelai-saas",
    demoUrl: "https://multimodelai-saas.vercel.app",
    image: "/images/project7.png",
    imageClass: "",
    featured: true,
    tech: ["Generative AI", "SaaS", "Multi-modal", "Auth"],
    description:
      "A production-style generative AI SaaS platform for text, image, and code generation with subscription, auth, storage, and support integrations.",
    summary:
      "A multi-modal generative AI SaaS — text, image and code generation behind subscription and auth.",
    systemIds: ["interface", "llm", "api", "data"],
    roles: ["ai-engineer", "fde", "fullstack"],
    stage: "shipped",
    evidence: [
      "Repository description: \"an all-in-one AI-Tools platform that unifies multiple generative AI capabilities under a single subscription\".",
      "Repository description: \"Conversation AI, Image Generation, and Code Generation\".",
      "Live deployment at https://multimodelai-saas.vercel.app.",
    ],
    caseStudy: {
      problem:
        "Generative capability is scattered across single-purpose tools with separate billing and separate history, so the useful unit is the subscription, not the model.",
      contribution: "Built the multi-modal generation surface, subscription and auth, and the support integrations.",
      design:
        "One account spans conversation, image and code generation; auth and subscription gate access; storage keeps a user's generations available across sessions.",
      decisions: [
        "Unifying three generation modes under one subscription treats the account as the product boundary rather than each model as its own app.",
        "Keeping storage behind auth means a returning user gets their own history instead of an anonymous session.",
      ],
      challenges: "Holding one consistent account and billing surface across three very different generation flows.",
      tech: ["Generative AI", "SaaS", "Multi-modal", "Auth", "Subscription"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/multimodelai-saas" },
        { label: "Live demo", href: "https://multimodelai-saas.vercel.app" },
      ],
    },
  },
  {
    id: "orchestrion",
    title: "Orchestrion",
    category: "AI",
    domain: "Agentic Workflow Orchestration",
    href: "https://github.com/VEDANTDHAVAN/Orchestrion",
    demoUrl: "https://orchestrion.vercel.app",
    image: "/images/project11.png",
    imageClass: "",
    featured: true,
    tech: ["Agentic AI", "Workflow", "Automation", "DevOps"],
    description:
      "An AI-powered workflow orchestration platform that combines code-level control with no-code execution speed for automating multi-step business and DevOps workflows.",
    summary:
      "Workflow orchestration that lets technical teams author flows in code and run them at no-code speed.",
    systemIds: ["interface", "orchestration", "llm", "tools"],
    roles: ["ai-engineer", "fde", "fullstack", "sde"],
    stage: "shipped",
    evidence: [
      "Repository description: \"a workflow automation platform that uniquely combines AI capabilities with business process automation, giving technical teams the flexibility of code with the speed of no-code\".",
      "Live deployment at https://orchestrion.vercel.app.",
    ],
    caseStudy: {
      problem:
        "Pure-code automation is fast to build and slow for anyone else to run; pure no-code automation is fast to run and loses the things that only code can express.",
      contribution: "Built the orchestration surface and the workflow execution model.",
      design:
        "Workflows are composed from steps that can be configured or written directly; an AI capability is available as a step inside the same flow rather than a separate product.",
      decisions: [
        "Putting AI capability inside a general workflow engine, instead of beside it, keeps one execution model for both deterministic and model-driven steps.",
      ],
      challenges: "Making a code-authored flow and a visually configured flow behave identically at execution time.",
      tech: ["Agentic AI", "Workflow", "Automation", "DevOps"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/Orchestrion" },
        { label: "Live demo", href: "https://orchestrion.vercel.app" },
      ],
    },
  },
  {
    id: "secureintent-orchestrator",
    title: "SecureIntent Orchestrator",
    category: "AI",
    domain: "AI Security / Human-in-the-loop Automation",
    href: "https://github.com/VEDANTDHAVAN/SecureIntent-Orchestrator",
    image: "/images/project14.png",
    imageClass: "bg-[#102a43]",
    featured: true,
    tech: ["AI Security", "Human-in-the-loop", "Automation", "Gmail"],
    description:
      "A Gmail-embedded AI automation platform that converts incoming communication into structured, explainable action plans users can approve, reject, or execute.",
    summary:
      "A Gmail-embedded, human-in-the-loop automation that turns incoming mail into an explainable action plan.",
    systemIds: ["interface", "orchestration", "llm"],
    roles: ["ai-engineer", "fde"],
    stage: "shipped",
    evidence: [
      "Repository description: \"a human-in-the-loop AI automation platform embedded directly into Gmail via a Chrome extension\".",
      "Repository description: \"transforms incoming communication into structured, explainable action\".",
    ],
    caseStudy: {
      problem:
        "Automating an inbox means acting on instructions that arrived over email, where acting on the wrong reading is expensive and hard to undo.",
      contribution: "Built the Gmail extension, the interpretation step and the approval workflow.",
      design:
        "The extension surfaces inside Gmail; incoming communication is interpreted into a structured action plan; the plan is explained back to the user, who approves, rejects or executes it.",
      decisions: [
        "Requiring explicit approval before execution keeps an irreversible action behind a human decision instead of behind a confidence score.",
        "Showing the interpretation as a readable plan, rather than acting silently, means the user can correct a misreading before it costs anything.",
      ],
      challenges: "Interpreting intent from unstructured email well enough that a human is willing to approve it.",
      tech: ["AI Security", "Human-in-the-loop", "Automation", "Gmail", "Chrome Extension"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/SecureIntent-Orchestrator" },
      ],
    },
  },
  {
    id: "agentic-code-review",
    title: "Agentic Code Review Assistant",
    category: "Developer Tools",
    domain: "Developer Tools / AI Security Review",
    href: "https://github.com/VEDANTDHAVAN/Agentic-Code-Review-Assistant",
    demoUrl: "https://agentic-code-review-assistant.vercel.app",
    image: "/images/project12.png",
    imageClass: "bg-[#1f2937]",
    featured: false,
    tech: ["Code Review", "AI Security", "Developer Tools", "Agents"],
    description:
      "An agentic code review tool for automated code-quality and security feedback, grouped here because it applies AI agents to secure developer workflows.",
    summary:
      "A multi-agent PR review pipeline that streams findings and posts only human-approved comments.",
    systemIds: ["interface", "orchestration", "llm", "api", "data", "infra"],
    roles: ["ai-engineer", "fde", "sde"],
    stage: "shipped",
    evidence: [
      "README: \"connects to GitHub, analyzes pull requests using specialized review agents, streams review progress in real time\".",
      "README: \"posts only human-approved review comments back to GitHub\".",
      "README agent pipeline: PRFetcherAgent, ContextBuilderAgent, SecurityReviewAgent, BugDetectionAgent, PerformanceReviewAgent, CodeSmellAgent, SummaryAgent.",
      "README: Clerk authentication, GitHub OAuth via Clerk, FastAPI backend, SSE streaming.",
      "README: Storage Layer — SQLite for development, PostgreSQL for production; SQLAlchemy + Alembic.",
      "README: backend Dockerfile, render.yaml, .github/workflows/ci.yml, DEPLOYMENT.md.",
      "Note: the repository README of PRismAI is byte-identical to this one (verified by SHA-256), so PRismAI is the same system and is not listed separately.",
    ],
    caseStudy: {
      problem:
        "Pull request review is slow and inconsistent, and the findings that matter most — security and performance regressions — are exactly the ones reviewers reach last.",
      contribution: "Built the review agent pipeline, the streaming review workspace and the approval-before-post flow.",
      design:
        "A fetcher agent pulls the pull request, a context builder assembles what the reviewers need, specialised review agents examine the diff, a summary agent consolidates, and progress streams to the workspace over SSE; only approved comments reach GitHub.",
      decisions: [
        "Splitting review into specialised agents means each lens has its own instructions and can be improved without touching the others.",
        "Keeping a human in the loop before posting means the tool cannot flood a repository with unreviewed machine comments.",
        "Streaming over SSE instead of waiting for a single response lets a reviewer start reading before the slowest agent finishes.",
      ],
      challenges:
        "Different reviewers need different amounts of the diff; the context builder has to supply that without overloading the model.",
      tech: ["Next.js", "FastAPI", "Clerk", "GitHub OAuth", "SSE", "SQLAlchemy", "Alembic", "PostgreSQL", "SQLite", "Docker", "Render", "Vercel", "OpenAI", "OpenRouter"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/Agentic-Code-Review-Assistant" },
        { label: "Live demo", href: "https://agentic-code-review-assistant.vercel.app" },
      ],
    },
  },
  {
    id: "graphrag-benchmark",
    title: "GraphRAG Benchmark",
    category: "Machine Learning",
    domain: "GenAI Evaluation / Graph Retrieval",
    href: "https://github.com/VEDANTDHAVAN/graphrag-benchmark",
    demoUrl: "https://graphrag-benchmark.vercel.app",
    image: "/images/project13.png",
    imageClass: "bg-[#0f172a]",
    featured: true,
    tech: ["GraphRAG", "RAG", "Evaluation", "Retrieval"],
    description:
      "A benchmark comparing LLM-only, basic RAG, and GraphRAG pipelines across retrieval quality, latency, token usage, cost, and answer accuracy.",
    summary:
      "A controlled benchmark of LLM-only vs. basic RAG vs. GraphRAG pipelines across a 2M-token scientific-paper corpus.",
    systemIds: ["interface", "retrieval", "llm", "data", "api"],
    roles: ["ai-engineer", "ml-engineer", "fde"],
    stage: "shipped",
    evidence: [
      "Repository description: \"2M-token benchmark comparing LLM-only, Basic RAG, and NetworkX-based GraphRAG with scientific papers, accuracy evaluation, and interactive dashboard\".",
      "README: the benchmark compares retrieval quality, latency, token usage, cost and answer accuracy across three pipelines.",
      "Live deployment at https://graphrag-benchmark.vercel.app.",
    ],
    caseStudy: {
      problem:
        "GraphRAG is widely recommended and rarely measured. Without a controlled comparison there is no basis for deciding when the extra machinery is worth its cost.",
      contribution: "Built the three-pipeline benchmark harness and the results dashboard.",
      design:
        "One question set runs through three pipelines — LLM-only, basic RAG and a NetworkX-based GraphRAG — and every run records retrieval quality, latency, token usage, cost and answer accuracy; a dashboard presents the comparison.",
      decisions: [
        "Holding the question set and corpus fixed across all three pipelines isolates the pipeline as the only variable.",
        "Measuring cost and token usage alongside accuracy means the comparison shows what an accuracy gain actually costs.",
      ],
      challenges:
        "Keeping retrieval quality, latency, token usage, cost and answer accuracy comparable across pipelines with different internal shapes.",
      tech: ["GraphRAG", "RAG", "Evaluation", "Retrieval", "NetworkX", "Python"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/graphrag-benchmark" },
        { label: "Live demo", href: "https://graphrag-benchmark.vercel.app" },
      ],
    },
  },
  {
    id: "prompt-ops-dashboard",
    title: "Prompt Ops Mini Dashboard",
    category: "AI",
    domain: "AI Model Comparison / Evaluation Dashboard",
    href: "https://github.com/VEDANTDHAVAN/prompt-ops-mini-dashboard",
    demoUrl: "https://prompt-ops-mini-dashboard.vercel.app",
    image: "/images/project15.png",
    imageClass: "bg-[#312e81]",
    featured: false,
    tech: ["AI Evaluation", "Model Comparison", "Dashboard", "Prompt Ops"],
    description:
      "A lightweight dashboard for comparing model and prompt outputs, making it a better fit for AI evaluation and model comparison than agentic AI.",
    summary:
      "A lightweight dashboard for side-by-side model and prompt output comparison.",
    systemIds: ["interface"],
    roles: ["ai-engineer"],
    stage: "shipped",
    evidence: [
      "Repository exists with a 4938-byte README describing an AI evaluation dashboard.",
      "Original portfolio description: \"A lightweight dashboard for comparing model and prompt outputs\".",
    ],
    caseStudy: {
      problem:
        "Choosing between models and prompt variants by intuition makes the choice unrepeatable and hard to justify to anyone else.",
      contribution: "Built the comparison dashboard.",
      design:
        "Outputs from different models and prompt variants are shown side by side in one lightweight surface so the comparison happens in a single view.",
      decisions: [
        "Keeping it deliberately lightweight means the comparison stays fast enough to run during development instead of becoming a separate evaluation project.",
      ],
      challenges: "Presenting several outputs in a way that makes differences legible without turning into a dense analysis tool.",
      tech: ["AI Evaluation", "Model Comparison", "Dashboard", "Prompt Ops"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/prompt-ops-mini-dashboard" },
        { label: "Live demo", href: "https://prompt-ops-mini-dashboard.vercel.app" },
      ],
    },
  },
  {
    id: "contextai",
    title: "ContextAI",
    category: "AI",
    domain: "Retrieval-Augmented Generation / Chatbot",
    href: "https://github.com/VEDANTDHAVAN/RAG_CHATBOT",
    image: "/images/project5.png",
    imageClass: "bg-[#8aff47]",
    featured: false,
    tech: ["RAG", "Chatbot", "Retrieval", "Product Reviews"],
    description:
      "A RAG chatbot for contextual product-review analysis. It belongs in retrieval systems because the core work is grounding responses in relevant retrieved context.",
    summary:
      "A RAG chatbot grounding answers in retrieved product-review context, with multi-chat sessions and streamed responses.",
    systemIds: ["interface", "retrieval", "llm"],
    roles: ["ai-engineer", "fullstack"],
    stage: "shipped",
    evidence: [
      "README: \"an advanced RAG (Retrieval-Augmented Generation) Chatbot built with Next.js and AI SDK\".",
      "README features: multiple chats, \"Real-Time Message Update\" stored and retrieved via localStorage, streaming AI responses via @ai-sdk/react.",
      "README features: \"RAG-Powered Intelligence: Integrates vector-based retrieval with generation to give contextual answers\".",
      "README Tech Stack: React (Next.js), @ai-sdk/react, localStorage for persistent sessions, RAG architecture.",
      "README Live Demo: \"Coming Soon!\" — the demo URL on the original portfolio is a placeholder in the source repository.",
    ],
    caseStudy: {
      problem:
        "A product-review question needs evidence from many reviews at once; answering from the model alone produces confident text with nothing behind it.",
      contribution: "Built the RAG chat surface, multi-session handling and streamed responses.",
      design:
        "A review query is answered by retrieving relevant review context and generating from it; chat sessions are created, switched and deleted, with messages persisted in localStorage; responses stream in via the AI SDK.",
      decisions: [
        "Persisting sessions in localStorage keeps the chat usable without a server round trip on every message.",
        "Retrieving before generating, rather than asking the model to recall reviews, is what grounds the answer in evidence.",
      ],
      challenges: "Keeping retrieved context relevant enough that the generated answer actually uses it.",
      tech: ["Next.js", "AI SDK", "React", "RAG", "Vector retrieval", "localStorage"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/RAG_CHATBOT" },
      ],
    },
  },
  {
    id: "consumer-sentiment",
    title: "Consumer Sentiment Analysis",
    category: "Machine Learning",
    domain: "NLP / Sentiment Classification",
    href: "https://github.com/VEDANTDHAVAN/Consumer_Sentiment_Analysis",
    image: "/images/project4.jpg",
    imageClass: "bg-[#2531b0]",
    featured: false,
    tech: ["NLP", "Sentiment", "Classification", "Reviews"],
    description:
      "A sentiment-analysis system for Amazon product reviews, covering single reviews, CSV-based batch analysis, and review-driven machine learning workflows.",
    summary:
      "An NLP sentiment classifier over Amazon reviews, exposed through a Streamlit app for single, CSV and URL-driven review analysis.",
    systemIds: ["interface", "retrieval", "data"],
    roles: ["ml-engineer", "ai-engineer"],
    stage: "shipped",
    evidence: [
      "README: \"a Streamlit app capable of analyzing sentiments in various scenarios, including single-line reviews, multiple reviews from CSV files, and product reviews from Amazon URLs\".",
      "README dataset: \"the Amazon reviews full score dataset is constructed by randomly taking 6,00,000 training samples and 1,30,000 testing samples for each review score from 1 to 5. In total there are 30,00,000 training samples and 6,50,000 testing samples\".",
      "README project structure: notebooks/ (EDA and model development), test files/, .streamlit/, models.p (serialized models), review_analyzer.py (Streamlit app), reviewscrapper.py (scraping scripts).",
    ],
    caseStudy: {
      problem:
        "Sentiment that only works on a hand-typed sentence is not usable on real review volume, which arrives as CSV exports and scraped product pages.",
      contribution: "Built the training and evaluation notebooks and the Streamlit analysis app.",
      design:
        "Serialized models (`models.p`) back an interactive analysis surface that handles three input modes — a single review, a CSV batch, and reviews scraped from a product URL; notebooks hold the exploratory and model-development work.",
      decisions: [
        "Shipping three input modes rather than one makes the classifier usable both interactively and in batch, which is the actual shape of review data.",
      ],
      challenges:
        "Handling review text of variable length and noisy content while keeping the classifier usable across all three input modes.",
      evidence: [
        "Dataset documented in the README: 6,00,000 training and 1,30,000 testing samples per review score from 1 to 5; 30,00,000 training and 6,50,000 testing samples in total.",
      ],
      tech: ["Python", "NLP", "Streamlit", "Jupyter", "Serialized models", "Web scraping"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/Consumer_Sentiment_Analysis" },
      ],
    },
  },
  {
    id: "audio-cnn-visualizer",
    title: "Audio CNN Visualizer",
    category: "Machine Learning",
    domain: "Deep Learning / Audio Classification",
    href: "https://github.com/VEDANTDHAVAN/Convolutional_Neural_Network_for_Audio",
    image: "/images/project9.png",
    imageClass: "bg-[#0c0c1a]",
    featured: false,
    tech: ["Deep Learning", "CNN", "Audio", "Visualization"],
    description:
      "A full pipeline for training, deploying, and visualizing predictions from a convolutional neural network trained on environmental sound classification.",
    summary:
      "An ESC-50 audio CNN trained and served on Modal, with a Next.js surface that visualizes predictions.",
    systemIds: ["interface", "api", "data"],
    roles: ["ml-engineer", "fullstack", "fde"],
    stage: "shipped",
    evidence: [
      "README: \"a complete pipeline for training, deploying, and visualizing predictions of a Convolutional Neural Network (CNN) trained on environmental sound classification using the ESC-50 dataset\".",
      "README: \"a backend powered by PyTorch + Modal and a frontend built with Next.js + TailwindCSS\".",
      "README feature: \"Deploy the model with GPU support using Modal\"; project structure names an audio-cnn-visual frontend on the T3 stack; sections cover model details, visualization, volumes and deployment.",
    ],
    caseStudy: {
      problem:
        "An audio classifier that only returns a label hides what it actually heard, which makes it hard to tell a model error from a genuinely ambiguous recording.",
      contribution: "Built the training and serving backend and the prediction-visualization frontend.",
      design:
        "A PyTorch model is trained on ESC-50 and deployed on Modal with GPU support; a Next.js frontend sends audio and renders the prediction together with the model's internal signals.",
      decisions: [
        "Deploying to Modal with GPU support moves GPU provisioning off the critical path, so the model is served without maintaining GPU infrastructure.",
        "Splitting training/serving (Python + Modal) from visualization (Next.js) lets each side use the tool it suits.",
      ],
      challenges:
        "Serving a trained audio model behind an endpoint that a browser client can call without holding GPU capacity between requests.",
      tech: ["PyTorch", "Modal", "Next.js", "TailwindCSS", "T3 Stack", "ESC-50"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/Convolutional_Neural_Network_for_Audio" },
      ],
    },
  },
  {
    id: "web-scraper-cli",
    title: "Web Scraper CLI Tool",
    category: "Developer Tools",
    domain: "Data Engineering / Extraction Tooling",
    href: "https://github.com/VEDANTDHAVAN/WEB_SCRAPER_TOOL",
    image: "/images/project8.png",
    imageClass: "bg-[#abfcff]",
    featured: false,
    tech: ["Data Engineering", "CLI", "Extraction", "Dashboard"],
    description:
      "A modular scraping utility for extracting structured text and metadata, with CLI and dashboard workflows for data collection and analysis pipelines.",
    summary:
      "A modular scraping utility extracting structured text and metadata, with CLI and dashboard workflows.",
    systemIds: ["tools", "api"],
    roles: ["sde", "fde"],
    stage: "shipped",
    evidence: [
      "Repository exists at VEDANTDHAVAN/WEB_SCRAPER_TOOL but has no README, so only the original portfolio description is available.",
      "The interface/tooling layers are claimed from the original description; no data or infrastructure claim is made.",
    ],
    unverified: ["The repository has no README — backend, data and infrastructure layers cannot be verified."],
    caseStudy: {
      problem:
        "Data collection scripts are usually written once for one site and cannot be reused, so each new source repeats the same parsing work.",
      contribution: "Built the modular scraping utility and its CLI and dashboard workflows.",
      design:
        "A modular extraction utility produces structured text and metadata; the same capability is reachable from a CLI for pipeline use and from a dashboard for inspection.",
      decisions: [
        "Modularising the extractor means a new source is a new module rather than a fork of the whole tool.",
      ],
      challenges:
        "Keeping extraction stable against markup changes without rewriting the surrounding pipeline each time.",
      tech: ["Data Engineering", "CLI", "Extraction", "Dashboard", "Python"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/WEB_SCRAPER_TOOL" },
      ],
    },
  },
  {
    id: "transaction-fraud",
    title: "Transaction Fraud Risk Platform",
    category: "Machine Learning",
    domain: "FinTech / Fraud Detection",
    href: "https://github.com/VEDANTDHAVAN/TransactionFraud-Risk-Platform",
    demoUrl: "https://transactionfraud-risk-detection.streamlit.app/",
    image: "/images/project16.png",
    imageClass: "bg-[#312e81]",
    featured: true,
    tech: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SHAP", "FastAPI", "Streamlit", "Docker", "MLflow"],
    description:
      "End-to-end fraud detection platform that predicts transaction risk using XGBoost, advanced feature engineering, SHAP explainability, FastAPI model serving, Streamlit dashboard, Docker deployment, and MLflow experiment tracking.",
    summary:
      "An end-to-end fraud detection platform: XGBoost risk scoring with SHAP explanations, served over FastAPI and tracked in MLflow.",
    systemIds: ["interface", "retrieval", "data", "api", "infra"],
    roles: ["ml-engineer", "ai-engineer", "fde", "sde"],
    stage: "shipped",
    evidence: [
      "Repository description: \"End-to-end Transaction Fraud Detection Platform with XGBoost, SHAP explainability, FastAPI, Streamlit, Docker, and MLflow for production-grade ML\".",
      "Live deployment at https://transactionfraud-risk-detection.streamlit.app/.",
    ],
    caseStudy: {
      problem:
        "Fraud review needs both a risk score and a reason, because a score alone cannot be contested by the person being flagged and cannot be audited later.",
      contribution: "Built the end-to-end platform — feature engineering, XGBoost model, SHAP explainability, serving and tracking.",
      design:
        "Engineered features feed an XGBoost model that scores transaction risk; SHAP supplies a per-prediction explanation; a FastAPI service serves the model; a Streamlit dashboard consumes it; MLflow tracks experiments; Docker carries the deployment.",
      decisions: [
        "Pairing every score with a SHAP explanation means the output can be defended, not just produced.",
        "Tracking experiments in MLflow makes a model promotion decision reproducible from the run that produced the model.",
        "Separating serving (FastAPI) from the review surface (Streamlit) keeps inference reusable outside the dashboard.",
      ],
      challenges:
        "Balancing detection against false positives on a heavily imbalanced class distribution, and keeping the explanation faithful to what the model actually used.",
      tech: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SHAP", "FastAPI", "Streamlit", "Docker", "MLflow"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/TransactionFraud-Risk-Platform" },
        { label: "Live demo", href: "https://transactionfraud-risk-detection.streamlit.app/" },
      ],
    },
  },
];

// ── Systems added from verified repository evidence ────────────────────────────────────────

const ADDED = [
  {
    id: "mypi",
    title: "MyPI",
    category: "AI",
    domain: "Agent Tooling / Coding Agents",
    href: "https://github.com/VEDANTDHAVAN/MyPI",
    image: "/images/secureintent-preview.png",
    imageClass: "",
    featured: false,
    tech: ["TypeScript", "Agent Loop", "Tool Calling", "Provider Abstraction"],
    description:
      "A provider-agnostic coding agent CLI that streams a prompt to an LLM, lets it call filesystem and shell tools, and loops until the model stops requesting tools.",
    summary:
      "A provider-agnostic coding-agent CLI with a bounded tool-calling loop across multiple model providers.",
    systemIds: ["llm", "orchestration", "tools"],
    roles: ["ai-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: a provider-agnostic coding-agent CLI that streams a prompt to an LLM, lets it call filesystem and shell tools, and repeats until the model stops asking for tools.",
      "README: providers include Groq, Vercel AI Gateway, Anthropic SDK and an OpenAI-compatible client.",
      "README: the agent loop lives in `src/agent/loop.ts` (`runAgent`), with tools registered in `src/tools/index.ts`.",
      "README: max turns defaults to 20 (`src/agent/loop.ts:28`); shell output is capped at 2000 lines / 50KB; search and grep cap at 200 and 100 results respectively.",
    ],
    caseStudy: {
      problem:
        "Coding agents usually bind to one model provider, so swapping providers means rewriting the client layer.",
      contribution: "Built the provider abstraction, the bounded agent loop and the tool registry.",
      design:
        "A provider registry resolves a model backend; the agent loop streams a prompt, executes the tools the model requests, feeds results back and repeats until the model stops requesting tools or the turn budget is exhausted.",
      decisions: [
        "A turn budget (20 by default) prevents an agent loop from running unbounded.",
        "Capping tool output — 2000 lines / 50KB for shell, 200 and 100 results for search and grep — keeps a large result from consuming the whole context.",
        "Normalising providers behind one registry means adding a backend is a registration step, not a rewrite.",
      ],
      challenges:
        "Keeping the loop terminating and the context bounded when a model keeps requesting tools.",
      tech: ["TypeScript", "Node.js 20+", "Groq", "Vercel AI Gateway", "Anthropic SDK", "OpenAI-compatible API", "ESM"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/MyPI" }],
    },
  },
  {
    id: "recall-tabs",
    title: "RecallTabs",
    category: "AI",
    domain: "Retrieval Systems / Browser Memory",
    href: "https://github.com/VEDANTDHAVAN/RecallTabs",
    image: "/images/project13.png",
    imageClass: "",
    featured: false,
    tech: ["RAG", "pgvector", "FastAPI", "Chrome Extension"],
    description:
      "An AI-powered browser-memory platform that turns saved tabs into a searchable, conversational knowledge base through a Chrome extension, a FastAPI backend and pgvector-backed semantic retrieval.",
    summary:
      "A browser-memory platform: a Chrome extension captures tabs, a FastAPI service indexes them, and pgvector retrieval answers questions over saved context.",
    systemIds: ["interface", "llm", "retrieval", "api", "data"],
    roles: ["ai-engineer", "fullstack", "sde", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: an AI-powered browser memory platform that turns saved tabs into a searchable, conversational knowledge base.",
      "README: the monorepo contains a Chrome extension (React/TypeScript/Vite/CRXJS, Manifest V3) and a web app, plus a FastAPI service (uvicorn app.main:app).",
      "README: PostgreSQL with pgvector via Supabase, with SQLAlchemy and Alembic migrations.",
      "README: semantic memory, embeddings and retrieval power the conversational answer path.",
    ],
    caseStudy: {
      problem:
        "Tabs saved for later are effectively lost: the page is still open somewhere, but nothing connects them, so nothing can be recalled across them.",
      contribution: "Built the Chrome extension capture path, the FastAPI indexing and retrieval service and the conversational query surface.",
      design:
        "The extension captures tabs into a knowledge base; the FastAPI service extracts and embeds the content; PostgreSQL with pgvector stores it; a query retrieves semantically similar context and answers over it.",
      decisions: [
        "Capturing at save time rather than at read time means the searchable record is the page as the user chose to keep it.",
        "pgvector keeps embeddings and structured records in one store instead of splitting retrieval across two systems.",
      ],
      challenges:
        "Keeping retrieval useful as the saved set grows and starts containing near-duplicate pages.",
      tech: ["pnpm + Turborepo", "FastAPI", "SQLAlchemy", "Alembic", "Pydantic", "PostgreSQL", "pgvector", "Supabase", "React", "TypeScript", "Vite", "CRXJS", "Manifest V3", "Next.js", "OpenAI", "Clerk"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/RecallTabs" }],
    },
  },
  {
    id: "industrial-ai-vision",
    title: "Industrial AI Vision Platform",
    category: "Machine Learning",
    domain: "Computer Vision / Manufacturing Inspection",
    href: "https://github.com/VEDANTDHAVAN/industrial-ai-vision-platform",
    image: "/images/project16.png",
    imageClass: "",
    featured: false,
    tech: ["Computer Vision", "PyTorch", "FastAPI", "MLflow"],
    description:
      "An end-to-end computer-vision platform for automated casting defect detection covering training, Grad-CAM explainability, embedding-based drift detection, MLflow tracking and a FastAPI inference API.",
    summary:
      "A casting defect-detection platform measuring its own drift: clean-set accuracy, drifted-set accuracy, and Grad-CAM explanations, all in MLflow.",
    systemIds: ["interface", "retrieval", "data", "api"],
    roles: ["ml-engineer", "ai-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: an end-to-end computer vision system for automated casting defect detection, with training, Grad-CAM explainability, drift detection, MLflow tracking and a FastAPI inference API.",
      "README stacks: PyTorch, TorchVision, FastAPI, MLflow, Pandas, NumPy, Scikit-Learn, OpenCV, Matplotlib.",
      "README reports 5306 training and 715 test images at 224 × 224, and an embedding drift distance of 19.288.",
      "README results for the best clean run: accuracy 99.72%, precision 100.00%, recall 99.56%, F1 99.78%.",
      "README results under drift: accuracy drops to 58.60–62.94% depending on iteration, with an accuracy gap of 37.34%.",
      "README monitoring: total predictions 20, average confidence 0.7297, manual review rate 100%.",
      "README also states the project is \"approximately 80% complete\".",
    ],
    caseStudy: {
      problem:
        "A defect classifier that scores well on its own test set tells you nothing about the day the factory changes lighting, material or supplier — and that is the day it matters.",
      contribution: "Built the training and evaluation pipeline, the drift measurement, the inference API and the monitoring instrumentation.",
      design:
        "A PyTorch model is trained on casting images; Grad-CAM and embedding statistics characterise the input distribution; MLflow tracks runs and the model registry; a FastAPI service serves inference; monitoring compares live predictions against the clean baseline.",
      decisions: [
        "Measuring accuracy under drift explicitly, rather than only reporting clean-set metrics, exposes how much of the headline number depends on the input distribution holding.",
        "Using embedding drift distance as the detector means a distribution change is visible before accuracy has had time to fall.",
        "Monitoring average confidence alongside manual review rate means the operational cost of the drifted model is visible as a number, not an impression.",
      ],
      challenges:
        "Holding a high clean-set score while honestly reporting the collapse under drift, and turning that gap into a monitorable signal rather than a footnote.",
      evidence: [
        "README: 5306 training images, 715 test images, 224 × 224 input, embedding drift distance 19.288.",
        "README clean-set metrics: accuracy 99.72%, precision 100.00%, recall 99.56%, F1 99.78%.",
        "README drifted-set metrics across iterations: accuracy 60.56%, 62.38%, 62.94%, 58.60%.",
        "README monitoring: total predictions 20, average confidence 0.7297, manual review rate 100%, accuracy gap 37.34%.",
        "README states the project is approximately 80% complete.",
      ],
      tech: ["Python", "PyTorch", "TorchVision", "FastAPI", "MLflow", "Pandas", "NumPy", "Scikit-Learn", "OpenCV", "Matplotlib"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/industrial-ai-vision-platform" },
      ],
    },
  },
  {
    id: "studio-lead-automation",
    title: "Studio Lead Automation",
    category: "AI",
    domain: "Workflow Automation / Lead Qualification",
    href: "https://github.com/VEDANTDHAVAN/Studio-Lead-Automation",
    image: "/images/project3.png",
    imageClass: "",
    featured: false,
    tech: ["FastAPI", "Groq", "Pydantic", "Docker"],
    description:
      "An AI-powered lead-intake automation that converts unstructured client inquiry emails into structured business data, qualifies leads with deterministic rules, and logs the result to Google Sheets and Slack.",
    summary:
      "Lead intake where the LLM extracts and the rules decide — structured records to Sheets, notification to Slack, follow-up email drafted.",
    systemIds: ["api", "llm", "tools"],
    roles: ["ai-engineer", "fde", "sde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: an AI-powered lead-intake automation that transforms unstructured client inquiry emails into structured business data.",
      "README: leads are qualified with deterministic Python rules; the result is logged to Google Sheets and Slack is notified.",
      "README stacks: FastAPI, Groq LLM, Pydantic v2, Google Sheets API, Slack webhooks, Python 3.12, Uvicorn, OpenAI Python SDK, GPT OSS 20B, pytest, Docker.",
      "README attributes the project: \"Author: Vedant Dhavan — Backend Developer | AI & Automation Enthusiast\".",
      "README qualification rules: Budget ≥ $10,000 → 40; Budget ≥ $5,000 → 20; Deadline Provided → 20; Project Type Provided → 20; Contact Name → 10; Contact Email → 10; thresholds 80+ Qualified, 50–79 Needs Review, Below 50 Declined.",
      "README test result: \"6 passed in 5.63s\".",
    ],
    caseStudy: {
      problem:
        "Lead intake is unstructured input — free-text email — being treated as a structured decision. Asking a model for the verdict makes the verdict unreproducible.",
      contribution: "Built the FastAPI intake service, the LLM extraction step, the deterministic qualification rules, and the Sheets/Slack integrations.",
      design:
        "An inquiry email is parsed into typed fields by the model under a Pydantic schema; a deterministic Python rule set scores the lead; the record is logged to Google Sheets, Slack is notified, and a follow-up email is generated.",
      decisions: [
        "Keeping the verdict in deterministic code and using the model only for extraction means the same email always produces the same qualification, and the rule is readable by a non-engineer.",
        "Scoring fields separately rather than emitting a single verdict from the model makes each factor auditable on its own.",
      ],
      challenges:
        "Making model output conform to a schema reliably enough that the downstream rule set can treat it as trusted input.",
      evidence: [
        "README attributes the project to a single author: Vedant Dhavan, Backend Developer | AI & Automation Enthusiast.",
        "README scoring rules: Budget ≥ $10,000 → 40; Budget ≥ $5,000 → 20; Deadline Provided → 20; Project Type Provided → 20; Contact Name → 10; Contact Email → 10.",
        "README thresholds: 80+ Qualified, 50–79 Needs Review, Below 50 Declined. README test result: 6 passed in 5.63s.",
      ],
      tech: ["FastAPI", "Groq", "Pydantic v2", "Google Sheets API", "Slack", "Python 3.12", "Uvicorn", "GPT OSS 20B", "pytest", "Docker"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/Studio-Lead-Automation" },
      ],
    },
  },
  {
    id: "engram",
    title: "Engram",
    category: "AI",
    domain: "Agent Memory Infrastructure",
    href: "https://github.com/VEDANTDHAVAN/Engram",
    image: "/images/project5.png",
    imageClass: "",
    featured: false,
    tech: ["Hybrid Retrieval", "RRF", "SQLAlchemy", "LLM Memory"],
    description:
      "Temporal memory infrastructure for AI agents combining vector and sparse retrieval with RRF fusion, context-budget management, and restorable artifacts for large tool outputs.",
    summary:
      "Temporal agent memory with hybrid vector + BM25 retrieval fused by RRF, plus context budgeting and artifact parking.",
    systemIds: ["retrieval", "data", "llm", "tools"],
    roles: ["ai-engineer", "ml-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: temporal memory infrastructure for AI agents — stores memories with temporal metadata and retrieves via a decision-driven hybrid pipeline.",
      "README: hybrid pipeline = vector (TurboVec) + sparse (BM25) fused with RRF.",
      "README: manages context budgets and parks large tool outputs as restorable artifacts.",
      "README stacks: SQLAlchemy, TurboVec, BM25, RRF, Groq, PostgreSQL, pytest.",
      "README reports 15 realistic TaskFlow memories in the demo and a full suite result of 234 passed.",
      "README includes a comparison of memory-question correctness and average context tokens against a baseline, reported per question category.",
    ],
    caseStudy: {
      problem:
        "An agent's memory has to answer two different questions — what is relevant now, and what was true before — but a plain vector store answers neither well, and dumping raw tool output into context destroys the budget.",
      contribution: "Built the memory store, the hybrid retrieval pipeline, the context-budget manager and the artifact mechanism.",
      design:
        "Memories are stored with temporal metadata; retrieval runs a decision-driven pipeline fusing dense (TurboVec) and sparse (BM25) results with RRF; a context-budget manager keeps the prompt within budget; oversized tool outputs are parked as artifacts that can be restored on demand rather than inlined.",
      decisions: [
        "Fusing dense and sparse results with RRF instead of choosing one avoids depending on embedding quality alone.",
        "Storing temporal metadata makes time-aware questions answerable, which a pure similarity store cannot do.",
        "Parking large tool outputs as restorable artifacts keeps them available without paying their token cost on every turn.",
      ],
      challenges:
        "Getting hybrid recall high enough to be useful while keeping the assembled context small enough to stay inside the budget.",
      evidence: [
        "README: 15 realistic TaskFlow memories in the demo; full test suite reported as 234 passed.",
        "README reports memory-question correctness improving across categories (memory questions, architecture consistency, temporal correctness, security consistency) alongside a reduction in average context tokens — figures as reported in the repository.",
      ],
      tech: ["Python", "SQLAlchemy", "TurboVec", "BM25", "RRF", "Groq", "PostgreSQL", "pytest"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/Engram" }],
    },
  },
  {
    id: "sentinelrag",
    title: "SentinelRAG",
    category: "AI",
    domain: "Retrieval Systems / Guardrails",
    href: "https://github.com/VEDANTDHAVAN/auto-rag-guardrail",
    image: "/images/project6.png",
    imageClass: "",
    featured: false,
    tech: ["RAG", "Qdrant", "Guardrails", "Streamlit"],
    description:
      "A multi-agent, evidence-first RAG system that guards against hallucination using persistent multimodal memory, domain-aware risk classification and confidence-based refusal.",
    summary:
      "An evidence-first RAG system that classifies domain risk, audits retrieval and refuses when evidence is insufficient.",
    systemIds: ["interface", "orchestration", "retrieval", "llm", "data"],
    roles: ["ai-engineer", "ml-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: \"SentinelRAG — a multi-agent, evidence-first RAG system that prevents hallucinations using persistent multimodal memory, domain-aware risk classification, and confidence-based guardrails\".",
      "README: refuses to answer when evidence is insufficient.",
      "README agent chain: DomainClassifier → RetrievalAuditAgent → GuardrailDecisionAgent → GeneratorAgent.",
      "README: Qdrant collections DOMAIN_EXAMPLES, RAG_DOCUMENTS, RETRIEVAL_TRACES and RAG_FAILURES; memory persists across sessions via Qdrant.",
      "README stacks: Streamlit, Qdrant, SentenceTransformers, CLIP, Docker.",
      "README lists per-domain confidence thresholds: health 0.70, political 0.68, finance 0.67, climate 0.65, science 0.62, ai_safety 0.60, education 0.55, general 0.45.",
    ],
    caseStudy: {
      problem:
        "A RAG system that always answers is dangerous in exactly the domains where being wrong is expensive — the failure mode is a confident answer built on nothing.",
      contribution: "Built the domain classifier, the retrieval audit, the guardrail decision and the generator agent, on persistent multimodal memory.",
      design:
        "A DomainClassifier assigns risk; a RetrievalAuditAgent checks what was actually retrieved; a GuardrailDecisionAgent applies a domain-specific confidence threshold; a GeneratorAgent produces an answer or an explicit refusal. Qdrant persists documents, domain examples, retrieval traces and failures across sessions.",
      decisions: [
        "Making the threshold domain-specific, rather than one global cut-off, matches how the cost of a wrong answer actually varies.",
        "Auditing retrieval before generating means the system can detect that it has no evidence, rather than generating anyway and being wrong.",
        "Persisting retrieval traces and failures turns each bad answer into input for the next improvement instead of a lost incident.",
      ],
      challenges:
        "Getting the retrieval audit to be honest about insufficient evidence, since a system tuned to answer will always find something to answer with.",
      tech: ["Python", "Streamlit", "Qdrant", "SentenceTransformers", "CLIP", "Docker"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/auto-rag-guardrail" }],
    },
  },
  {
    id: "replui",
    title: "RepliUI",
    category: "AI",
    domain: "Agent Systems / Code Generation",
    href: "https://github.com/VEDANTDHAVAN/RepliUI",
    image: "/images/project10.png",
    imageClass: "",
    featured: false,
    tech: ["Playwright", "FastAPI", "AI Gateway", "Agent Loop"],
    description:
      "An AI website-reconstruction agent that captures a public URL in Playwright at desktop and mobile widths, reduces the captured signals to a typed WebsiteSpec, and generates a standalone React/Next.js project.",
    summary:
      "Capture → typed WebsiteSpec → generate → validate → targeted edits, with a bounded self-repair loop.",
    systemIds: ["interface", "orchestration", "llm", "tools", "api"],
    roles: ["ai-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: an MVP AI website reconstruction agent that loads a public URL in Playwright at desktop and mobile widths.",
      "README: reduces captured DOM/visual signals to a typed `WebsiteSpec`, plans and generates an independent React/Next.js project, validates it, and accepts targeted natural-language edits.",
      "README stacks: Playwright, React/Next.js, FastAPI (uvicorn app.main:app), Vercel AI Gateway, pnpm.",
      "README: capture at 1440×900 and 390×844; self-repair retries at most three times.",
      "README: pytest suite of 287 tests, described as roughly 8 minutes of real install and build for the slow set.",
    ],
    caseStudy: {
      problem:
        "Generating a page from a raw screenshot produces something that looks right and behaves nothing like the original, because a screenshot carries none of the structure that made it work.",
      contribution: "Built the Playwright capture pipeline, the WebsiteSpec reduction, the generation and validation loop, and the edit path.",
      design:
        "A URL is loaded in Playwright at two widths (1440×900 and 390×844); captured DOM and visual signals are reduced to a typed `WebsiteSpec`; an agent plans and generates an independent React/Next.js project from that spec; the build is validated; a bounded self-repair loop retries at most three times; natural-language edits apply targeted changes.",
      decisions: [
        "Capturing at both desktop and mobile widths makes the responsive behaviour part of the spec rather than an afterthought.",
        "Reducing to a typed spec before generating means the model works from structure, not pixels.",
        "Capping self-repair at three attempts bounds cost and makes a stuck case terminate rather than loop.",
      ],
      challenges:
        "Converting a captured page into a specification that is specific enough to generate from, without encoding the original implementation's incidental details.",
      evidence: [
        "README: capture widths of 1440×900 and 390×844; self-repair capped at three attempts.",
        "README: pytest suite of 287 tests, the slow set described as roughly 8 minutes of real install and build.",
      ],
      tech: ["Python", "Playwright", "React", "Next.js", "FastAPI", "Vercel AI Gateway", "pnpm"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/RepliUI" }],
    },
  },
  {
    id: "bse-trades-dashboard",
    title: "BSE Trades Dashboard",
    category: "Full-Stack",
    domain: "Real-Time Data / Market Data",
    href: "https://github.com/VEDANTDHAVAN/BSE-Trades-Dashboard",
    image: "/images/project12.png",
    imageClass: "",
    featured: false,
    tech: ["Express", "BullMQ", "Redis", "Socket.IO", "Prisma"],
    description:
      "A real-time trade-ingestion dashboard where a mock BSE feed is pulled by a BullMQ worker into PostgreSQL, then published over Redis Pub/Sub and streamed to the browser over Socket.IO.",
    summary:
      "Mock feed → BullMQ worker → PostgreSQL → Redis Pub/Sub → Socket.IO → React. Real-time fan-out end to end.",
    systemIds: ["interface", "api", "data", "infra"],
    roles: ["sde", "fullstack", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: a mock BSE feed produces trades; a BullMQ worker pulls and persists them into PostgreSQL; each new trade is published over Redis Pub/Sub and streamed to the browser via Socket.IO.",
      "README stacks: Express 5, BullMQ 6, Redis 7 (ioredis), PostgreSQL 17, Prisma 7, Socket.IO 4, React 19, Vite 8, pnpm workspaces, Docker.",
      "README: a full BSE pull takes up to 15 minutes; MOCK_BSE_TIMEOUT_MS defaults to 960000 (16 minutes); MOCK_BSE_DELAY_MS defaults to 1000.",
      "README: example pagination response reports total 3701, totalPages 149, totalQuantity 1482300, totalValue 84199438952.60.",
      "README: a 13-check end-to-end audit script.",
    ],
    caseStudy: {
      problem:
        "A full BSE pull takes up to 15 minutes, so anything built directly on top of the feed cannot feel live — the data has to be decoupled from the request.",
      contribution: "Built the ingestion worker, the persistence layer and the real-time delivery path.",
      design:
        "A mock BSE feed emits trades; a BullMQ worker on a repeatable interval pulls and persists them into PostgreSQL via Prisma; each new trade is published to Redis Pub/Sub; the Express API fans it out to the browser over Socket.IO, where a React 19 client renders it.",
      decisions: [
        "Decoupling ingestion from delivery with a queue means a slow upstream pull never blocks the UI.",
        "Publishing to Redis before fanning out means multiple API processes can serve the same live stream.",
        "Writing to PostgreSQL before publishing means the live view and the stored history cannot disagree.",
      ],
      challenges:
        "Keeping the persisted state and the live broadcast consistent when a pull takes minutes and clients are connected throughout.",
      evidence: [
        "README: a full BSE pull takes up to 15 minutes; MOCK_BSE_TIMEOUT_MS defaults to 960000 (16 minutes).",
        "README example response: total 3701, totalPages 149, totalQuantity 1482300, totalValue 84199438952.60.",
        "README: 13-check end-to-end audit script.",
      ],
      tech: ["Express 5", "BullMQ 6", "Redis 7", "ioredis", "PostgreSQL 17", "Prisma 7", "Socket.IO 4", "React 19", "Vite 8", "pnpm", "Docker"],
      links: [
        { label: "Repository", href: "https://github.com/VEDANTDHAVAN/BSE-Trades-Dashboard" },
      ],
    },
  },
  {
    id: "agencyflow",
    title: "AgencyFlow",
    category: "Full-Stack",
    domain: "Product Engineering / Project Management",
    href: "https://github.com/VEDANTDHAVAN/AgencyFlow",
    image: "/images/project7.png",
    imageClass: "",
    featured: false,
    tech: ["Express", "Prisma", "BullMQ", "Socket.IO", "JWT"],
    description:
      "A full-stack project and task management platform for agency teams with a React frontend, an Express API, PostgreSQL via Prisma, BullMQ background jobs, Socket.IO real-time updates and refresh-token auth.",
    summary:
      "A shipped multi-tenant-style agency PM tool: React + Express + PostgreSQL + queues + realtime + refresh-token auth.",
    systemIds: ["interface", "api", "data", "infra"],
    roles: ["sde", "fullstack"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: a full-stack project and task management platform for agency teams with a Vite + React frontend and an Express + TypeScript API.",
      "README: PostgreSQL via Prisma, Redis + BullMQ background jobs, Socket.IO real-time updates, and HttpOnly refresh-token auth.",
      "README: pnpm monorepo deployed to Railway and Vercel with a BullMQ worker deployment and docker-compose.yml.",
    ],
    caseStudy: {
      problem:
        "Agency project tracking lives in a mix of chat and spreadsheets, so status is always slightly out of date and nobody can see what changed.",
      contribution: "Built the full application — frontend, API, data model, background jobs, real-time updates and auth.",
      design:
        "A Vite + React client and an Express + TypeScript API share a pnpm monorepo; PostgreSQL via Prisma holds the domain model; BullMQ runs background jobs; Socket.IO pushes real-time updates; HttpOnly refresh tokens handle session continuity.",
      decisions: [
        "HttpOnly refresh tokens keep the token out of reach of client-side script, which is the actual protection it exists for.",
        "Running slow work as BullMQ jobs keeps the request path responsive instead of blocking on it.",
        "Deploying web and worker separately means the worker can scale on its own axis.",
      ],
      challenges:
        "Propagating real-time updates consistently across multiple connected clients after a mutation.",
      tech: ["Vite", "React", "Express", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Socket.IO", "JWT", "pnpm", "Railway", "Vercel", "Docker"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/AgencyFlow" }],
    },
  },
  {
    id: "aivoa",
    title: "AIVOA.AI",
    category: "Full-Stack",
    domain: "Pharma Manufacturing / Deviation Management",
    href: "https://github.com/VEDANTDHAVAN/aivoa-deviation-ai",
    image: "/images/project1.png",
    imageClass: "",
    featured: false,
    tech: ["React", "FastAPI", "LangGraph", "PostgreSQL"],
    description:
      "An AI-assisted deviation-management application for pharmaceutical and API manufacturing that extracts structured deviation data from a document with a LangGraph workflow and persists the human-reviewed record in PostgreSQL.",
    summary:
      "Document → LangGraph extraction → editable deviation form → human review → PostgreSQL.",
    systemIds: ["interface", "orchestration", "llm", "data", "api"],
    roles: ["ai-engineer", "fde", "fullstack", "sde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: an AI-assisted pharmaceutical and API manufacturing deviation-management application.",
      "README: it accepts a deviation document or pasted event text, extracts structured deviation information with an LLM workflow, presents the result in an editable deviation form, and persists the human-reviewed record in PostgreSQL.",
      "README architecture: React + TypeScript + Vite → Axios/JSON/multipart → FastAPI (document parsing, input validation, LangGraph AI workflow, service/repository layer) → SQLAlchemy + PostgreSQL.",
      "README workflow: POST /api/deviations/analyze → extract text → LangGraph extraction → impact assessment → severity assessment → structured result → snake_case to camelCase mapping → populate form → human review → POST /api/deviations → persist in PostgreSQL.",
      "README: the frontend requires a successful AI analysis before the deviation can be saved, and the form remains editable.",
    ],
    caseStudy: {
      problem:
        "A manufacturing deviation is recorded on paper or in free text, and in a regulated environment the record has to be structured, complete and attributable to a person who reviewed it.",
      contribution: "Built the React/TypeScript frontend, the FastAPI backend and the LangGraph extraction workflow.",
      design:
        "A PDF, DOCX or TXT document (or pasted text) is posted to `/api/deviations/analyze`; the backend parses the text and runs a LangGraph workflow of extraction, impact assessment and severity assessment; the structured result is mapped from backend snake_case to frontend camelCase and populates the deviation form; a reviewer edits it; `POST /api/deviations` persists the reviewed values and the AI assessment in PostgreSQL.",
      decisions: [
        "Keeping the form editable after AI extraction keeps the human as the author of the record, with the model as an assistant rather than the source of truth.",
        "Requiring a successful analysis before saving prevents an incomplete deviation from entering the record.",
        "Separating `/analyze` from the save endpoint means analysis can be re-run without touching persisted data.",
      ],
      challenges:
        "Mapping a regulated document into a form a reviewer can validate quickly, and making the AI step reliably produce the fields the form expects.",
      tech: ["React", "TypeScript", "Vite", "FastAPI", "LangGraph", "SQLAlchemy", "PostgreSQL", "Axios"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/aivoa-deviation-ai" }],
    },
  },
  {
    id: "nifty-event-study",
    title: "NIFTY Event Study",
    category: "Machine Learning",
    domain: "Quantitative Research / Market Microstructure",
    href: "https://github.com/VEDANTDHAVAN/nifty-recovery-event-study",
    image: "/images/project4.jpg",
    imageClass: "",
    featured: false,
    tech: ["Python", "Pandas", "Jupyter", "Bootstrap"],
    description:
      "A reproducible event-study research framework testing whether forward returns after extreme negative NIFTY 50 moves differ from an unconditional baseline, with a fixed development/OOS split and bootstrap uncertainty.",
    summary:
      "A deliberately narrow event study: 53 events, a fixed OOS split, no threshold or holding-period optimization.",
    systemIds: ["interface", "data"],
    roles: ["ml-engineer", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: reproducible NIFTY 50 event-study research asking whether subsequent returns differ from the unconditional baseline after an unusually large negative daily move.",
      "README: 4,585 daily OHLC observations; fixed development/OOS split at 2020-01-01.",
      "README: the primary event is a close-to-close return of at most -3%; candidate events within five trading observations are excluded.",
      "README: final sample of 53 events — 38 development and 15 OOS.",
      "README: forward returns enter at the next trading day's Open and exit at the Close after 1, 3, 5 or 10 trading observations.",
      "README: no threshold or holding-period optimization is performed.",
      "README: dataset source — NIFTY 50 Dataset 2000-2026 (Kaggle).",
    ],
    caseStudy: {
      problem:
        "The claim that markets bounce after big down days is widely repeated and rarely tested out of sample, usually because the threshold and holding period get tuned until the result appears.",
      contribution: "Built the research framework, the event study, the out-of-sample validation and the analysis notebooks.",
      design:
        "4,585 daily OHLC observations are split at a fixed 2020-01-01 date into 38 development and 15 out-of-sample events; an event is a close-to-close return of at most -3%, with nearby candidates within five trading observations excluded; forward returns enter at the next Open and exit at the Close after 1, 3, 5 or 10 observations, and are compared against the same return construction over all eligible observations; bootstrap intervals quantify uncertainty.",
      decisions: [
        "Fixing the split date in advance, instead of re-splitting per experiment, keeps the out-of-sample period genuinely held out.",
        "Running no threshold or holding-period optimization is the point of the design — it is what prevents the result from being fitted to the development sample.",
        "Comparing against the unconditional baseline with identical return construction means the difference measured is the event, not the methodology.",
      ],
      challenges:
        "Holding a sample of 53 events to a standard that a much larger sample would not need.",
      evidence: [
        "README: 4,585 daily OHLC observations; development/OOS split fixed at 2020-01-01.",
        "README: final sample of 53 events — 38 development and 15 OOS. Events within five trading observations are excluded.",
        "README: event definition is a close-to-close return of at most -3%; forward returns use the next trading day's Open as entry.",
        "README: no threshold or holding-period optimization is performed.",
      ],
      tech: ["Python", "Pandas", "Jupyter Notebook", "Bootstrap", "Event study"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/nifty-recovery-event-study" }],
    },
  },
  {
    id: "property-post-maker",
    title: "Property Post Maker",
    category: "Full-Stack",
    domain: "Product Engineering / Client-side Tooling",
    href: "https://github.com/VEDANTDHAVAN/property-post-maker",
    image: "/images/project2.png",
    imageClass: "",
    featured: false,
    tech: ["Next.js 15", "Client-side", "Canvas Export"],
    description:
      "A live property marketing post generator that turns four property details into a share-ready 1080×1350 creative, exported as a PNG, running entirely client-side with no AI API, backend or database.",
    summary:
      "Four fields in, a 1080×1350 branded creative out — all client-side, exported as PNG.",
    systemIds: ["interface"],
    roles: ["fullstack", "sde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "README: \"a live property marketing post generator. Fill in four fields — Property & Type, Location, Price, and Highlights — and instantly get a polished, share-ready 1080x1350 (Instagram-portrait) property creative\".",
      "README: \"No AI API, backend, or database involved — everything runs client-side in the browser\".",
      "README: exported as a crisp PNG (2x pixel density) via a Download PNG button that captures only the creative.",
      "README: accessibility features — proper `<label>`/`for` pairing, `aria-required`, `aria-invalid`, `aria-describedby`, keyboard-only operable controls, `aria-live` status messages.",
      "README: fully responsive — stacked on mobile, form-left/preview-right on desktop. Built with Next.js 15.",
    ],
    caseStudy: {
      problem:
        "Producing a correctly sized, consistently branded social creative is repetitive manual work for a small team, and an automated version usually needs a backend nobody wants to maintain.",
      contribution: "Built the form, the live preview and the PNG export.",
      design:
        "Four inputs drive a live 1080×1350 creative that re-renders as you type; branding is applied automatically; a Download PNG button exports the creative alone at 2× pixel density, with no AI API, backend or database involved — everything runs client-side.",
      decisions: [
        "Keeping it entirely client-side removes an API and a database from the critical path for a task that is fundamentally a rendering problem.",
        "Exporting only the creative at 2× density keeps the output clean and sharp instead of screenshotting the surrounding app chrome.",
        "Building the form to keyboard and screen-reader conventions was treated as a requirement, not a pass — `label`/`for`, `aria-required`, `aria-invalid` and `aria-live` are part of the implementation.",
      ],
      challenges:
        "Making an empty form look intentional before anything has been typed, and keeping the export fixed at exactly 1080×1350 across screen sizes.",
      tech: ["Next.js 15", "TypeScript", "CSS", "Canvas PNG export", "Client-side rendering"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/property-post-maker" }],
    },
  },
  {
    id: "trading-bot",
    title: "Trading Bot",
    category: "Full-Stack",
    domain: "Product Engineering / Execution Systems",
    href: "https://github.com/VEDANTDHAVAN/trading_bot",
    image: "/images/project5.png",
    imageClass: "",
    featured: false,
    tech: ["Python", "CLI", "Exchange API", "Order Types"],
    description:
      "A production-ready Python CLI application for placing MARKET and LIMIT orders on the Binance USDT-M Futures Testnet.",
    summary:
      "A Python CLI for MARKET and LIMIT order placement against the Binance USDT-M Futures Testnet.",
    systemIds: ["tools", "api"],
    roles: ["sde", "fde"],
    stage: "shipped",
    source: "added",
    evidence: [
      "Repository description: \"A production-ready Python CLI application for placing MARKET and LIMIT orders on the Binance USDT-M Futures Testnet\".",
      "The description is explicit that this targets the Testnet.",
    ],
    caseStudy: {
      problem:
        "Order placement is a small, precise task that is easy to get wrong by hand and easy to exercise safely when it is isolated from real funds.",
      contribution: "Built the CLI for placing MARKET and LIMIT orders.",
      design:
        "A Python command-line application submits MARKET and LIMIT orders to the Binance USDT-M Futures Testnet.",
      decisions: [
        "Targeting the testnet makes the order path exercisable end to end without real funds behind it.",
      ],
      challenges:
        "Keeping market and limit order semantics correct for a futures API that distinguishes them.",
      tech: ["Python", "CLI", "Binance USDT-M Futures API", "Testnet"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/trading_bot" }],
    },
  },
  {
    id: "trader-sentiment",
    title: "Trader Sentiment Analysis",
    category: "Machine Learning",
    domain: "Quantitative Research / Behavioural Analytics",
    href: "https://github.com/VEDANTDHAVAN/Trader-Sentiment-Analysis",
    image: "/images/project9.png",
    imageClass: "",
    featured: false,
    tech: ["Python", "Statistical Testing", "ML", "Behavioural Analytics"],
    description:
      "Research-driven analysis of trader performance under Bitcoin Fear & Greed market conditions using statistical testing, machine learning and behavioural analytics.",
    summary:
      "Statistical and ML analysis of trader performance under Bitcoin Fear & Greed conditions.",
    systemIds: ["data"],
    roles: ["ml-engineer"],
    stage: "shipped",
    source: "added",
    evidence: [
      "Repository description: \"Research-driven analysis of trader performance under Bitcoin Fear & Greed market conditions using statistical testing, machine learning, and behavioral analytics\".",
      "No metric or result figure is documented in the repository description; none is claimed here.",
    ],
    caseStudy: {
      problem:
        "Whether Fear & Greed conditions actually change trader behaviour is usually asserted rather than tested, which makes it hard to act on.",
      contribution: "Built the analysis covering statistical testing, machine learning and behavioural analytics of trader performance.",
      design:
        "Trader performance is analysed against Bitcoin Fear & Greed market conditions using statistical tests alongside machine learning methods.",
      decisions: [],
      challenges: "Not documented in the repository description.",
      tech: ["Python", "Statistical testing", "Machine learning", "Behavioural analytics"],
      links: [{ label: "Repository", href: "https://github.com/VEDANTDHAVAN/Trader-Sentiment-Analysis" }],
    },
  },
];

// ── Assembly ───────────────────────────────────────────────────────────────────────────────

/** Every system, original first. `source` marks where the entry came from. */
export const SYSTEMS = [...PRESERVED, ...ADDED].map((system) => ({
  ...system,
  source: system.source ?? "original",
}));

/** The exact legacy project shape, for anything that still expects it. */
export function legacyProjects() {
  return SYSTEMS.map(
    ({ title, category, domain, href, demoUrl, image, imageClass, featured, tech, description }) => ({
      title,
      category,
      domain,
      href,
      demoUrl,
      image,
      imageClass,
      featured,
      tech,
      description,
    }),
  );
}

/** Categories from the original filter, preserved in their original order. */
export const LEGACY_CATEGORIES = [
  "All",
  ...Array.from(new Set(legacyProjects().map((project) => project.category))),
];

export const ALL_SYSTEMS = SYSTEMS;

/** Recompute layer support across the whole portfolio. */
export function layersWithSupport() {
  const counts = new Map();
  SYSTEMS.forEach((system) => {
    system.systemIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
  });
  return counts;
}