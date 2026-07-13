const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });

export function graphemeCount(str) {
  return [...seg.segment(str)].length;
}

export function truncateGraphemes(str, max) {
  return [...seg.segment(str)]
    .slice(0, max)
    .map((s) => s.segment)
    .join("");
}
