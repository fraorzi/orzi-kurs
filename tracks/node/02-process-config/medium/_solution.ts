export function solve(env: Record<string, string | undefined>): Readonly<{
  apiUrl: URL;
  timeoutMs: number;
  secret: string;
}> {
  if (!env.API_URL) throw new Error("Brak API_URL");
  const apiUrl = new URL(env.API_URL);
  const timeoutMs = Number(env.TIMEOUT_MS ?? "5000");
  if (!Number.isInteger(timeoutMs) || timeoutMs < 100)
    throw new Error("Błędny TIMEOUT_MS");
  const secret = env.APP_SECRET ?? "";
  if (env.NODE_ENV === "production" && secret.length < 32)
    throw new Error("Za krótki APP_SECRET");
  return Object.freeze({ apiUrl, timeoutMs, secret });
}
