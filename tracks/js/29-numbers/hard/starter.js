export function parseMoney(str) {
  return Number(str) * 100;
}

export function formatMoney(cents) {
  const zloty = cents / 100;
  return String(zloty.toFixed(2));
}
