# Easy — debounce z opcjami leading/trailing

Zaimplementuj `debounce(fn, wait, options)`, gdzie `options = { leading = false, trailing = true }`.

- **trailing** (domyślnie `true`): odpal `fn` `wait` ms po **ostatnim** wywołaniu serii,
  z argumentami ostatniego wywołania.
- **leading** (domyślnie `false`): odpal `fn` **od razu** przy pierwszym wywołaniu serii
  (gdy żaden timer nie jest aktywny).
- Przy `leading` **i** `trailing` naraz: pojedyncze wywołanie odpala tylko raz (leading);
  trailing dokłada się dopiero, gdy w serii było **więcej niż jedno** wywołanie.

```js
const d = debounce(fn, 40);                              // trailing → 1× po serii
const l = debounce(fn, 40, { leading: true, trailing: false }); // 1× od razu
const b = debounce(fn, 40, { leading: true, trailing: true });  // od razu + po serii (gdy >1)
```

Przekazuj argumenty do `fn`. Do sterowania czasem użyj `setTimeout`/`clearTimeout`
(resetuj timer przy każdym wywołaniu).
