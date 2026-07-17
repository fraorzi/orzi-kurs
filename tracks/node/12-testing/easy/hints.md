## Hint 1

Stan w domknięciu: `let cached: { value; expiresAt } | undefined`.

## Hint 2

Warunek przeładowania: `!cached || time >= cached.expiresAt` — równość
należy do "wygasło", test graniczny to sprawdza.

## Hint 3

`now()` wywołuj raz na `get()` i używaj tej samej wartości do porównania
i do wyliczenia nowego terminu.
