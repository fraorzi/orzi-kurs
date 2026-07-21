## Hint 1

Pula: `Math.min(limit, items.length)` workerów; każdy w pętli bierze
`const index = next++` i pisze `results[index] = await run(items[index])`.

## Hint 2

Wspólny licznik `next` w domknięciu jest bezpieczny — JS jest jednowątkowy,
inkrement przed pierwszym `await` nie ma wyścigu.

## Hint 3

Wyniki na pozycjach wejścia (`results[index] = ...`), nie `push` — kolejność
ukończenia bywa dowolna, kolejność wyników nie.
