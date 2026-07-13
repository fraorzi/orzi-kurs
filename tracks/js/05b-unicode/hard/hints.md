## Hint 1

Utwórz jeden segmenter na module: `const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" })`.
`seg.segment(str)` zwraca iterowalny obiekt segmentów; każdy segment ma pole `.segment`.

## Hint 2

`graphemeCount`: `[...seg.segment(str)].length`.
`truncateGraphemes`: rozłóż na segmenty, weź `slice(0, max)`, złóż z powrotem —
`[...seg.segment(str)].slice(0, max).map((s) => s.segment).join("")`.
