export function groupByFirstLetter(words) {
  return Object.groupBy(words, (w) => w[0]);
}
