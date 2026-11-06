import { useMemo, useState } from "react";
import { ALL_SYSTEMS } from "../systems/projects";
import CaseStudyPanel from "./CaseStudyPanel";

const FeaturedWork = () => {
  const [openSystem, setOpenSystem] = useState(null);
  const featured = useMemo(() => ALL_SYSTEMS.filter((s) => s.featured), []);

  return (
    <section id="featured" className="section">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">Featured projects.</h2>
          <p className="lede">
            A small set of the strongest systems. Open any card for the full case study, or
            browse the complete inventory under “All work.”
          </p>
        </div>
        <div className="index-grid">
          {featured.map((system) => (
            <article className="index-card index-card--clickable" key={system.id}>
              {system.image ? (
                <div className="index-card-media">
                  <img src={system.image} alt={`${system.title} screenshot`} loading="lazy" />
                </div>
              ) : (
                <div className="index-card-media index-card-media--fallback">{system.category}</div>
              )}
              <div className="index-card-body">
                <div className="index-card-top">
                  <h3 className="index-card-title">
                    <button
                      type="button"
                      className="index-card-title-btn"
                      onClick={() => setOpenSystem(system)}
                      aria-label={`Open case study for ${system.title}`}
                    >
                      {system.title}
                    </button>
                  </h3>
                  <span className="badge badge--accent">Featured</span>
                </div>
                <p className="mono muted">{system.domain}</p>
                <p className="index-card-desc">{system.summary}</p>
                <div className="layer-tags">
                  {system.tech.slice(0, 4).map((item) => (
                    <span className="layer-tag" key={item}>{item}</span>
                  ))}
                </div>
                <div className="index-card-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSystem(system);
                    }}
                  >
                    Case study
                  </button>
                  <a
                    className="btn btn--quiet btn--sm"
                    href={system.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Repository ↗
                  </a>
                  {system.demoUrl ? (
                    <a
                      className="btn btn--quiet btn--sm"
                      href={system.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CaseStudyPanel system={openSystem} open={Boolean(openSystem)} onClose={() => setOpenSystem(null)} />
    </section>
  );
};

export default FeaturedWork;
