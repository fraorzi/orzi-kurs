## Hint 1

Trzymaj `last` — znacznik czasu ostatniego odpalenia. Przy wywołaniu policz
`remaining = wait - (now - last)`. Jeśli `remaining <= 0`, minęło już całe okno → odpal od
razu i ustaw `last = now`.

## Hint 2

Trailing: gdy jesteś w środku okna (`remaining > 0`) i `trailing` jest włączony, zaplanuj
jedno odpalenie na koniec okna — ale tylko jeśli timer jeszcze nie stoi (`timer === null`),
żeby nie planować wielu:

```js
} else if (trailing && timer === null) {
  timer = setTimeout(trailingEdge, remaining);
}
```

W `trailingEdge` odpal `fn` z **ostatnimi** argumentami i zaktualizuj `last`.

## Hint 3

Tłumienie leadingu: dla `leading:false` na starcie „udaj", że właśnie odpaliłeś:

```js
if (last === 0 && !leading) last = now;
```

Dzięki temu `remaining` wyjdzie pełne `wait` i pierwsze wywołanie nie odpali od razu, tylko
zaplanuje trailing. W `trailingEdge` ustaw `last = leading ? Date.now() : 0`, żeby kolejna
seria znów zaczynała się poprawnie.
