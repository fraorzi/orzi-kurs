## Hint 1

Pool trzyma licznik `active` i tablicę oczekujących. Sercem jest `pump()`, który
startuje zadania póki jest miejsce, a po każdym zakończeniu woła się ponownie:

```js
function pump() {
  while (active < concurrency && waiting.length > 0) {
    const job = waiting.shift();
    active += 1;
    maxActive = Math.max(maxActive, active);
    Promise.resolve()
      .then(job.task)
      .then(job.resolve, job.reject)
      .finally(() => { active -= 1; pump(); });
  }
}
```

`run(task)` to `new Promise((resolve, reject) => { waiting.push({ task, resolve, reject }); pump(); })`.

## Hint 2

`withRetry` to pętla prób z backoffem liczonym **przed** ponowieniem:

```js
let lastError;
for (let attempt = 0; attempt <= retries; attempt++) {
  if (attempt > 0) await sleep(backoffMs * 2 ** (attempt - 1));
  try {
    return await task();
  } catch (err) {
    lastError = err;
  }
}
throw lastError;
```

## Hint 3

Batcher zbiera `{ key, resolve, reject }` w kolejce. `flush` woła `batchFn` raz
i rozdziela wyniki **po indeksie** (dlatego `batchFn` musi zwrócić tablicę w tej samej
kolejności co klucze):

```js
function flush() {
  if (queue.length === 0) return Promise.resolve();
  const batch = queue;
  queue = [];
  const keys = batch.map((item) => item.key);
  return Promise.resolve(batchFn(keys)).then(
    (results) => { batch.forEach((item, i) => item.resolve(results[i])); },
    (err) => { batch.forEach((item) => item.reject(err)); },
  );
}
```

`load` dorzuca do kolejki i sam odpala flush przy przepełnieniu:
`if (queue.length >= maxSize) flush();`.

## Hint 4

`createScheduler` to czyste sklejenie — pool i retry są ortogonalne, więc wystarczy je
zagnieździć: retry owija pojedyncze zadanie, pool steruje ile ich naraz.

```js
const pool = createPool(concurrency);
const run = (task) => pool.run(() => withRetry(task, { retries, backoffMs }));
return { run, runAll: (tasks) => Promise.all(tasks.map(run)), /* gettery */ };
```

Kolejność zagnieżdżenia ma znaczenie: retry **w środku** poolu znaczy, że ponawiane
próby zajmują slot współbieżności (nie przepuszczasz nagle więcej zadań, gdy któreś
się ponawia).
