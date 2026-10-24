import { SYSTEM_LAYERS } from "../systems/taxonomy";

/**
 * The interactive systems map.
 *
 * It is a layered matrix: one row per system layer (ordered top→bottom the way a request
 * flows through a system), one column per system. A filled cell means that system's
 * implementation evidences that layer — it is never inferred.
 *
 * Accessibility:
 * - The matrix is a real <table> with row/column headers, so screen readers announce
 *   "layer / system" relationships.
 * - Every cell is a <button> with an explicit aria-label.
 * - Colour is never the only signal: filled cells are filled squares, empty cells are
 *   outlined, and the selected state is marked with aria-pressed / aria-current.
 * - Below 760px the matrix is replaced by a stacked card list (same data, same controls).
 */
const SystemsMap = ({
  systems,
  layerCounts,
  activeLayer,
  activeSystem,
  onSelectLayer,
  onOpenSystem,
  onHoverSystem,
}) => {
  if (!systems.length) {
    return (
      <div className="empty-state">
        No systems match the current filters. Reset the filters to see the full portfolio.
      </div>
    );
  }

  return (
    <>
      <div className="map-wrap">
        <div className="map-scroll">
          <table className="map" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <caption className="sr-only">
              Systems map. Rows are system layers, columns are projects. A filled cell means the
              project implements that layer.
            </caption>
            <thead>
              <tr>
                <th className="map-corner" scope="col">
                  Layer / System
                </th>
                {systems.map((system) => (
                  <th className="map-head" scope="col" key={system.id}>
                    <button
                      type="button"
                      className="map-head-btn"
                      data-active={activeSystem === system.id}
                      onClick={() => onOpenSystem(system)}
                      onMouseEnter={() => onHoverSystem(system)}
                      onFocus={() => onHoverSystem(system)}
                      onMouseLeave={() => onHoverSystem(null)}
                      onBlur={() => onHoverSystem(null)}
                      title={`${system.title} — ${system.summary}`}
                    >
                      <span className="map-head-title">{system.title}</span>
                      <span className="map-head-dot" aria-hidden="true" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEM_LAYERS.map((layer) => {
                const count = layerCounts[layer.key] ?? 0;
                return (
                  <tr key={layer.key}>
                    <th scope="row" style={{ padding: 0, border: 0, fontWeight: 400 }}>
                      <button
                        type="button"
                        className="map-rail-row"
                        aria-pressed={activeLayer === layer.key}
                        onClick={() => onSelectLayer(layer.key)}
                      >
                        <span>{layer.label}</span>
                        <span className="map-rail-count">{count}</span>
                      </button>
                    </th>
                    {systems.map((system) => {
                      const on = system.systemIds.includes(layer.key);
                      return (
                        <td className="map-cell-col" key={system.id} style={{ padding: 0 }}>
                          <button
                            type="button"
                            className="map-cell"
                            data-on={on}
                            data-active={activeSystem === system.id}
                            aria-label={
                              on
                                ? `${system.title} implements ${layer.label}`
                                : `${system.title} does not implement ${layer.label}`
                            }
                            onClick={() => (on ? onOpenSystem(system) : onSelectLayer(layer.key))}
                          >
                            <span className="map-cell-dot" aria-hidden="true" />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="map-legend">
          <span>
            <span className="legend-dot" aria-hidden="true" /> Layer evidenced
          </span>
          <span>
            <span className="legend-dot legend-dot--off" aria-hidden="true" /> Not implemented
          </span>
          <span>
            <span className="legend-dot legend-dot--accent" aria-hidden="true" /> Selected
          </span>
          <span>Select a layer name to filter · select a column to open the case study</span>
        </div>
      </div>

      {/* Mobile / small-screen equivalent */}
      <div className="map-mobile">
        {systems.map((system) => (
          <button
            type="button"
            key={system.id}
            className="sys-card"
            data-active={activeSystem === system.id}
            onClick={() => onOpenSystem(system)}
          >
            <span className="sys-card-top">
              <span className="sys-card-title">{system.title}</span>
              <span className="mono muted">{system.category}</span>
            </span>
            <span className="sys-card-summary">{system.summary}</span>
            <span className="layer-tags">
              {system.systemIds.map((id) => {
                const layer = SYSTEM_LAYERS.find((item) => item.key === id);
                return (
                  <span
                    className={`layer-tag ${activeLayer === id ? "layer-tag--accent" : ""}`}
                    key={id}
                  >
                    {layer?.short ?? id}
                  </span>
                );
              })}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default SystemsMap;