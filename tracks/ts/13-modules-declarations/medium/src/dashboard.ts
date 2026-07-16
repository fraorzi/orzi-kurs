import { summarize, type MetricSample } from "./legacy-metrics.js";

export function metricLine(
  name: string,
  samples: readonly MetricSample[],
): string {
  // TODO
  return `${name}: ${summarize(samples).count}`;
}
