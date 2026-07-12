## Hint 1

Schemat obu funkcji jest ten sam:
1. `const controller = new AbortController()`,
2. `fetch(url, { signal: controller.signal })`,
3. w `catch` sprawdź `err.name === "AbortError"` i zamień na własny błąd,
4. `controller.abort()` wywołuje przerwanie (z timera albo z `cancel()`).

## Hint 2

```js
export async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") throw new Error("timeout");
    throw err;
  } finally {
    clearTimeout(timer); // sprzątamy zawsze
  }
}
```

`cancellableFetch` robi to samo, ale zamiast timera przerwanie wywołuje zwrócona funkcja
`cancel`. Obietnicę zbuduj natychmiast wywołaną funkcją async (`(async () => { ... })()`),
a `cancel` niech woła `controller.abort()`.
