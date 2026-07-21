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

export function guard(input: Input): Decision {
  const authenticated = Boolean(input.token);

  return {
    allowed: authenticated,
    status: authenticated ? 200 : 401,
    log: { ...input },
  };
}
