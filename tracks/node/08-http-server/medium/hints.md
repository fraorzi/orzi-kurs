## Hint 1

Licznik `size += chunk.byteLength` i strażnik `if (size > maxBytes) throw`
**wewnątrz** pętli — rzucenie w `for await` przerywa iterację, więc kolejne
chunki nie zostaną pobrane.

## Hint 2

Sklejanie: zbieraj `Buffer.from(chunk)` do tablicy, po pętli
`Buffer.concat(chunks).toString("utf8")`.

## Hint 3

`JSON.parse` opakuj w try/catch i przetłumacz na własny błąd z `400` —
komunikaty `413`/`400` to część kontraktu, testy je rozróżniają.
