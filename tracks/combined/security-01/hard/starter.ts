export interface Input { requestId: string; role?: string; attempts: number; token?: string; password?: string }
export function guard(input: Input) {
  return {
    allowed: Boolean(input.token),
    status: input.token ? 200 : 401,
    log: { ...input },
  };
}
