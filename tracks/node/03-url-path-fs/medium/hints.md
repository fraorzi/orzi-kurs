## Hint 1

Najpierw `const base = resolve(root)` i `const candidate = resolve(base, input)`
— resolve normalizuje `..` i obsługuje wejście absolutne.

## Hint 2

Warunek bezpieczeństwa ma dwie części: `candidate === base` **albo**
`candidate.startsWith(base + sep)`. Separator w prefiksie odcina `/data-evil`.

## Hint 3

Wszystko inne to `throw new Error(...)`. Nie próbuj "naprawiać" złej ścieżki —
bramka ma odrzucać, nie zgadywać intencje.
