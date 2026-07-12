## Hint 1

Schemat: zamroź bieżący obiekt, potem przejdź po jego wartościach i dla każdej, która
jest obiektem/tablicą, wywołaj `deepFreeze` rekurencyjnie. Warunek `!Object.isFrozen(value)`
przed zejściem chroni przed nieskończoną rekurencją na cyklach.

## Hint 2

```js
export function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return obj;
}
```

`typeof value === "object"` obejmuje też tablice (i wyklucza prymitywy); `value !== null`
odsiewa `null` (którego `typeof` to też `"object"`). Zamrożenie obiektu z cyklem działa,
bo po `Object.freeze(a)` referencja `a.self` jest już zamrożona i pomijamy ją.
