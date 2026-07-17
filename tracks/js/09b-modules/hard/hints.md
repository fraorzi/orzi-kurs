## Hint 1

Rejestr przechowuje funkcje, a nie gotowe Promise:

```js
const LOADERS = {
  uppercase: () => import("./plugins/uppercase.js"),
  slugify: () => import("./plugins/slugify.js"),
};
```

## Hint 2

`loadPlugin` znajdź loader po nazwie, sprawdź brak i dopiero potem zwróć `loader()`.

## Hint 3

Dynamiczny import zwraca obiekt modułu. Eksport domyślny jest pod `module.default`:

```js
const plugin = await loadPlugin(name);
return plugin.default(value);
```
