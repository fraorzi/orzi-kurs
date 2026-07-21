export type Middleware = (next: () => Promise<void>) => Promise<void>;
export function solve(middlewares: Middleware[], handler: () => Promise<void>): () => Promise<void> {
  return handler;
}

