## Hint 1

Najpierw `const body = Buffer.from(payload)` — długość liczysz z
`body.length`, nie z `payload.length`.

## Hint 2

Zaalokuj cały bufor raz: `Buffer.allocUnsafe(5 + body.length)` i wypełnij go
w całości (`writeUInt32BE` na 0, `writeUInt8` na 4, `body.copy(frame, 5)`).

## Hint 3

Pole długości = `body.length + 1`, bo obejmuje bajt typu. Rozjazd tutaj to
klasyczny bug framingowy — odbiorca zacznie czytać następną ramkę w złym
miejscu.
