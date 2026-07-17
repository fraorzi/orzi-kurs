import { readProject } from "./project-store";
import { currentViewer } from "./security";

export async function getProjectDTO(id: string) {
  await currentViewer();
  return readProject(id);
}
