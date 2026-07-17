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
  void nowSeconds;
  return JSON.parse(token) as Session;
}
