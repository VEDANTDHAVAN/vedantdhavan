# TierMux memory — your style, tone & standing instructions

The agent reads this file every turn and follows it exactly. Edit freely — what you write
here always takes priority over its defaults. Keep it short: it's injected into every request.

## Learned from corrections (agent-maintained)
- 1. **User attached updated resume PDF** (`c:\Users\vedant\Downloads\Vedant.pdf`) and said: **"Use this new updated Resume."** → This is now authoritative for profile facts:
- Name `VEDANT DHAVAN`; title `Bachelors in Computer Engineering | Full-Stack Developer | MachineLearning Enthusiast`
- Contact: `+91 8850780964`, `vedantdhavan.vercel.app`, `vedantadhavan11@gmail.com`, `github.com/VEDANTDHAVAN`
- Education: Vidyavardhini's COE **2023-2027, CGPA 8.09** (original site said 8.54 — resume wins); Mithibai **2021-2023, HSC Science 75.6% | MHTCET 95.5%ile | JEE-Mains 74.35%ile** (original said 75.5%); Oxford Intl School **2011-2021, Primary ICSE 95.5%**
- NEW work experience: **AI Engineer Intern | BreakoutAI** — “Developed scalable AI backend services, RAG pipelines, and LLM integrations using Python, FastAPI, REST APIs, and vector databases for production deployments.”
- Skills categories (Languages/Frontend/Backend/Databases+Tools/AI&ML) + Soft Skills (Leadership, Teamwork, Communication, Problem Solving, Adaptability, Ownership)
- Resume showcases RecallTabs and VedLab with their stacks.
- PDF copied to `public/Vedant_Dhavan_Resume.pdf` (61568 bytes).
- 2. **Self-caught data-loss risks** (must not regress): `eduCards.learnings` are long sentences — resume data must NOT overwrite `learnings`/`overview`
- **Field-name mismatches found by re-reading `src/constants/index.js`** (initial assumptions were wrong):
- `eduCards` uses `Institution`, `title`, `overview`, `imgPath` (`/images/edu1.jpg` — **not** `.png`), `logoPath`, `date`, `percentage`, `learnings` (long sentences).
- `Experience` items use `companyName`, `position`, `date`, `mentions` (**live URL**, not prose), `review`, `imgPath`.
- `expLogos` uses `name`/`imgPath`.
- `logoIconsList` entries have **only `imgPath`** (no `companyName`) — an AboutSection reference to `logo.companyName` was removed.
- `socialImgs` uses `.name`, `.url`, `.imgPath` (not `.link`) — Contact fixed `.link` → `.url`.
- `navLinks` original entries were only Work/Education/Skills/Experience (no "Home"), and were `const` not `export const` at declaration.
- `words` entries: `{ text, imgPath, index }`.
- **Deduplication decision:** `PRismAI` and `Agentic-Code-Review-Assistant` have **byte-identical READMEs** (both hash `949BBFB36D60DB8F`) — same system, must not be added twice.
- **Pre-existing broken link found:** `MCP_TOOLS` repo returns **HTTP 404** (does not exist) — link flagged, not silently kept as working.
- `wordSlider` assumes exactly 8 items each12.5% height; `.rotator` CSS added to preserve the animation correctly.
