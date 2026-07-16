export function summarize(samples) {
  const total = samples.reduce((sum, sample) => sum + sample.value, 0);
  return {
    count: samples.length,
    total,
    average: samples.length === 0 ? 0 : total / samples.length,
  };
}
