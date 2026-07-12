## Hint 1

Oba błędy to „off-by-one" — pomyłka o jeden na granicy zakresu.

- `sumTo`: przyjrzyj się warunkowi pętli. Czy `n` na pewno wchodzi do środka?
- `last`: jaki jest **największy** poprawny indeks tablicy o długości `length`?

## Hint 2

- `sumTo`: zmień `i < n` na `i <= n` — inaczej ostatnia liczba `n` nigdy nie zostanie dodana.
- `last`: zmień `arr[arr.length]` na `arr[arr.length - 1]` — indeksy idą od `0`
  do `length - 1`, więc `arr[length]` jest zawsze `undefined`.
