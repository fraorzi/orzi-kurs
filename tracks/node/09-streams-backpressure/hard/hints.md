## Hint 1

Trzy ogniwa: `Readable.from(lines)`, twój `Transform`, `Writable` zbierający
chunki do tablicy — spięte `await pipeline(a, b, c)`.

## Hint 2

W `transform(chunk, _enc, callback)`: doklej do `pending`, `split("\n")`,
ostatni element wraca do `pending` (`parts.pop()`), reszta po filtrze
`line.trim()` idzie w `this.push(line.toUpperCase() + "\n")`.

## Hint 3

`flush(callback)` to moment na końcówkę: jeżeli `pending.trim()` niepuste,
wypchnij uppercase **bez** dodawania `\n`.
