import type { Incident } from "./types";

export interface IncidentStore {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => readonly Incident[];
  readonly getServerSnapshot: () => readonly Incident[];
  readonly addIncident: (incident: Incident) => void;
}

export function createIncidentStore(
  initialIncidents: readonly Incident[],
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
