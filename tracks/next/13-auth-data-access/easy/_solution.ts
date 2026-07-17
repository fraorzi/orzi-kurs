export interface Session {
  readonly userId: string;
  readonly role: "member" | "admin";
  readonly expiresAt: number;
}

export async function readSession(
  token: string,
  verify: (token: string) => Promise<unknown>,
  nowSeconds: number,
): Promise<Session | null> {
  try {
    const payload = await verify(token);
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("userId" in payload) ||
      typeof payload.userId !== "string" ||
      payload.userId.trim() === "" ||
      !("role" in payload) ||
      (payload.role !== "member" && payload.role !== "admin") ||
      !("expiresAt" in payload) ||
      typeof payload.expiresAt !== "number" ||
      !Number.isInteger(payload.expiresAt) ||
      payload.expiresAt <= nowSeconds
    ) return null;

    return {
      userId: payload.userId,
      role: payload.role,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}
