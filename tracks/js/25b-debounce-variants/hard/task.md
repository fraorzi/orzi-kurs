# Hard — throttle z leading/trailing

Zaimplementuj `throttle(fn, wait, options)`, gdzie `options = { leading = true, trailing = true }`.
Throttle odpala `fn` **nie częściej niż raz na `wait` ms** w trakcie serii wywołań.

- **leading** (domyślnie `true`): odpal od razu na pierwszym wywołaniu okna.
- **trailing** (domyślnie `true`): po zakończeniu okna odpal jeszcze raz z **ostatnimi**
  argumentami, jeśli w trakcie okna były kolejne wywołania.

```js
const t = throttle(fn, 40);                              // leading + trailing
t(1); t(2); t(3); // fn(1) od razu; fn(3) na koniec okna

throttle(fn, 40, { leading: false, trailing: true }); // bez natychmiastowego, tylko na koniec
throttle(fn, 40, { leading: true, trailing: false });  // tylko natychmiastowy, bez końcowego
```

Kanoniczny wzorzec (underscore/lodash): trzymaj znacznik czasu ostatniego odpalenia (`last`),
licz `remaining = wait - (now - last)`. Gdy `remaining <= 0` — odpal od razu i zaktualizuj
`last`. W przeciwnym razie (jeśli `trailing`) zaplanuj odpalenie na koniec okna z ostatnimi
argumentami. Dla `leading:false` „udawaj", że właśnie odpaliłeś (`last = now`), by stłumić
natychmiastowe wywołanie.
