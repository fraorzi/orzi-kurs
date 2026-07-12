export function capitalizeWords(str) {
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function censor(text, word) {
  return text.replace(new RegExp(word, "gi"), "*".repeat(word.length));
}
