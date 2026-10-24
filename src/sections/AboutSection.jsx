import { abilities, eduCards, Experience, techStackImgs } from "../constants";
import {
  EDUCATION_OVERRIDES,
  PROFILE,
  SKILL_GROUPS,
  SOFT_SKILLS,
  WORK_EXPERIENCE,
} from "../systems/resume";

/**
 * About — biography, education, experience, skills and working abilities.
 *
 * Data sources and precedence:
 * - Biography, contact, skills, soft skills, BreakoutAI role: the updated resume
 *   (`src/systems/resume.js`).
 * - Education prose (institution, overview, learnings, images) and the two original
 *   internships come from `src/constants/index.js` and are preserved verbatim. The resume
 *   only overrides the scalar percentages, which it corrects.
 *
 * `#education`, `#skills` and `#experience` anchors are all still present, so the original
 * deep links keep working.
 */
const AboutSection = () => (
  <section id="about" className="section">
    <div className="shell">
      <div className="portrait-frame" style={{ marginBottom: "2.5rem" }}>
        <img
          className="portrait"
          src="/images/pic.jpg"
          alt="Vedant Dhavan"
          loading="eager"
          decoding="async"
          width="1748"
          height="1304"
        />
      </div>

      <div className="section-head">
        <p className="eyebrow">About</p>
        <h2 className="h2">Building systems end to end.</h2>
      </div>

      <div className="about-grid">
        <div>
          <p className="about-bio">{PROFILE.about}</p>

          <p className="about-bio muted" style={{ marginTop: "0.75rem" }}>
            {PROFILE.title}
          </p>

          <dl className="about-facts">
            <div className="about-fact">
              <dt>Location</dt>
              <dd>{PROFILE.location}</dd>
            </div>
            <div className="about-fact">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`} className="accent">
                  {PROFILE.email}
                </a>
              </dd>
            </div>
            <div className="about-fact">
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a>
              </dd>
            </div>
            <div className="about-fact">
              <dt>Website</dt>
              <dd>
                <a href={PROFILE.site} target="_blank" rel="noopener noreferrer" className="accent">
                  {PROFILE.site.replace(/^https?:\/\//, "")} ↗
                </a>
              </dd>
            </div>
            <div className="about-fact">
              <dt>GitHub</dt>
              <dd>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="accent">
                  github.com/VEDANTDHAVAN ↗
                </a>
              </dd>
            </div>
          </dl>

          <div className="subsection" id="skills">
            <div className="subsection-head">
              <h3 className="h3">Technical skills</h3>
              <span className="mono muted">grouped, not a wall of badges</span>
            </div>
            <div className="skills-grid">
              {SKILL_GROUPS.map((group) => (
                <div className="skill-group" key={group.key}>
                  <span className="skill-group-title">{group.label}</span>
                  <div className="skill-list">
                    {group.items.map((item) => (
                      <span className="skill-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-head">
              <h3 className="h3">Soft skills</h3>
            </div>
            <div className="skill-list">
              {SOFT_SKILLS.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div id="experience">
            <div className="subsection-head" style={{ marginBottom: "1.25rem", marginTop: 0 }}>
              <h3 className="h3">Experience</h3>
            </div>

            <div className="exp-list">
              {WORK_EXPERIENCE.map((item) => (
                <article className="exp-item" key={`${item.companyName}-${item.position}`}>
                  <img
                    className="exp-logo"
                    src={item.imgPath}
                    alt=""
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div className="exp-body">
                    <div className="exp-head">
                      <span className="exp-role">{item.position}</span>
                      <span className="exp-meta">{item.duration}</span>
                    </div>
                    <span className="mono muted">{item.companyName}</span>
                    <p className="exp-desc">{item.desc}</p>
                  </div>
                </article>
              ))}

              {Experience.map((item) => (
                <article className="exp-item" key={`${item.companyName}-${item.position}`}>
                  <img
                    className="exp-logo"
                    src={item.imgPath}
                    alt=""
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div className="exp-body">
                    <div className="exp-head">
                      <span className="exp-role">{item.position}</span>
                      <span className="exp-meta">{item.date}</span>
                    </div>
                    <span className="mono muted">
                      {item.companyName} · {item.duration}
                    </span>
                    <p className="exp-desc">{item.review}</p>
                    {item.mentions ? (
                      <a
                        className="btn btn--quiet btn--sm"
                        href={item.mentions}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ justifySelf: "start", paddingInline: 0 }}
                      >
                        Visit company site ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="education">
            <div className="subsection-head" style={{ marginBottom: "1.25rem" }}>
              <h3 className="h3">Education</h3>
            </div>

            <div className="edu-list">
              {eduCards.map((card, index) => (
                <article className="edu-item" key={card.Institution}>
                  <img
                    className="edu-logo"
                    src={card.imgPath}
                    alt=""
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div className="edu-body">
                    <div className="edu-head">
                      <span className="edu-title">{card.Institution}</span>
                      <span className="edu-meta">{card.date}</span>
                    </div>
                    <span className="mono muted">{card.title}</span>
                    <span className="badge badge--accent" style={{ justifySelf: "start" }}>
                      {EDUCATION_OVERRIDES[index]?.percentage ?? card.percentage}
                    </span>
                    {card.overview ? <p className="edu-overview">{card.overview}</p> : null}
                    {card.learnings?.length ? (
                      <ul className="case-list" style={{ marginTop: "0.35rem" }}>
                        {card.learnings.map((learning) => (
                          <li key={learning}>{learning}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="subsection">
        <div className="subsection-head">
          <h3 className="h3">How I work</h3>
          <span className="mono muted">{abilities.length} areas</span>
        </div>
        <div className="abilities-grid">
          {abilities.map((ability) => (
            <div className="ability" key={ability.title}>
              <img className="ability-icon" src={ability.imgPath} alt="" loading="lazy" />
              <span className="ability-title">{ability.title}</span>
              <p className="ability-desc">{ability.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <div className="subsection-head">
          <h3 className="h3">Development toolkit</h3>
        </div>
        <div className="cluster">
          {techStackImgs.map((item) => (
            <span className="skill-pill" key={item.name}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;