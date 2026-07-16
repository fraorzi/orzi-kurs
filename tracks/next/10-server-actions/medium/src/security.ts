export async function currentSession(): Promise<{ readonly userId: string } | null> {
  return { userId: "u-1" };
}

export async function canEditProject(userId: string, projectId: string): Promise<boolean> {
  return userId === "u-1" && projectId === "p-1";
}
