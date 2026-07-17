import { currentViewer } from "./security";
import { readTeamMembers } from "./team-store";

export async function getTeamDirectory(teamId: string) {
  await currentViewer();
  return readTeamMembers(teamId);
}
