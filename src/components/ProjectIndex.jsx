import { useMemo, useState } from "react";
import { ALL_SYSTEMS } from "../systems/projects";
import { groupByDomain } from "../systems/selectors";
import CaseStudyPanel from "./CaseStudyPanel";

/**
 * Compact "Explore all projects" directory.
 *
 * One authoritative record per project (from `src/systems/projects.js`). This is the
 * secondary exploration view: a searchable, filterable list rather than a second full
 * card grid duplicating the systems map above.
 */
const ProjectRow = ({ system, onOpen }) => (
  <li className="index-row">
    <button type="button" className="index-row-main" onClick={() => onOpen(system)}>
      <span className="index-row-title">{system.title}</span>
      <span className="mono muted index-row-domain">{system.domain}</span>
    </button>
    <div className="index-row-actions">
      <a className="btn btn--quiet btn--sm" href={system.href} target="_blank" rel="noopener noreferrer">
        Repo ↗
      </a>
      {system.demoUrl ? (
        <a className="btn btn--quiet btn--sm" href={system.demoUrl} target="_blank" rel="noopener noreferrer">
          Live ↗
        </a>
      ) : null}
    </div>
  </li>
);

const ProjectIndex = () => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openSystem, setOpenSystem] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_SYSTEMS;
    return ALL_SYSTEMS.filter((s) =>
      [s.title, s.domain, s.category, s.summary, ...s.tech].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => groupByDomain(filtered), [filtered]);

  return (
    <section id="work" className="section">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Explore all projects</p>
          <h2 className="h2">Complete project inventory.</h2>
          <p className="lede">
            All {ALL_SYSTEMS.length} verified systems in one searchable list. Open any row for its
            case study; the systems map above shows architecture and relationships.
          </p>
        </div>

        <div className="toolbar-foot" style={{ marginBottom: "1.5rem" }}>
          <div className="search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, domains…"
              aria-label="Search projects"
            />
          </div>
          <span className="result-count" aria-live="polite">
            {filtered.length} of {ALL_SYSTEMS.length}
          </span>
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Collapse" : "Show all"}
          </button>
        </div>

        {expanded || query.trim() ? (
          groups.map(([domain, systems]) => (
            <div className="subsection" key={domain}>
              <div className="subsection-head">
                <h3 className="h3">{domain}</h3>
                <span className="mono muted">
                  {systems.length} system{systems.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="index-list">
                {systems.map((system) => (
                  <ProjectRow key={system.id} system={system} onOpen={setOpenSystem} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="muted">
            {ALL_SYSTEMS.length} systems available. Use search or “Show all” to browse.
          </p>
        )}
      </div>

      <CaseStudyPanel system={openSystem} open={Boolean(openSystem)} onClose={() => setOpenSystem(null)} />
    </section>
  );
};

export default ProjectIndex;
