export function isWeekend(date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

export function formatISODate(date) {
  return date.toISOString().slice(0, 10);
}
