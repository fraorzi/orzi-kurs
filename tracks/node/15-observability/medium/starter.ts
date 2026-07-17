export function solve(
  metrics: {
    p50Ns: number;
    p99Ns: number;
    maxNs: number;
  },
  budgetMs: number,
): {
  p50Ms: number;
  p99Ms: number;
  maxMs: number;
  degraded: boolean;
} {
  throw new Error("TODO");
}
