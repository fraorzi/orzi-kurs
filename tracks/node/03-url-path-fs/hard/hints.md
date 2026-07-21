## Hint 1

Szkielet: `open(temp, "wx")` → `writeFile` na uchwycie → `sync()` → `close()`
→ `rename(temp, target)`. Kolejność sync przed rename jest częścią kontraktu.

## Hint 2

Trzymaj uchwyt w zmiennej `let handle` i po udanym `close()` ustaw
`handle = undefined` — wtedy `catch` może bezpiecznie zrobić
`await handle?.close()`.

## Hint 3

W `catch`: zamknij uchwyt, `await rm(temp, { force: true })`, `throw error`.
`force` sprawia, że sprzątanie nie wybucha, gdy temp nie zdążył powstać.
