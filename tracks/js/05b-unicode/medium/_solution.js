export function reverse(str) {
  return [...str].reverse().join("");
}

export function equalIgnoringForm(a, b) {
  return a.normalize("NFC") === b.normalize("NFC");
}
