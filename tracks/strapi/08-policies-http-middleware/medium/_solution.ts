export interface Context { requestId?: string; state: { requestId?: string }; headers: Record<string, string> }
export async function solve(ctx: Context, next: () => Promise<void>, generate: () => string): Promise<void> {
  const requestId = ctx.requestId && /^[A-Za-z0-9-]{8,64}$/.test(ctx.requestId) ? ctx.requestId : generate();
  ctx.state.requestId = requestId;
  ctx.headers["x-request-id"] = requestId;
  await next();
}

