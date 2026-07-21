export interface Context { requestId?: string; state: { requestId?: string }; headers: Record<string, string> }
export async function solve(ctx: Context, next: () => Promise<void>, generate: () => string): Promise<void> {
  await next();
}

