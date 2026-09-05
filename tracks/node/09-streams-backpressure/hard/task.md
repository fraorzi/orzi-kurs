# Hard - zbuduj pipeline transformacji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Złóż z klasycznych streamów potok NDJSON → uppercase. Zaimplementuj
`solve(lines)`:

- źródło: `Readable.from(lines)` - elementy tablicy to **chunki**, które mogą
  nieść wiele linii albo ułamek linii;
- `Transform` skleja chunki, dzieli po `\n`, pomija linie puste/białe
  i przepuszcza pozostałe uppercase z `\n`;
- `flush` obsługuje końcówkę bez newline;
- ujście zbiera bajty; całość spina `pipeline` z `node:stream/promises` -
  wynik to zebrany string.
