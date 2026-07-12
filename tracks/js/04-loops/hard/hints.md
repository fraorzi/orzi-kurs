## Hint 1

Sito nie sprawdza „czy i jest pierwsze" dzieleniem — odwraca problem: każda
znaleziona liczba pierwsza **wykreśla swoje wielokrotności** z tablicy flag.
Zewnętrzna pętla po kandydatach, wewnętrzna po wielokrotnościach ze skokiem
`j += i`.

## Hint 2

```js
const composite = new Uint8Array(n + 1);
for (let i = 2; i <= n; i++) {
  if (!composite[i]) {
    primes.push(i);
    for (let j = i * i; j <= n; j += i) composite[j] = 1;
  }
}
```

Start wykreślania od `i * i` jest poprawny, bo mniejsze wielokrotności
(`2i, 3i, ...`) wykreśliły już mniejsze liczby pierwsze. `collatzLength`:
`while (current !== 1)` z licznikiem startującym od 1.
