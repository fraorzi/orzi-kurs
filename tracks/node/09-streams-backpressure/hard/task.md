# Hard — zbuduj pipeline transformacji

Złóż z klasycznych streamów potok NDJSON → uppercase. Zaimplementuj
`solve(lines)`:

- źródło: `Readable.from(lines)` — elementy tablicy to **chunki**, które mogą
  nieść wiele linii albo ułamek linii;
- `Transform` skleja chunki, dzieli po `\n`, pomija linie puste/białe
  i przepuszcza pozostałe uppercase z `\n`;
- `flush` obsługuje końcówkę bez newline;
- ujście zbiera bajty; całość spina `pipeline` z `node:stream/promises` —
  wynik to zebrany string.
