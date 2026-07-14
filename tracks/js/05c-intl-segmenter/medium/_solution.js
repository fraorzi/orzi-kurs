export function splitSentences(text, locale) {
  const seg = new Intl.Segmenter(locale, { granularity: "sentence" });
  return [...seg.segment(text)]
    .map((s) => s.segment.trim())
    .filter((s) => s.length > 0);
}

function wordCount(text, locale) {
  const seg = new Intl.Segmenter(locale, { granularity: "word" });
  return [...seg.segment(text)].filter((s) => s.isWordLike).length;
}

export function longestSentence(text, locale) {
  let best = "";
  let bestWords = -1;
  for (const sentence of splitSentences(text, locale)) {
    const n = wordCount(sentence, locale);
    if (n > bestWords) {
      bestWords = n;
      best = sentence;
    }
  }
  return best;
}
