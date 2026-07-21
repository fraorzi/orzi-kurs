## Hint 1

Zawężanie zaczyna się od `if (!input || typeof input !== "object") throw`,
potem rzutowanie na `Record<string, unknown>` i sprawdzanie pola po polu.

## Hint 2

Rozmiar tekstu: `Buffer.byteLength(value.text)` — "ż" ma 2 bajty, więc 600
znaków "ż" przekracza limit 1024.

## Hint 3

`typeof cost === "number"` to za mało — dopiero `Number.isFinite(cost)`
odrzuca `NaN` i `Infinity`. Wynik buduj jawnie z trzech pól.
