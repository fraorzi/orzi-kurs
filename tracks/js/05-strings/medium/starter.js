export function truncate(str, maxlength) {
  return str.length <= maxlength
    ? str
    : str.slice(0, maxlength - 1) + "…";
}

export function camelize(str) {
  return str
    .split("-")
    .map((word, index) =>
      index !== 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word,
    )
    .join("");
}

export function maskCard(cardNumber) {
  return cardNumber
    .slice(-4)
    .padStart(cardNumber.length, "*");
}
