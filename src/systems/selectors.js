import { SYSTEMS } from "./projects";
import {
  DOMAIN_ORDER,
  LAYER_GROUPS,
  ROLE_KEYS,
  SYSTEM_LAYER_KEYS,
  groupOf,
} from "./taxonomy";

/**
 * Filtering logic for the systems map and the project index.
 *
 * Invariant enforced here: a filter NARROWS what is shown, it never removes a project from
 * the portfolio. `ALL_SYSTEMS` is always reachable through the "All Projects" control, and
 * every system keeps its own detail view regardless of the active filter.
 */

export const EMPTY_FILTER = { role: null, layer: null, query: "" };

/** Systems that appear on the systems map: only those with at least one evidenced layer. */
export const MAPPABLE_SYSTEMS = SYSTEMS.filter((system) => system.systemIds.length > 0);

/** Systems with no verifiable architecture are listed but never drawn on the map. */
export const UNVERIFIED_SYSTEMS = SYSTEMS.filter((system) => system.systemIds.length === 0);

export function matchesRole(system, role) {
  if (!role) return true;
  return system.roles.includes(role);
}

export function matchesLayer(system, layer) {
  if (!layer) return true;
  if (!system.systemIds.includes(layer)) return false;
  // Highlighting a layer also surfaces the adjacent capability groups it belongs to, so a
  // visitor who selects "Retrieval" can still see the systems it feeds.
  return true;
}

export function matchesQuery(system, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    system.title,
    system.domain,
    system.category,
    system.description,
    system.summary,
    ...system.tech,
    ...system.systemIds,
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function filterSystems(systems, { role, layer, query }) {
  return systems.filter(
    (system) =>
      matchesRole(system, role) &&
      matchesLayer(system, layer) &&
      matchesQuery(system, query),
  );
}

/** Which layers the given selection activates. `null` means "no layer filter". */
export function activeLayerKeys({ layer, role }) {
  if (layer) return [layer];
  if (!role) return [];
  const groups = SYSTEMS.filter((system) => system.roles.includes(role));
  const keys = new Set();
  groups.forEach((system) => system.systemIds.forEach((id) => keys.add(id)));
  return Array.from(keys);
}

/**
 * Counts shown next to each role chip: how many systems each role would yield *given the
 * other active filters*. Computed from the full set, never from the filtered set.
 */
export function roleCounts(filter) {
  const counts = Object.fromEntries(ROLE_KEYS.map((role) => [role, 0]));
  SYSTEMS.forEach((system) => {
    if (!matchesLayer(system, filter.layer) || !matchesQuery(system, filter.query)) return;
    system.roles.forEach((role) => {
      if (counts[role] !== undefined) counts[role] += 1;
    });
  });
  return counts;
}

/** Same idea for the layer rail. */
export function layerCounts(filter) {
  const counts = Object.fromEntries(SYSTEM_LAYER_KEYS.map((key) => [key, 0]));
  SYSTEMS.forEach((system) => {
    if (!matchesRole(system, filter.role) || !matchesQuery(system, filter.query)) return;
    system.systemIds.forEach((id) => {
      if (counts[id] !== undefined) counts[id] += 1;
    });
  });
  return counts;
}

export function isFilterActive(filter) {
  return Boolean(filter.role || filter.layer || filter.query.trim());
}

/**
 * Systems that group under a given capability cluster, used by the "domain" rails.
 * Grouping is derived from the systems passed in, so no filter argument is needed.
 */
export function groupByLayerGroup(systems) {
  const groups = new Map();
  systems.forEach((system) => {
    const keys = new Set(system.systemIds);
    Object.entries(LAYER_GROUPS).forEach(([group, members]) => {
      if (members.some((member) => keys.has(member))) {
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group).push(system);
      }
    });
  });
  return groups;
}

/** Systems grouped by their engineering domain, preserving DOMAIN_ORDER first. */
export function groupByDomain(systems) {
  const buckets = new Map();
  systems.forEach((system) => {
    const domain = groupOf(system);
    if (!buckets.has(domain)) buckets.set(domain, []);
    buckets.get(domain).push(system);
  });

  const ordered = [];
  DOMAIN_ORDER.forEach((domain) => {
    if (buckets.has(domain)) {
      ordered.push([domain, buckets.get(domain)]);
      buckets.delete(domain);
    }
  });

  // Anything not named in DOMAIN_ORDER still gets rendered, sorted, rather than dropped.
  Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([domain, list]) => ordered.push([domain, list]));

  return ordered;
}