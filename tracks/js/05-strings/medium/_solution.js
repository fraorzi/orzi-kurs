export function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }
  return str.slice(0, maxlength - 1) + "…";
}

export function camelize(str) {
  return str
    .split("-")
    .map((word, i) => (i === 0 || word === "" ? word : word[0].toUpperCase() + word.slice(1)))
    .join("");
}

export function maskCard(cardNumber) {
  return cardNumber.slice(-4).padStart(cardNumber.length, "*");
}
