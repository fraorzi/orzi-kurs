# Medium — throttle (leading edge)

Zaimplementuj `throttle(fn, interval)` — zwraca funkcję, która przepuszcza wywołanie
`fn` **najwyżej raz na `interval` ms**. Wariant „leading edge": pierwsze wywołanie odpala
`fn` natychmiast, kolejne w oknie `interval` są **ignorowane**, a następne przechodzi
dopiero po upływie interwału.

```js
const log = [];
const t = throttle((x) => log.push(x), 30);

t(1); // odpala od razu → log: [1]
t(2); // w oknie interwału → ignorowane, log: [1]
// po ~30 ms:
t(3); // interwał minął → odpala, log: [1, 3]
```

Przekazuj argumenty do `fn`. Zachowaj `this` (zwykła funkcja + `apply`).
