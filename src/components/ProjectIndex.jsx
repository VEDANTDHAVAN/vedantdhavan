import { useState } from "react";
import { ALL_SYSTEMS } from "../systems/projects";
import { groupByDomain } from "../systems/selectors";
import CaseStudyPanel from "./CaseStudyPanel";

/**
 * The complete portfolio index.
 *
 * This view is deliberately NOT filtered by the role/layer controls — it always renders
 * every system, including ones with no verifiable architecture. That is what makes the
 * "All Projects" guarantee real: no project can become unreachable through filtering.
 */
const ProjectCard = ({ system, onOpen }) => (
  <article className="index-card">
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
        {system.stage === "unverified" ? (
          <span className="badge badge--warn">Unverified</span>
        ) : null}
      </div>

      <p className="mono muted">{system.domain}</p>

      <p className="index-card-desc">{system.summary}</p>

      <div className="layer-tags">
        {system.tech.slice(0, 4).map((item) => (
          <span className="layer-tag" key={item}>
            {item}
          </span>
        ))}
        {system.tech.length > 4 ? (
          <span className="layer-tag">+{system.tech.length - 4}</span>
        ) : null}
      </div>

      <div className="index-card-actions">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => onOpen(system)}
        >
          Case study
        </button>
        <a
          className="btn btn--quiet btn--sm"
          href={system.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={system.stage === "unverified" ? "true" : undefined}
          tabIndex={system.stage === "unverified" ? -1 : undefined}
        >
          Repository ↗
        </a>
        {system.demoUrl ? (
          <a
            className="btn btn--quiet btn--sm"
            href={system.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live ↗
          </a>
        ) : null}
      </div>
    </div>
  </article>
);

const ProjectIndex = () => {
  const [openSystem, setOpenSystem] = useState(null);
  const groups = groupByDomain(ALL_SYSTEMS);

  return (
    <section id="work" className="section">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">All projects</p>
          <h2 className="h2">The complete portfolio.</h2>
          <p className="lede">
            Every system in this portfolio, grouped by engineering domain. Nothing here is
            filtered — all {ALL_SYSTEMS.length} are always listed.
          </p>
        </div>

        {groups.map(([domain, systems]) => (
          <div className="subsection" key={domain}>
            <div className="subsection-head">
              <h3 className="h3">{domain}</h3>
              <span className="mono muted">
                {systems.length} system{systems.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="index-grid">
              {systems.map((system) => (
                <ProjectCard key={system.id} system={system} onOpen={setOpenSystem} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <CaseStudyPanel
        system={openSystem}
        open={Boolean(openSystem)}
        onClose={() => setOpenSystem(null)}
      />
    </section>
  );
};

export default ProjectIndex;