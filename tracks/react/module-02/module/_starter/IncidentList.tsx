import type { Incident } from "./types";

export function IncidentList({
  incidents,
}: {
  incidents: readonly Incident[];
}) {
  return (
    <ul aria-label="Incydenty">
      {incidents.map((incident) => (
        <li key={incident.id}>
          {incident.title}{" "}
          {incident.pending && "(tworzenie…)"}
        </li>
      ))}
    </ul>
  );
}
