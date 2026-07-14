# Easy — wartości domyślne przez `get`

## `withDefault(target, defaultValue)`

Zwróć `Proxy` opakowujący `target`, który dla **brakujących** kluczy zwraca `defaultValue`,
a dla istniejących — ich prawdziwą wartość. Zapis ma działać normalnie.

```js
const scores = withDefault({ ala: 5 }, 0);
scores.ala; // 5   (istnieje)
scores.ola; // 0   (brak → domyślna)

scores.ola = 3;
scores.ola; // 3   (po zapisie zwraca prawdziwą wartość)
```

Istniejący klucz o wartości `undefined` ma zwrócić `undefined`, **nie** domyślną — liczy się
obecność klucza, nie jego wartość.

```js
withDefault({ x: undefined }, 99).x; // undefined
```

Użyj pułapki `get` i `Reflect.has` / `Reflect.get`.
