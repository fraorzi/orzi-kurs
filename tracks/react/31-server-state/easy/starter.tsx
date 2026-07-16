import { useQuery } from "@tanstack/react-query";

export type ProjectStatus = "active" | "archived";

export interface Project {
  readonly id: string;
  readonly name: string;
}

export type FetchProjects = (
  status: ProjectStatus,
  signal: AbortSignal,
) => Promise<readonly Project[]>;

export function ProjectList({
  status,
  fetchProjects,
}: {
  readonly status: ProjectStatus;
  readonly fetchProjects: FetchProjects;
}) {
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: ({ signal }) => fetchProjects(status, signal),
  });

  if (projects.isPending) return <p>Ładowanie projektów…</p>;
  if (projects.isError) return <p role="alert">Nie udało się pobrać projektów.</p>;
  if (projects.data.length === 0) return <p>Brak projektów.</p>;

  return (
    <ul aria-label="Projekty">
      {projects.data.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
