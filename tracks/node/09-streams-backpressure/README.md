# Streamy i backpressure

Stream przetwarza dane porcjami, ze stałą pamięcią — plik 10 GB przechodzi
przez proces zajmujący megabajty. Warunkiem jest **backpressure**: wolny
odbiorca musi umieć przyhamować szybkiego nadawcę.

Kontrakt Writable jest prosty i bezlitosny:

- `write(chunk)` zwraca `false`, gdy wewnętrzny bufor przekroczył
  `highWaterMark` — to prośba "przestań pisać";
- pisanie dalej mimo `false` **działa**, ale bufor rośnie bez ograniczeń —
  to najczęstszy wyciek pamięci w kodzie streamowym, bo niczego nie psuje
  w testach na małych danych;
- po `false` czekasz na zdarzenie `drain` (`await once(writable, "drain")`)
  i dopiero wtedy piszesz kolejny chunk.

## pipeline zamiast ręcznego pipe

`stream.pipeline` (wersja promisowa z `node:stream/promises`) łączy źródło,
transformacje i ujście, obsługując backpressure, propagację błędów i sprzątanie
wszystkich ogniw. Ręczne `source.pipe(t1).pipe(sink)` nie zamyka źródła, gdy
ujście padnie — `pipeline` tak. Do budowy ogniw służą `Readable.from`
(iterable → stream), `Transform` (z `flush` na końcówkę danych) i `Writable`.

## Framing linii

Chunki nie respektują granic rekordów: linia NDJSON może przyjść w trzech
kawałkach albo trzy linie w jednym chunku. Wzorzec: trzymaj `pending` między
chunkami, wycinaj pełne linie po `\n`, resztę doklej do następnego chunka,
a w `flush` obsłuż ostatnią linię bez znaku nowej linii.

## Kiedy używać

- Pliki, sockety, body HTTP — wszystko większe niż komfortowy bufor w pamięci.
- Transformacje danych w locie: parsowanie NDJSON, kompresja, filtrowanie.
- Każde miejsce, gdzie producent bywa szybszy od konsumenta.

## Kiedy unikać

- Małe dane jednorazowe: `readFile`/`writeFile` są prostsze i wystarczą.
- Nie pisz własnej logiki pipe/backpressure, gdy `pipeline` załatwia sprawę.
- Nowe API projektuj raczej na Web Streams (temat 10); klasyczne streamy
  znaj dla całego istniejącego ekosystemu Node.

## Pułapki

- Zignorowany `false` z `write()` nie rzuca — po prostu rośnie RSS procesu.
- `drain` emituje się raz na przejście bufora pod próg; `once`, nie `on`.
- Zapomniany `flush` w Transform gubi ostatni niedokończony rekord.
- `pipeline` niszczy wszystkie ogniwa przy błędzie — nie zamykaj ich ręcznie
  w `catch`, bo podwójne zamknięcie też bywa błędem.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Stream](https://nodejs.org/download/release/latest-v24.x/docs/api/stream.html)
- [Backpressuring in streams](https://nodejs.org/en/learn/modules/backpressuring-in-streams)
