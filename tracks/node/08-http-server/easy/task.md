# Easy — dopasuj metodę i pathname

Zaimplementuj serce routera: `solve(routes, method, rawUrl)`:

- porównuj **pathname** wyciągnięty przez API `URL` — query
  string nie wpływa na dopasowanie;
- trafienie metody i ścieżki → `{ status: 200 }`;
- ścieżka istnieje, ale pod innymi metodami → `{ status: 405, allow: [...] }`,
  gdzie `allow` to posortowana lista metod bez duplikatów;
- ścieżki nie ma wcale → `{ status: 404 }`.

```ts
solve([{ method: "GET", path: "/items" }], "POST", "/items?id=1");
// { status: 405, allow: ["GET"] }
```
