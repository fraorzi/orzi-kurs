export interface MetricSample {
  name: string;
  value: number;
}

export interface MetricSummary {
  count: number;
  total: number;
  average: number;
}

export function summarize(
  samples: readonly MetricSample[],
): MetricSummary;
