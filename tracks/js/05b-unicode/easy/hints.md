## Hint 1

Iterator stringa (używany przez `for..of`, spread `[...str]` i `Array.from`) chodzi po
punktach kodowych i nie rozrywa par zastępczych. `split("")` i `str[i]` chodzą po
jednostkach UTF-16 — tego unikaj.

## Hint 2

`toCodePoints`: `return [...str];`. `codePointCount`: długość tej samej tablicy —
`return [...str].length;`.
