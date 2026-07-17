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
  const nsToMs = (value: number) => Math.round(value / 1e4) / 100;
  const p99Ms = nsToMs(metrics.p99Ns);
  return {
    p50Ms: nsToMs(metrics.p50Ns),
    p99Ms,
    maxMs: nsToMs(metrics.maxNs),
    degraded: p99Ms > budgetMs,
  };
}
