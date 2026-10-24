# Redesign Inventory — "Systems, Not Projects"

Branch: `redesign/systems-not-projects` (checkpointed from `master` @ `30139f2`)
Working tree at checkpoint: **clean** (no uncommitted user changes to preserve).

This document is the zero-data-loss record for the redesign. Every row below was present in the
original site and must still be present after the redesign.

---

## 1. Stack and build configuration (UNCHANGED)

| Item | Value |
| --- | --- |
| Framework | React 19 + Vite 6 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + existing hand-written CSS in `src/index.css` |
| Animation | GSAP 3 + `@gsap/react`, `ScrollTrigger` |
| 3D | three 0.176, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| Misc deps | `react-countup`, `react-responsive` |
| Language | JavaScript/JSX (TypeScript is a devDependency but unused in `src/`; not migrated) |
| Routing | **None.** Single-page app, hash anchors only |
| Backend | Vercel serverless function `api/contact.js` (EmailJS relay) |
| Host config | `vercel.json` — CSP + HSTS + nosniff + frame + referrer + permissions headers; immutable caching for `/assets`, `/models`, `/images` |
| Lint | ESLint 9 flat config, `npm run lint` |
| Commands | `npm run dev`, `npm run build` (prebuild `clean`), `npm run preview`, `npm run lint`, `npm run lint:fix`, `npm run lint:strict`, `ANALYZE=true npm run build` |

### Baseline status (recorded BEFORE any redesign edit)

- `npm run lint` → **0 errors, 52 warnings** (all `no-unused-vars` on unused React/component imports).
- `npm run build` → **succeeds**, 648 modules, ~2m37s, with a >1000 kB chunk warning for the `vendor`
  chunk (three.js). Chunk size warning limit is 1000 in `vite.config.js`.
- No tests, no type-check script, no CI workflow in this repo.

---

## 2. Routes and anchors

There is no router. Every destination is an in-page `#hash`. **All of these must keep working:**

| Anchor | Owner component | Status |
| --- | --- | --- |
| `#hero` | `Hero.jsx` | preserved |
| `#work` | `ShowcaseSection.jsx` | preserved (now the All Projects view) |
| `#education` | `EducationSection.jsx` | preserved (now inside About) |
| `#skills` | `TechStack.jsx` | preserved (now inside About) |
| `#experience` | `ExperienceSection.jsx` | preserved (now inside About) |
| `#contact` | `Contact.jsx` | preserved |
| `#counter` | `AnimatedCounter.jsx` | preserved (target of `Button` scroll) |
| `#button` | `Hero.jsx` | preserved |

New anchors added by the redesign: `#about`, `#systems`, `#notes`. Nav gains the new set; no old
anchor is removed.

---

## 3. Original section order

`NavBar` → `Hero` → `ShowcaseSection` → `FeatureCards` → `EducationSection` → `TechStack` →
`ExperienceSection` → `Contact` → `Footer`

Redesigned order: `NavBar` → `Hero` → `SystemsSection` (map + role filters + All Projects) →
`EngineeringNotes` → `AboutSection` (bio + `#education` + `#skills` + `#experience`) → `Contact`
→ `Footer`. `FeatureCards` content is folded into About as a preserved "How I work" block, and the
`AnimatedCounter` band is retained in the hero area.

---

## 4. Project inventory — all 16 original projects (PRESERVE VERBATIM)

Source of truth: `projects` array in `src/sections/ShowcaseSection.jsx` (lines 9–210).
Fields per project: `title`, `category`, `domain`, `href`, `demoUrl?`, `image`, `imageClass`,
`featured`, `tech[]`, `description`.

| # | Title | category | featured | demoUrl | image |
| --- | --- | --- | --- | --- | --- |
| 1 | VedLab | Realtime | yes | https://vedlab.vercel.app | `/images/project1.png` |
| 2 | Fabric Fusion | 3D Web | no | — | `/images/project2.png` |
| 3 | HealSpace | Full-Stack | no | — | `/images/project3.png` |
| 4 | VedDev | AI | yes | https://veddev.vercel.app | `/images/project10.png` |
| 5 | Omnigen | AI | yes | https://multimodelai-saas.vercel.app | `/images/project7.png` |
| 6 | Orchestrion | AI | yes | https://orchestrion.vercel.app | `/images/project11.png` |
| 7 | SecureIntent Orchestrator | AI | yes | — | `/images/project14.png` |
| 8 | Agentic Code Review Assistant | Developer Tools | no | https://agentic-code-review-assistant.vercel.app | `/images/project12.png` |
| 9 | MCP Tools | Developer Tools | no | — | `/images/project6.png` |
| 10 | GraphRAG Benchmark | Machine Learning | yes | https://graphrag-benchmark.vercel.app | `/images/project13.png` |
| 11 | Prompt Ops Mini Dashboard | AI | no | https://prompt-ops-mini-dashboard.vercel.app | `/images/project15.png` |
| 12 | ContextAI | AI | no | — | `/images/project5.png` |
| 13 | Consumer Sentiment Analysis | Machine Learning | no | — | `/images/project4.jpg` |
| 14 | Audio CNN Visualizer | Machine Learning | no | — | `/images/project9.png` |
| 15 | Web Scraper CLI Tool | Developer Tools | no | — | `/images/project8.png` |
| 16 | Transaction Fraud Risk Platform | Machine Learning | yes | https://transactionfraud-risk-detection.streamlit.app/ | `/images/project16.png` |

Original filter categories (derived, must keep working): `All`, `Realtime`, `3D Web`, `Full-Stack`,
`AI`, `Developer Tools`, `Machine Learning`.

### Pre-existing link defects found during audit (NOT introduced by the redesign)

- **#9 MCP Tools → `https://github.com/VEDANTDHAVAN/MCP_TOOLS` returns HTTP 404.** The repository
  does not exist (checked on `main` and `master` via the GitHub API and raw README URLs). The project
  entry, its description and its image are **kept and displayed**, but the link is flagged in the UI
  as unavailable and **no system-layer connections are claimed for it**, because its implementation
  cannot be verified.

---

## 5. Non-project content (PRESERVE)

`src/constants/index.js` exports, all of which remain in the codebase:

- `navLinks` — extended, not replaced (old names/links still resolve to the same anchors).
- `words` — 8 hero word/icon pairs (`Ideas/Concepts/Designs/Code` + `/images/*.svg`).
- `counterItems` — 2+ Years, 10+ Projects, 10+ Certifications, 20+ Skills.
- `logoIconsList` — 11 company logos, `/images/logos/company-logo-1..11`.
- `abilities` — 9 cards with `imgPath`, `title`, `desc` (text preserved exactly, emoji included).
- `techStackImgs` — 5 flat logo entries; `techStackIcons` — 6 GLB 3D entries (`/models/*.glb`).
- `eduCards` — 3 institutions with `overview`, `percentage`, `learnings[]`, images and logos.
- `expLogos` — 3 entries.
- `Experience` — 2 internships with `companyName`, `type`, `duration`, `position`, `date`,
  `mentions` (live URLs), `review` (verbatim client quotes), `imgPath`.
- `socialImgs` — GitHub, Instagram, X, LinkedIn (all four URLs preserved).

---

## 6. External links and contact destinations (PRESERVE)

| Destination | Where |
| --- | --- |
| `https://github.com/VEDANTDHAVAN` | socials |
| `https://www.instagram.com/dhavanvedant_2006` | socials |
| `https://x.com/w35y4y` | socials |
| `https://www.linkedin.com/in/vedant-dhavan-5930ba2a3/` | socials |
| `https://github.com/VEDANTDHAVAN/vedantdhavanresume` | footer "visit repo" — doubles as the resume link |
| `https://prodigyinfotech.dev/` | experience card 1 |
| `https://devlokavenue.in/` | experience card 2 |
| `POST /api/contact` | contact form → `api/contact.js` → EmailJS using server-only env vars |

Secrets: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` are read only inside
`api/contact.js` from `process.env`. **No secret is read, bundled or logged by the frontend.**

---

## 7. Contact form contract (PRESERVE EXACTLY)

Request: `POST /api/contact`, `Content-Type: application/json`, body
`{ name, email, message, company }`. `company` is a hidden honeypot (rejects with 400 when filled).
Responses: `200 {ok:true}`, `400 {error}`, `405`, `429 {error}`, `500 {error}`, `502 {error}`.
Server rate limit: 5 requests / 60 s per IP. Field caps: name 100, email 254, message 3000 chars.
The redesign adds visible success/error messaging driven by these **real** responses — it never
fakes a successful send.

---

## 8. Assets (all retained on disk)

`public/images/*` (89 files: project shots `project1–16`, 3D logo textures, social icons, hero
background, word icons, education/company photos, 11 company logos, 5 tech logos, 3 textures),
`public/models/*.glb` (8 models + 1 texture), `public/vedlab.png`, `public/vite.svg`.
The 3D hero scene and GLB tech logos are **kept importable**; the hero 3D view becomes an opt-in
toggle (default off) so the 1.1 MB three.js chunk is not on the critical path. Files are not deleted.

---

## 9. GitHub evidence ledger for additions

Every added project is backed by a fetched README or a repository description. Method: GitHub REST
API `/readme` (base64) and `raw.githubusercontent.com`; layer claims cite a named file, config or
README line. Where a layer could not be evidenced, it is **omitted**, not guessed.

Dedup decisions:
- `PRismAI` and `Agentic-Code-Review-Assistant` have **byte-identical READMEs** (SHA-256 of both
  README bodies match, `949BBFB36D60DB8F…`). They are the same system, so PRismAI is **not** added
  as a separate project.
- `MCP_TOOLS` → 404, kept but unverified.

Repos deliberately **not** added because the README could not be verified within the API rate limit:
`pipeline-devops`, `Speech_To_Text`, `SECURE_USER_AUTHENTICATION`, `Therapy_Website` (empty README),
`WEB_SCRAPER_TOOL` (no README), `Consumer_Sentiment_Analysis`, `ECOMMERCE_CLOTHING_STORE` and
`RAG_CHATBOT` (the latter two are already on the portfolio).

---

## 10. Portrait photo

`public/images/pic.jpg` is used **directly, with no image optimization**. It is the single
source asset for both placements, at its natural aspect ratio (~4:3, 1748×1304):

| Placement | File | Presentation |
| --- | --- | --- |
| `Hero.jsx` | `src/sections/Hero.jsx` | circular headshot, `object-fit: cover`, sized `clamp(96px, 16vw, 168px)` |
| `AboutSection.jsx` | `src/sections/AboutSection.jsx` | full-width editorial panel inside `.portrait-frame` |

No derivative files (`me.jpg`, `me-banner.jpg`, `me-head.jpg`) exist or are referenced, and the
one-off optimizer script that would have produced them has been removed. `width`/`height`
attributes are set on both `<img>` elements to reserve layout space and avoid CLS.

---

## 11. Final validation record

| Check | Baseline (`master`) | After redesign |
| --- | --- | --- |
| `npm run lint` | 0 errors, 52 warnings | **0 errors**, 53 warnings |
| `npm run build` | passes | **passes** |
| Legacy anchors `#hero #work #skills #education #experience #contact` | present | **present** (verified in the built bundle) |
| Projects rendered | 16 | **16 originals + 14 verified = 30** |

The single added lint warning is a `no-unused-vars` false positive: `eslint.config.js` does not
enable `react/jsx-uses-vars`, so an import referenced only in JSX looks unused. The same false
positive already affects `ShowcaseSection`, `TechStack` and `EducationSection` at baseline.

Build output: `index.js` 122 KB (35 KB gzip), `index.css` 38 KB (8.5 KB gzip), and
`HeroExperience.js` 10.8 KB as a separate lazy chunk. The `vendor` chunk remains 1.13 MB
(315 KB gzip) — it carries three.js and is fetched when the opt-in 3D hero is enabled.

**Accessibility:** skip link + `<main>` landmark, `aria-current` on the active nav item,
`aria-pressed` on every filter control, labelled map cells, native `<dialog>` for case studies
(focus trap and Escape-to-close for free), `aria-invalid`/`aria-describedby` on form fields,
live-region status messages, `:focus-visible` outlines, and a `prefers-reduced-motion` block.

**Not changed:** framework, dependencies, Vercel `api/contact.js`, all external links, all
original copy, and every asset on disk.