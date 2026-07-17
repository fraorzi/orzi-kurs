// TODO: opisz rzeczywisty kontrakt legacy-metrics.js bez any.
export interface MetricSample {
  name: string;
  value: string;
}

export interface MetricSummary {
  count: number;
}

export function summarize(samples: unknown[]): MetricSummary;
