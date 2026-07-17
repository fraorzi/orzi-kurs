export interface Input { requestId: string; role?: string; attempts: number; token?: string; password?: string }
export function guard(input: Input): { allowed: boolean; status: number; log: object } { const authenticated = Boolean(input.token); const limited = input.attempts >= 10; const allowed = authenticated && input.role === "editor" && !limited; return { allowed, status: limited ? 429 : allowed ? 200 : authenticated ? 403 : 401, log: { requestId: input.requestId, role: input.role ?? "anonymous", outcome: allowed ? "allow" : "deny" } }; }

