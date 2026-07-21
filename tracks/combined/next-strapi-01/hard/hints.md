# Hints

## Hint 1

Waliduj kształt danych (`documentId`, `title`) zanim odpytasz cokolwiek —
regex na `documentId` i `typeof title === "string"` z długością po `trim()`
to pierwsze dwa warunki, oba przed jakimkolwiek `await`.

## Hint 2

Ownership sprawdzasz PO walidacji formatu, ale PRZED zapisem:
`await deps.owner(documentId) !== userId` → rzuć `Not found` (nie
`Forbidden` — nie zdradzaj, że dokument istnieje).

## Hint 3

Dopiero po udanym `deps.update(...)` wywołaj `deps.revalidate` dla dwóch
tagów: `"article:" + documentId` oraz `"articles"`. Zapisuj przyciętą
wersję tytułu (`title.trim()`), nie surowe wejście.
