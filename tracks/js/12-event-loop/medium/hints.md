## Hint 1

Najprościej: async funkcja z pętlą po porcjach (`for` co `chunkSize`). Po przetworzeniu
porcji i wywołaniu `onProgress` zaczekaj na makrotask:
`await new Promise((r) => setTimeout(r))`.

## Hint 2

`await Promise.resolve()` ani `queueMicrotask` NIE przejdą testu — kontynuacja po nich
to mikrotask, a mikrotaski wykonują się przed makrotaskami, więc timer dalej czeka.
Oddanie kontroli = `setTimeout`.

## Hint 3

Szkielet: zewnętrzna pętla `for (let i = 0; i < items.length; i += chunkSize)`,
wewnętrzna po `items.slice(i, i + chunkSize)` z `results.push(process(item))`,
potem `onProgress(results.length, items.length)` i `await` makrotaska —
ale tylko jeśli zostały jeszcze elementy.
