export function analyze(text, locale) {
  const wordSeg = new Intl.Segmenter(locale, { granularity: "word" });
  const sentenceSeg = new Intl.Segmenter(locale, { granularity: "sentence" });

  const words = [...wordSeg.segment(text)].filter((s) => s.isWordLike).map((s) => s.segment);

  const sentences = [...sentenceSeg.segment(text)]
    .map((s) => s.segment.trim())
    .filter((s) => s.length > 0);

  const unique = new Set(words.map((w) => w.toLowerCase()));

  let longestWord = "";
  for (const word of words) {
    if (word.length > longestWord.length) longestWord = word;
  }

  return {
    words: words.length,
    sentences: sentences.length,
    uniqueWords: unique.size,
    longestWord,
  };
}
