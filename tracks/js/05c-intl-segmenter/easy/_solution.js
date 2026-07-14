export function countWords(text, locale) {
  const seg = new Intl.Segmenter(locale, { granularity: "word" });
  return [...seg.segment(text)].filter((s) => s.isWordLike).length;
}

export function wordList(text, locale) {
  const seg = new Intl.Segmenter(locale, { granularity: "word" });
  return [...seg.segment(text)].filter((s) => s.isWordLike).map((s) => s.segment);
}
