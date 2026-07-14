## Hint 1

Rozpakuj opcje z domyślnymi: `const { leading = false, trailing = true } = options ?? {}`.
Trzymaj w domknięciu `timer`, ostatnie argumenty i licznik wywołań serii.

## Hint 2

Leading rozpoznasz po tym, że timer jeszcze nie działa (`timer === null` w momencie
wywołania) — to początek nowej serii. Odpal wtedy od razu i zapamiętaj, że leading już był.

## Hint 3

Trailing odpala w callbacku timera, ale tylko gdy było „coś do zrobienia" po leadingu:

```js
function onTimer() {
  if (trailing && calls > (leadingDone ? 1 : 0)) {
    fn(...lastArgs);
  }
  timer = null; calls = 0; leadingDone = false; lastArgs = null;
}
```

`calls > (leadingDone ? 1 : 0)` gwarantuje, że pojedyncze wywołanie z `leading:true` nie
odpali drugi raz na trailingu. Przy każdym wywołaniu resetuj timer (`clearTimeout` +
`setTimeout`), żeby liczył od ostatniego wywołania.
