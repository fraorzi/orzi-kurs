import "server-only";

import { currentViewer } from "./security";
import { readTeamMembers } from "./team-store";

export async function getTeamDirectory(teamId: string) {
  const viewer = await currentViewer();
  if (viewer.teamId !== teamId) throw new Error("Team not found");
  const members = await readTeamMembers(teamId);
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    ...(viewer.role === "admin" ? { email: member.email } : {}),
  }));
}
