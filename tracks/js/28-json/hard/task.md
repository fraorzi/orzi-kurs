# Hard — serializacja odporna na cykle

`JSON.stringify` rzuca `TypeError` na strukturze z cyklem (obiekt referujący sam siebie).
Zaimplementuj `safeStringify(value)`, które **nie rzuca** — miejsce cyklu zastępuje
stringiem `"[Circular]"`. Zwykłe (acykliczne) dane serializuj normalnie.

```js
const obj = { name: "x" };
obj.self = obj; // cykl
safeStringify(obj); // '{"name":"x","self":"[Circular]"}' (nie rzuca)

safeStringify({ a: 1, b: [2, 3] }); // '{"a":1,"b":[2,3]}'
```
