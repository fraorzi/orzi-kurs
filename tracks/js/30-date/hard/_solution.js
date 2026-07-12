const UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

export function relativeTime(date, now) {
  const diffMs = date.getTime() - now.getTime();
  const sign = Math.sign(diffMs);
  const absSeconds = Math.abs(diffMs) / 1000;

  for (const [unit, seconds] of UNITS) {
    if (absSeconds >= seconds) {
      return { value: sign * Math.floor(absSeconds / seconds), unit };
    }
  }

  if (absSeconds >= 1) {
    return { value: sign * Math.floor(absSeconds), unit: "second" };
  }
  return { value: 0, unit: "second" };
}
