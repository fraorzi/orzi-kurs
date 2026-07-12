## Hint 1

Trzymaj `timer` w domknięciu. `callNow` = jesteśmy w trybie leading i **nie ma** aktywnego
timera (`timer === null`) → to początek nowej serii. Zawsze resetuj timer. W callbacku
timera ustaw `timer = null` i odpal `fn` tylko w trybie trailing (żeby nie dublować z leading).

## Hint 2

```js
export function debounce(fn, delay, options = {}) {
  const { leading = false } = options;
  let timer = null;

  const debounced = function (...args) {
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) fn.apply(this, args); // trailing tylko gdy NIE leading
    }, delay);
    if (callNow) fn.apply(this, args);     // leading: odpal na starcie serii
  };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
```

Po ciszy `timer` wraca do `null`, więc następne wywołanie znów jest „na starcie" (leading).
