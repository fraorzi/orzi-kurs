## Hint 1

Pętla `for (let attempt = 0; attempt <= retries; attempt++)` daje `retries + 1` prób.
W każdej próbie rozdziel trzy sytuacje:
- `fetch` **rzucił** (błąd sieci) → zapamiętaj błąd, `continue`,
- `res.ok` → `return res.json()`,
- `!res.ok` → 4xx rzuć od razu, 5xx zapamiętaj i pozwól pętli ponowić.

## Hint 2

```js
export async function fetchWithRetry(url, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      lastError = err;   // sieć — ponawiamy
      continue;
    }
    if (res.ok) return res.json();
    if (res.status >= 400 && res.status < 500) {
      throw new Error(`HTTP ${res.status}`); // 4xx — natychmiast, bez ponawiania
    }
    lastError = new Error(`HTTP ${res.status}`); // 5xx — ponawiamy
  }
  throw lastError;
}
```

Kluczowe: `try/catch` obejmuje **tylko** samo `fetch`, żeby nie łapać przypadkiem błędu
rzuconego przy 4xx.
