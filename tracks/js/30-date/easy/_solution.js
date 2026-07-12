const DAY = 24 * 60 * 60 * 1000;

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY);
}

export function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / DAY);
}
