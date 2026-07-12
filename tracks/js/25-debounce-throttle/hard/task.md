# Hard — debounce z opcją leading i metodą cancel

Zaimplementuj `debounce(fn, delay, options)` w wersji produkcyjnej (jak lodash-lite):

- **domyślnie (trailing)**: odpala `fn` po ciszy `delay` z ostatnimi argumentami,
- **`options.leading === true`**: odpala `fn` **na początku** serii (od razu przy pierwszym
  wywołaniu), a potem tłumi aż do ciszy `delay`; po ciszy kolejna seria znów odpala na
  starcie. W trybie leading **nie** dubluj wywołaniem trailing.
- zwracana funkcja ma metodę **`.cancel()`**, która anuluje oczekujące (zaplanowane)
  wywołanie trailing.

```js
// trailing (domyślnie)
const d = debounce(fn, 30);
d(1); d(2); d(3);        // po ciszy: fn(3)
d.cancel();              // anuluje zaplanowane wywołanie, fn się nie odpali

// leading
const l = debounce(fn, 30, { leading: true });
l(1);                    // fn(1) od razu
l(2);                    // stłumione
// po ciszy 30 ms — brak wywołania trailing
l(3);                    // fn(3) znów od razu (nowa seria)
```
