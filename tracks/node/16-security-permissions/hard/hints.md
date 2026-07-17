## Hint 1

Rekurencyjny `visit(current, depth, key)` — redakcja po **kluczu** ma
pierwszeństwo przed wszystkim innym, potem próg głębokości.

## Hint 2

Tablica: `current.slice(0, maxItems).map(...)` plus warunkowy element
`"[TRUNCATED]"`, gdy `current.length > maxItems`.

## Hint 3

Obiekt składaj przez `Object.fromEntries(Object.entries(...).map(...))` —
to jednocześnie daje kopię; klucz dziecka przekazuj do rekurencji, bo to on
decyduje o redakcji.
