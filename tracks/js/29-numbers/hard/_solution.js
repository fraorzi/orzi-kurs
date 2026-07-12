export function parseMoney(str) {
  const [whole, frac = ""] = str.split(".");
  const cents = (frac + "00").slice(0, 2);
  return Number(whole) * 100 + Number(cents);
}

export function formatMoney(cents) {
  const whole = Math.floor(cents / 100);
  const rem = cents % 100;
  return `${whole}.${String(rem).padStart(2, "0")}`;
}
