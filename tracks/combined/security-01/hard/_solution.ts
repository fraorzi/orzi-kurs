export interface Input { requestId: string; role?: string; attempts: number; token?: string; password?: string }
export function guard(input: Input): { allowed: boolean; status: number; log: object } {
  const authenticated = Boolean(input.token);
  const limited = input.attempts >= 10;
  const allowed = authenticated && input.role === "editor" && !limited;
  let status = 401;
  if (limited) status = 429;
  else if (allowed) status = 200;
  else if (authenticated) status = 403;
  return {
    allowed,
    status,
    log: {
      requestId: input.requestId,
      role: input.role ?? "anonymous",
      outcome: allowed ? "allow" : "deny",
    },
  };
}
