import type { Incident } from "./types";

export interface IncidentStore {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => Incident[];
  getServerSnapshot: () => Incident[];
  addIncident: (incident: Incident) => void;
}

export function createIncidentStore(
  initialIncidents: Incident[],
): IncidentStore {
  const listeners = new Set<() => void>();
  let snapshot = [...initialIncidents];

  return {
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => snapshot,
    addIncident(incident) {
      snapshot = [incident];
      listeners.forEach((listener) => listener());
    },
  };
}
