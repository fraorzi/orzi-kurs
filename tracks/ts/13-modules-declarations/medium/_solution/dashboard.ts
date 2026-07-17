import { summarize, type MetricSample } from "./legacy-metrics.js";

export function metricLine(
  name: string,
  samples: readonly MetricSample[],
): string {
  const summary = summarize(samples);
  return `${name}: count=${summary.count}, avg=${summary.average.toFixed(2)}`;
}
