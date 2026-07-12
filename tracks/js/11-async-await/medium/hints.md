## Hint 1

`runSequential`: `for..of` po `tasks`, w środku `results.push(await task())`.
Tu await w pętli jest celowy.

## Hint 2

`runParallel`: najpierw uruchom wszystkie — `tasks.map((task) => task())` — dopiero
potem czekaj: `return Promise.all(started)`. Różnica jest w momencie WYWOŁANIA funkcji:
map wywołuje wszystkie od razu, pętla z await — jedną naraz.
