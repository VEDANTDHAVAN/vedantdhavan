import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    title: "MCP Tools",
    category: "Developer Tools",
    domain: "Agent Tooling / Model Context Protocol",
    href: "https://github.com/VEDANTDHAVAN/MCP_TOOLS",
    image: "/images/project6.png",
    imageClass: "bg-[#edff4f]",
    featured: false,
    tech: ["MCP", "Agent Tooling", "Automation", "Social Posting"],
    description:
      "A custom MCP-based automation project that lets an AI assistant interpret natural commands and invoke external tools such as social posting workflows.",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    title: "Audio CNN Visualizer",
    category: "Machine Learning",
    domain: "Deep Learning / Audio Classification",
    href: "https://github.com/VEDANTDHAVAN/Convolutional_Neural_Network_for_Audio",
    image: "/images/project9.png",
    imageClass: "bg-[#2c1050]",
    featured: false,
    tech: ["Deep Learning", "CNN", "Audio", "Visualization"],
    description:
      "A full pipeline for training, deploying, and visualizing predictions from a convolutional neural network trained on environmental sound classification.",
  },
  {
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
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const moreProjects = visibleProjects.filter((project) => !project.featured);

  useGSAP(() => {
    gsap.fromTo(
      ".showcase-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#work",
          start: "top bottom-=100",
        },
      }
    );

    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase" aria-labelledby="work-heading">
      <div className="showcase-shell">
        <div className="showcase-header">
          <p className="showcase-kicker">Selected work across domains</p>
          <h2 id="work-heading" className="hero-text">
            Projects
          </h2>
          <p className="showcase-intro">
            A focused view of my existing AI, full-stack, machine learning, realtime, 3D web, and developer tooling projects.
          </p>
        </div>

        <div className="project-filters" role="list" aria-label="Filter projects by domain">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`project-filter ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {featuredProjects.length > 0 && (
          <div className="showcase-group">
            <div className="showcase-group-heading">
              <p>High-signal builds</p>
              <h3>Featured Projects</h3>
            </div>
            <div className="featured-project-grid">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.href} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {moreProjects.length > 0 && (
          <div className="showcase-group">
            <div className="showcase-group-heading">
              <p>Broader project range</p>
              <h3>More Projects</h3>
            </div>
            <div className="project-grid">
              {moreProjects.map((project) => (
                <ProjectCard key={project.href} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowcaseSection;
