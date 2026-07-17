export async function readProject(_id: string) {
  return {
    id: "p-1",
    name: "Migracja",
    status: "active" as const,
    budget: 100000,
    secretNotes: "acquisition target",
    memberIds: ["u-1"],
  };
}
