export function solve(
  routes: readonly {
    method: string;
    path: string;
  }[],
  method: string,
  rawUrl: string,
): {
  status: 200 | 404 | 405;
  allow?: string[];
} {
  throw new Error("TODO");
}
