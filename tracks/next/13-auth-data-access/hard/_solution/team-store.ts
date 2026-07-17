export async function readTeamMembers(_teamId: string) {
  return [{
    id: "u-2", name: "Alicja", email: "a@example.com", teamId: "t-1",
    role: "member", passwordHash: "hash", recoveryToken: "token",
  }];
}
