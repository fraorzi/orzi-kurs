## Hint 1

Pierwszy wiersz funkcji to strażnik: `if (!await deps.authorize()) throw new Error("Forbidden")`
— zanim cokolwiek innego się wydarzy.

## Hint 2

`try/catch` obejmuje wyłącznie `link(id)`, nie `upload()` — sprzątanie
(`remove(id)`) ma sens dopiero, gdy `id` istnieje.

## Hint 3

W `catch` najpierw `await deps.remove(id)`, potem `throw error` — kolejność
odwrotna zostawiłaby nierzucony błąd albo osierocony plik.
