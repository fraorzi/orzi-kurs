## Hint 1

Zacznij od `HttpError` — to zwykła podklasa `Error`. Pamiętaj o `super(...)` przed
sięgnięciem po `this`:

```js
export class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}
```

## Hint 2

Timeout to `AbortController` + `setTimeout`. Wydziel pomocnika, żeby `requestJson`
było czytelne, i **zawsze** czyść timer (inaczej proces nie zakończy się w testach):

```js
async function fetchWithTimeout(fetchImpl, url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
```

## Hint 3

Pętla prób w `requestJson`: `for (let attempt = 0; attempt <= retries; attempt++)`.
Klucz to rozróżnienie „ponawialne" od „nie ponawiaj":

```js
const res = await fetchWithTimeout(fetchImpl, url, timeoutMs);
if (res.ok) return await res.json();
if (res.status < 500) throw new HttpError(res.status); // 4xx — koniec
lastError = new HttpError(res.status);                 // 5xx — spróbuj jeszcze
```

W `catch` przerzuć błąd klienta dalej, a resztę (sieć/timeout/5xx) potraktuj jako
ponawialną: `if (err instanceof HttpError && err.status < 500) throw err;`.
Backoff robisz **na początku** iteracji, gdy `attempt > 0`:
`await sleep(backoffMs * 2 ** (attempt - 1))`.

## Hint 4

Kolejka trzyma licznik `active` i tablicę oczekujących. Sercem jest `pump()`, który
startuje zadania póki jest miejsce, a po każdym zakończeniu woła się ponownie:

```js
function pump() {
  while (active < concurrency && pending.length > 0) {
    const job = pending.shift();
    active += 1;
    Promise.resolve()
      .then(job.task)
      .then(job.resolve, job.reject)
      .finally(() => { active -= 1; pump(); });
  }
}
```

`add(task)` tworzy `new Promise((resolve, reject) => { pending.push({ task, resolve, reject }); pump(); })`.
W `createApiClient` `get` to po prostu `queue.add(() => requestJson(...))` — kolejka
i retry są wtedy ortogonalne: każda warstwa robi jedną rzecz.
