# Medium - sekwencyjnie vs równolegle

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

`tasks` to tablica funkcji zwracających promisy. Zaimplementuj obie strategie
i poczuj różnicę - testy mierzą czas i realną współbieżność.

## 1. `runSequential(tasks)`

Wykonuje zadania **jedno po drugim** - następne startuje dopiero po zakończeniu
poprzedniego. Zwraca tablicę wyników w kolejności wejścia.

Użycie: operacje zależne od siebie albo API z limitem „1 request naraz".

## 2. `runParallel(tasks)`

Startuje **wszystkie naraz**, czeka na wszystkie, zwraca wyniki w kolejności wejścia.
Pierwszy błąd odrzuca całość.

```js
const tasks = [
  () => fetchA(), // 40ms
  () => fetchB(), // 40ms
  () => fetchC(), // 40ms
];

await runSequential(tasks); // ~120ms, w locie zawsze 1
await runParallel(tasks);   // ~40ms,  w locie 3 naraz
```

Uwaga: `runSequential` to jedyne miejsce, gdzie `await` w pętli jest poprawny -
bo zależność czasowa jest wymaganiem. W `runParallel` pętla z `await` obleje testy.
