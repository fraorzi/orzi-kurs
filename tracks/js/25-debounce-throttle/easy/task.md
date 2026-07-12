# Easy — debounce (trailing)

Zaimplementuj `debounce(fn, delay)` — zwraca funkcję, która odracza wywołanie `fn` do
momentu, gdy przez `delay` milisekund nie było kolejnego wywołania. Seria szybkich
wywołań ma skutkować **jednym** wywołaniem `fn`, z **ostatnimi** argumentami.

```js
const log = [];
const d = debounce((x) => log.push(x), 30);

d(1);
d(2);
d(3);
// synchronicznie: log === []  (jeszcze nic — czekamy na ciszę)
// po ~30 ms ciszy: log === [3]  (jedno wywołanie, ostatni argument)
```

Każda seria (rozdzielona ciszą) daje osobne wywołanie. Nie odpalaj `fn` synchronicznie.
