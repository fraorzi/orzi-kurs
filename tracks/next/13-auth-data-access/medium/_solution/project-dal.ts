import "server-only";

import { readProject } from "./project-store";
import { currentViewer } from "./security";

export async function getProjectDTO(id: string) {
  const viewer = await currentViewer();
  const project = await readProject(id);
  if (!project || !project.memberIds.includes(viewer.userId)) {
    throw new Error("Project not found");
  }
  return { id: project.id, name: project.name, status: project.status };
}
