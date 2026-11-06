import { useMemo } from "react";
import { ALL_SYSTEMS } from "../systems/projects";
import { ROLE_VIEWS } from "../systems/roles";
import { PROFILE } from "../systems/resume";
import CaseStudyPanel from "../components/CaseStudyPanel";
import { useState } from "react";

const RolePage = ({ roleKey, onBack }) => {
  const view = ROLE_VIEWS[roleKey];
  const [openSystem, setOpenSystem] = useState(null);

  const featuredSystems = useMemo(() => {
    if (!view) return [];
    return view.featured
      .map((id) => ALL_SYSTEMS.find((s) => s.id === id))
      .filter(Boolean);
  }, [view]);

  if (!view) {
    return (
      <main id="main" className="section">
        <div className="shell">
          <h1 className="h2">Role not found</h1>
          <p className="lede">The requested role view does not exist.</p>
          <button className="btn btn--primary" onClick={onBack} type="button">
            Back to portfolio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <section className="section">
        <div className="shell">
          <button className="btn btn--quiet btn--sm" onClick={onBack} type="button" style={{ marginBottom: "1.5rem" }}>
            ← Back to portfolio
          </button>
          <p className="eyebrow">Role focus</p>
          <h1 className="h2">{view.title}</h1>
          <p className="lede">{view.intro}</p>

          <div className="subsection" style={{ marginTop: "2rem" }}>
            <div className="subsection-head">
              <h2 className="h3">Key strengths</h2>
            </div>
            <ul className="case-list">
              {view.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <div className="subsection-head">
              <h2 className="h3">Selected projects</h2>
              <span className="mono muted">{featuredSystems.length} featured</span>
            </div>
            <div className="index-grid">
              {featuredSystems.map((system) => (
                <article className="index-card" key={system.id}>
                  {system.image ? (
                    <div className="index-card-media">
                      <img src={system.image} alt={`${system.title} screenshot`} loading="lazy" />
                    </div>
                  ) : (
                    <div className="index-card-media index-card-media--fallback">{system.category}</div>
                  )}
                  <div className="index-card-body">
                    <div className="index-card-top">
                      <h3 className="index-card-title">{system.title}</h3>
                      {system.featured ? <span className="badge badge--accent">Featured</span> : null}
                    </div>
                    <p className="mono muted">{system.domain}</p>
                    <p className="index-card-desc">{system.summary}</p>
                    <div className="layer-tags">
                      {system.tech.slice(0, 4).map((item) => (
                        <span className="layer-tag" key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="index-card-actions">
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => setOpenSystem(system)}>
                        Case study
                      </button>
                      <a className="btn btn--quiet btn--sm" href={system.href} target="_blank" rel="noopener noreferrer">
                        Repository ↗
                      </a>
                      {system.demoUrl ? (
                        <a className="btn btn--quiet btn--sm" href={system.demoUrl} target="_blank" rel="noopener noreferrer">
                          Live ↗
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="subsection">
            <div className="subsection-head">
              <h2 className="h3">Why this work fits</h2>
            </div>
            <ul className="case-list">
              {view.evidence.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <div className="subsection-head">
              <h2 className="h3">Next steps</h2>
            </div>
            <div className="hero-actions">
              <a className="btn btn--primary" href={PROFILE.resumeFile} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
              <a className="btn btn--ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn btn--ghost" href={`mailto:${PROFILE.email}`}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
      <CaseStudyPanel system={openSystem} open={Boolean(openSystem)} onClose={() => setOpenSystem(null)} />
    </main>
  );
};

export default RolePage;
