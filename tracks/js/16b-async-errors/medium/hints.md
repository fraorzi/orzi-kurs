## Hint 1

`await Promise.allSettled(promises)` da tablicę deskryptorów. Przejdź po niej i rozdziel
elementy po polu `status` na `values` (z `.value`) i `errors` (z `.reason`).

## Hint 2

```js
export async function collect(promises) {
  const settled = await Promise.allSettled(promises);
  const values = [];
  const errors = [];
  for (const r of settled) {
    if (r.status === "fulfilled") values.push(r.value);
    else errors.push(r.reason);
  }
  return { values, errors };
}
```
