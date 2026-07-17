export async function readProfile(sessionId: string) {
  return { name: sessionId === "admin" ? "Administrator" : "Użytkownik" };
}
