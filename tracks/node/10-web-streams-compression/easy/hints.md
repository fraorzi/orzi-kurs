## Hint 1

Pętla `while (true)` z `const { done, value } = await reader.read()` i `break`
przy `done`.

## Hint 2

Limit: `size += value.byteLength`; po przekroczeniu `await reader.cancel(...)`
**przed** `throw`.

## Hint 3

Sklejanie bez Buffer.concat: zaalokuj `new Uint8Array(size)` i wypełnij przez
`out.set(chunk, offset)`. `releaseLock()` idzie w `finally`.
