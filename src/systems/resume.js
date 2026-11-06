/**
 * Resume-derived profile data.
 *
 * Source: the updated resume supplied by Vedant Dhavan (Vedant.pdf, added to
 * `public/Vedant_Dhavan_Resume.pdf`). This file is the authoritative source for the
 * profile, skills, soft skills and the BreakoutAI internship.
 *
 * Where the resume and the older `src/constants/index.js` disagree, the resume wins and the
 * change is recorded in `docs/REDESIGN_INVENTORY.md`:
 *   - Vidyavardhini's CGPA: 8.54 (old) → 8.09 (resume).
 *   - Mithibai HSC: 75.5% (old) → 75.6% (resume), plus MHTCET 95.5%ile and JEE-Mains 74.35%ile.
 * Nothing else in the old data is altered.
 */

export const PROFILE = {
  name: "Vedant Dhavan",
  fullName: "Vedant Atul Dhavan",
  headline: "I build systems. I solve problems.",
  lede: "From product interfaces and backend infrastructure to AI agents and machine-learning systems.",
  title: "Bachelors in Computer Engineering | Full-Stack Developer | Machine Learning Enthusiast",
  about:
    "Software Engineer passionate about building scalable products at the intersection of Full-Stack Development, AI/ML, and intelligent automation. Experienced in developing end-to-end applications, designing robust backend architectures, and integrating AI into production systems. Driven by curiosity, continuous learning, and building technology that delivers meaningful impact.",
  location: "India",
  email: "vedantadhavan11@gmail.com",
  phone: "+91 8850780964",
  site: "https://vedantdhavan.vercel.app",
  github: "https://github.com/VEDANTDHAVAN",
  linkedin: "https://www.linkedin.com/in/vedant-dhavan/",
  resumeFile: "/Vedant_Dhavan_Resume.pdf",
  /** Preserved from the original footer: the resume repository link. */
  resumeRepo: "https://github.com/VEDANTDHAVAN/vedantdhavanresume",
};

/** Technical skills, grouped as the resume groups them. */
export const SKILL_GROUPS = [
  { key: "languages", label: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { key: "frontend", label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  {
    key: "backend",
    label: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Authentication"],
  },
  { key: "databases", label: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { key: "tools", label: "Tools", items: ["Git", "Docker", "Vercel"] },
  {
    key: "aiml",
    label: "AI & ML",
    items: ["LLMs", "RAG", "AI Agents", "CNNs", "Computer Vision", "Sentiment Analysis"],
  },
];

export const SOFT_SKILLS = [
  "Leadership",
  "Teamwork",
  "Communication",
  "Problem Solving",
  "Adaptability",
  "Ownership",
];

/**
 * Education figures from the resume, keyed to the three `eduCards` by position.
 *
 * These carry ONLY the corrected scalars. The institution names, overviews and `learnings`
 * prose stay in `src/constants/index.js` and are never overwritten — see
 * `EDUCATION_OVERRIDES` usage in `src/sections/AboutSection.jsx`.
 */
export const EDUCATION_OVERRIDES = [
  // Resume corrects the CGPA (8.54 → 8.09) and adds the entrance-exam percentiles.
  { percentage: "CGPA: 8.09" },
  { percentage: "75.6% · MHTCET 95.5%ile · JEE-Mains 74.35%ile" },
  { percentage: "95.5%" },
];

/**
 * Work experience added from the resume. The two original internships live in
 * `Experience` in `src/constants/index.js` and are preserved untouched.
 *
 * `desc` is prose; the original entries use `mentions` for a live URL instead, so both are
 * rendered by the About section.
 */
export const WORK_EXPERIENCE = [
  {
    companyName: "BreakoutAI",
    position: "AI Engineer Intern",
    type: "Internship",
    duration: "Internship",
    date: "",
    desc: "Developed scalable AI backend services, RAG pipelines, and LLM integrations using Python, FastAPI, REST APIs, and vector databases for production deployments.",
    review: "",
    imgPath: "/images/exp1.png",
    source: "resume",
  },
];

/** The resume's own project highlights, used to cross-check the systems data. */
export const RESUME_PROJECTS = [
  {
    title: "RecallTabs — Browser Knowledge Management Platform",
    description:
      "Developed a browser knowledge management platform that captures, organizes, and retrieves web content through semantic search and conversational querying using a Chrome Extension and FastAPI backend.",
    tech: ["React.js", "TypeScript", "FastAPI", "PostgreSQL", "Vector Search"],
    href: "https://github.com/VEDANTDHAVAN/RecallTabs",
    systemId: "recall-tabs",
  },
  {
    title: "VedLab — Real-Time Collaborative UI Design Platform",
    description:
      "Developed a real-time collaborative UI design platform supporting concurrent canvas editing, shared workspaces, and live synchronization using React, TypeScript, and Liveblocks.",
    tech: ["React.js", "TypeScript", "tldraw", "Liveblocks", "Zustand", "Tailwind CSS"],
    href: "https://github.com/VEDANTDHAVAN/vedlab",
    systemId: "vedlab",
  },
];

/** Resume stack for VedLab, which is more specific than the repository README. */
export const VEDLAB_RESUME_STACK = ["React.js", "TypeScript", "tldraw", "Liveblocks", "Zustand", "Tailwind CSS"];