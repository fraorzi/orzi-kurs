# Hints

## Hint 1

`await run()` bez `try/catch` sprawia, że rzucony błąd wychodzi z
`solve` natychmiast, pomijając `cleanup()` w ogóle — potrzebujesz
`try { await run(); } catch (error) { ... }`, żeby dojść do sprzątania
niezależnie od wyniku `run`.

## Hint 2

Zapamiętaj błąd `run` w zmiennej (`let failure: unknown`) zamiast go
od razu rzucać. `cleanup()` też uruchom w `try/catch` — jeśli sam
rzuci, a `failure` jest jeszcze puste (`undefined`), dopiero wtedy
podstaw błąd `cleanup` jako wynikowy.

## Hint 3

`setup()` zostaw **poza** blokiem `try/catch` obejmującym `run`/`cleanup`
— jego błąd ma polecieć od razu, bez wykonywania czegokolwiek dalej. Na
końcu: `if (failure !== undefined) throw failure;` — pierwszy zanotowany
błąd (z `run`, nie z `cleanup`) wygrywa.
