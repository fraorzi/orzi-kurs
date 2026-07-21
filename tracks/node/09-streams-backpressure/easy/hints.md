## Hint 1

Trzymaj `pending` między chunkami: doklej chunk, wycinaj w pętli wszystko do
pierwszego `\n`, resztę zostaw w `pending`.

## Hint 2

`pending.indexOf("\n")` w `while` — jeden chunk może nieść wiele linii.

## Hint 3

Po pętli `for await`: `if (pending) yield pending` — to obsługa pliku bez
końcowego newline; `\r` utnij regexem `/\r$/` przy yieldzie.
