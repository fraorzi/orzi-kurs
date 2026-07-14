## Hint 1

`createCache` to cienka nakładka na `Map`. Kluczowe: buduj klucz **jednakowo** wszędzie,
najlepiej lokalnym helperem:

```js
const store = new Map();
const keyOf = (query, page) => `${query}::${page}`;
// has/get/set używają keyOf(...)
```

## Hint 2

`debounce` trzyma jeden uchwyt timera w domknięciu. Każde wywołanie go resetuje:

```js
export function debounce(fn, waitMs) {
  let timer = null;
  return function debounced(...args) {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => { timer = null; fn.apply(this, args); }, waitMs);
  };
}
```

## Hint 3

Cały fetch schowaj w jednym pomocniku — dzięki temu cache i anulowanie są w jednym
miejscu, a `search`/`next` tylko sterują stanem:

```js
async function fetchPage(query, page) {
  const cached = cache.get(query, page);
  if (cached) return cached;                 // trafienie w cache — zero sieci
  const controller = new AbortController();
  activeController = controller;
  const url = `?q=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetchImpl(url, { signal: controller.signal });
  const data = await res.json();
  cache.set(query, page, data);
  return data;
}
```

## Hint 4

`search` zaczyna od anulowania tego, co w locie — inaczej wynik starego zapytania mógłby
nadpisać nowy (klasyczny wyścig przy szybkim pisaniu):

```js
async search(query) {
  if (activeController) activeController.abort();
  currentQuery = query;
  currentPage = 1;
  const data = await fetchPage(query, 1);
  items = [...data.items];
  hasMore = data.hasMore;
  return items;
}
```

`next` różni się dwoma rzeczami: strażnik `if (!hasMore) return items;` oraz
**dołączanie** zamiast zastępowania: `items = [...items, ...data.items]`.
