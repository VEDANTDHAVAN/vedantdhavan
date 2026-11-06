import { useMemo, useState, useEffect, useRef } from "react";
import SystemsMap from "../components/SystemsMap";
import CaseStudyPanel from "../components/CaseStudyPanel";
import { ROLES, SYSTEM_LAYERS } from "../systems/taxonomy";
import { ALL_SYSTEMS } from "../systems/projects";
import {
  EMPTY_FILTER,
  filterSystems,
  isFilterActive,
  layerCounts,
  matchesLayer,
  matchesQuery,
  roleCounts,
} from "../systems/selectors";

const ROLE_TO_PARAM = {
  sde: "sde",
  "ai-engineer": "ai-engineer",
  fde: "fde",
  "ml-engineer": "ml-engineer",
  fullstack: "full-stack",
};
const PARAM_TO_ROLE = {
  all: null,
  sde: "sde",
  "ai-engineer": "ai-engineer",
  fde: "fde",
  "ml-engineer": "ml-engineer",
  "full-stack": "fullstack",
};

function readRoleFromUrl() {
  try {
    const param = new URLSearchParams(window.location.search).get("role");
    if (param === null) return null;
    return Object.prototype.hasOwnProperty.call(PARAM_TO_ROLE, param)
      ? PARAM_TO_ROLE[param]
      : null;
  } catch {
    return null;
  }
}

const SectionHeading = ({ eyebrow, title, lede }) => (
  <div className="section-head">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="h2">{title}</h2>
    {lede ? <p className="lede">{lede}</p> : null}
  </div>
);

/**
 * The Systems section is the portfolio's organising element.
 *
 * Filtering narrows what is *shown*; it never removes a project. Every system remains
 * reachable through the "All systems" reset and the full index below the map, which always
 * renders the complete portfolio.
 */
const SystemsSection = () => {
  const [filter, setFilter] = useState(() => ({
    ...EMPTY_FILTER,
    role: readRoleFromUrl(),
  }));
  const [openSystem, setOpenSystem] = useState(null);

  const mountedRef = useRef(false);
  const skipPushRef = useRef(false);

  // Keep the URL in sync with the active role so views are shareable and
  // back/forward navigation works. Initial load uses replaceState (no new
  // history entry); subsequent user changes use pushState.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      const param = filter.role === null ? "all" : ROLE_TO_PARAM[filter.role] ?? "all";
      const url = new URL(window.location.href);
      if (url.searchParams.get("role") !== param) {
        url.searchParams.set("role", param);
        window.history.replaceState(null, "", url.toString());
      }
      return;
    }
    if (skipPushRef.current) {
      skipPushRef.current = false;
      return;
    }
    const param = filter.role === null ? "all" : ROLE_TO_PARAM[filter.role] ?? "all";
    const url = new URL(window.location.href);
    if (url.searchParams.get("role") !== param) {
      url.searchParams.set("role", param);
      window.history.pushState(null, "", url.toString());
    }
  }, [filter.role]);

  useEffect(() => {
    const onPop = () => {
      skipPushRef.current = true;
      setFilter((current) => ({ ...current, role: readRoleFromUrl() }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const roleTally = useMemo(() => roleCounts(filter), [filter]);
  const layerTally = useMemo(() => layerCounts(filter), [filter]);

  const visible = useMemo(() => filterSystems(ALL_SYSTEMS, filter), [filter]);
  const mappable = useMemo(() => visible.filter((system) => system.systemIds.length > 0), [visible]);

  const unverifiedVisible = visible.filter((system) => system.systemIds.length === 0);

  const allCount = useMemo(
    () =>
      ALL_SYSTEMS.filter(
        (system) => matchesLayer(system, filter.layer) && matchesQuery(system, filter.query),
      ).length,
    [filter.layer, filter.query],
  );

  const setRole = (role) =>
    setFilter((current) => ({ ...current, role: current.role === role ? null : role }));

  const setLayer = (layer) =>
    setFilter((current) => ({ ...current, layer: current.layer === layer ? null : layer }));

  const reset = () => setFilter(EMPTY_FILTER);

  return (
    <section id="systems" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="The map"
          title="Systems map."
          lede="Every project here is shown as a system: which engineering layers it actually implements, and which roles that makes it relevant for. A layer is only drawn where the implementation evidences it."
        />

        <div className="systems-toolbar">
          <div className="filter-row">
            <span className="filter-label" id="role-filter-label">
              Explore by role
            </span>
            <div className="chips" role="group" aria-labelledby="role-filter-label">
              <button
                type="button"
                className="chip"
                aria-pressed={filter.role === null}
                onClick={() => setFilter((current) => ({ ...current, role: null }))}
                title="Every system in the portfolio, regardless of role."
              >
                All
                <span className="chip-count">{allCount}</span>
              </button>
              {ROLES.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  className="chip"
                  aria-pressed={filter.role === role.key}
                  onClick={() => setRole(role.key)}
                  title={role.blurb}
                >
                  {role.label}
                  <span className="chip-count">{roleTally[role.key]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label" id="layer-filter-label">
              Highlight a layer
            </span>
            <div className="chips" role="group" aria-labelledby="layer-filter-label">
              {SYSTEM_LAYERS.map((layer) => (
                <button
                  key={layer.key}
                  type="button"
                  className="chip chip--layer"
                  aria-pressed={filter.layer === layer.key}
                  onClick={() => setLayer(layer.key)}
                >
                  {layer.short}
                  <span className="chip-count">{layerTally[layer.key]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="toolbar-foot">
            <div className="search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={filter.query}
                onChange={(event) =>
                  setFilter((current) => ({ ...current, query: event.target.value }))
                }
                placeholder="Search systems, tech, domains…"
                aria-label="Search systems"
              />
            </div>

            <span className="result-count" aria-live="polite">
              {visible.length} of {ALL_SYSTEMS.length} systems
            </span>

            {isFilterActive(filter) ? (
              <button type="button" className="btn btn--quiet btn--sm" onClick={reset}>
                Reset filters
              </button>
            ) : null}
          </div>
        </div>

        <SystemsMap
          systems={mappable}
          layerCounts={layerTally}
          activeLayer={filter.layer}
          activeSystem={null}
          onSelectLayer={setLayer}
          onOpenSystem={setOpenSystem}
          onHoverSystem={() => {}}
        />

        {unverifiedVisible.length ? (
          <div className="unverified-list">
            <h3 className="h3">Could not be verified</h3>
            {unverifiedVisible.map((system) => (
              <button
                type="button"
                key={system.id}
                className="sys-card"
                onClick={() => setOpenSystem(system)}
              >
                <span className="sys-card-top">
                  <span className="sys-card-title">{system.title}</span>
                  <span className="badge badge--warn">Repository unreachable</span>
                </span>
                <span className="sys-card-summary">{system.summary}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <CaseStudyPanel system={openSystem} open={Boolean(openSystem)} onClose={() => setOpenSystem(null)} />
    </section>
  );
};

export default SystemsSection;