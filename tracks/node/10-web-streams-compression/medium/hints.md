## Hint 1

`Readable.toWeb(source) as ReadableStream<Uint8Array>` — mostek jest jedną
linią.

## Hint 2

`web.pipeThrough(new TransformStream({ transform(chunk, controller) {...} }))`
— w transformie `Buffer.from(chunk).toString().toUpperCase()` i `enqueue`.

## Hint 3

Uważaj na dekodowanie per chunk: `Readable.from(["żół", "ty"])` daje chunki na
granicach stringów, więc `toString()` per chunk tu wystarcza — ale zauważ,
że dla chunków binarnych z sieci użyłbyś dekodera z tematu 04.
