export function extractPrices(text) {
  return [...text.matchAll(/(?<=\$)\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}

export function extractMentions(text) {
  return [...text.matchAll(/(?<=@)\w+/g)].map((m) => m[0]);
}
