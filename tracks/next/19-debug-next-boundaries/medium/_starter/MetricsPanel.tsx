import { getMetrics } from "./metrics-dal";

export async function MetricsPanel() {
  const metrics = await getMetrics();
  return <p>Przychód: {metrics.revenue}</p>;
}
