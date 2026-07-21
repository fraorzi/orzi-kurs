export type Middleware = (next: () => Promise<void>) => Promise<void>;
export function solve(middlewares: Middleware[], handler: () => Promise<void>): () => Promise<void> {
  return middlewares.reduceRight<() => Promise<void>>((next, middleware) => () => middleware(next), handler);
}

