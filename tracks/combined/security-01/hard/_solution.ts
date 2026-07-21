export interface Input {
  requestId: string;
  role?: string;
  attempts: number;
  token?: string;
  password?: string;
}

export interface Decision {
  allowed: boolean;
  status: number;
  log: object;
}

const RATE_LIMIT_THRESHOLD = 10;

export function guard(input: Input): Decision {
  const authenticated = Boolean(input.token);
  const limited = input.attempts >= RATE_LIMIT_THRESHOLD;
  const allowed = authenticated && input.role === "editor" && !limited;

  const log = {
    requestId: input.requestId,
    role: input.role ?? "anonymous",
    outcome: allowed ? "allow" : "deny",
  };

  if (limited) {
    return { allowed, status: 429, log };
  }
  if (allowed) {
    return { allowed, status: 200, log };
  }
  if (authenticated) {
    return { allowed, status: 403, log };
  }
  return { allowed, status: 401, log };
}
