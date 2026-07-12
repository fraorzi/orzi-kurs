# [O] Optymalizacja: asynchroniczność

Zagadnienie **optymalizacyjne**: starter działa poprawnie, ale wykonuje niezależne
operacje asynchroniczne nieefektywnie — sekwencyjnie zamiast równolegle, po jednym zamiast
w paczkach. Przepisz go, nie zmieniając kontraktu (wyniki i ich kolejność). Bramka mierzy
**współbieżność i liczbę wywołań** licznikiem, nie czasem.

## Sekwencyjnie → równolegle

`await` w pętli czeka na każdą operację przed następną. Dla **niezależnych** operacji to
strata — puść je razem:

```js
// sekwencyjnie: maxActive = 1
const out = [];
for (const id of ids) out.push(await fetchOne(id));

// równolegle: startują naraz, Promise.all czeka na komplet (kolejność zachowana)
const out = await Promise.all(ids.map(fetchOne));
```

## Ograniczona współbieżność (pool)

Pełna równoległość przy tysiącach żądań może przeciążyć serwer/łącze. Pool przetwarza
**najwyżej `limit`** operacji naraz — tyle „pracowników" ciągnie zadania z kolejki:

```js
async function pooledMap(items, worker, limit) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i]);
    }
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, run);
  await Promise.all(runners);
  return results;
}
```

`maxActive` nigdy nie przekracza `limit`, a przy dużej liczbie zadań osiąga `limit`.

## Batching (paczkowanie)

Gdy API przyjmuje **wiele** id naraz, jedno żądanie per id to marnotrawstwo. Pogrupuj id
w paczki i wykonaj mniej wywołań:

```js
// n wywołań: fetchBatch([id]) dla każdego id
// ceil(n / size) wywołań: paczki po `size`
for (let i = 0; i < ids.length; i += size) {
  batches.push(ids.slice(i, i + size));
}
const results = await Promise.all(batches.map(fetchBatch));
return results.flat();
```

## Kiedy sekwencyjnie / po jednym jest OK

- Kroki **zależne** od siebie (wynik poprzedniego jest wejściem następnego) — muszą być
  po kolei.
- Świadome ograniczanie obciążenia (rate limit API) — wtedy pool z małym `limit`.
- Jedno-dwa żądania — równoległość i batching nie mają po co komplikować kodu.

## Pułapki

- `Promise.all` **odrzuca przy pierwszym błędzie** — gdy chcesz wszystkie wyniki mimo
  błędów, użyj `Promise.allSettled`.
- Nieograniczona równoległość (`Promise.all` na 100 000 żądań) może wyczerpać zasoby —
  wtedy pool.
- Zachowaj **kolejność wyników** zgodną z wejściem: zapisuj po indeksie (`results[i]`),
  a przy paczkach `flat()` w kolejności paczek.
- Batching zmienia liczbę wywołań API — upewnij się, że `fetchBatch` zwraca wyniki w
  kolejności przekazanych id.
