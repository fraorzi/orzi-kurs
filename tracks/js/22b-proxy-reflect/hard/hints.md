## Hint 1

Dodaj trzeci parametr z domyślną wartością — `base = ""` — który niesie ścieżkę do bieżącego
poziomu. Helper: `pathFor(key) = base ? base + "." + key : key`. Na najwyższym poziomie
`base` jest pusty, więc ścieżka to sam klucz.

## Hint 2

Głębokość robisz w pułapce `get`: jeśli odczytana wartość jest obiektem, zwróć dla niej
**nowy** `observable`, przekazując doklejoną ścieżkę:

```js
get(obj, key, receiver) {
  const value = Reflect.get(obj, key, receiver);
  if (typeof key === "symbol") return value;
  if (value !== null && typeof value === "object") {
    return observable(value, onChange, pathFor(key));
  }
  return value;
}
```

Dzięki temu `state.user` zwraca proxy z `base = "user"`, więc zapis `.name` na nim woła
`onChange("user.name", ...)`.

## Hint 3

Pułapki mutujące wołają `onChange` **przed** operacją i zwracają wynik `Reflect.*`:

```js
set(obj, key, value, receiver) {
  onChange(pathFor(key), value);
  return Reflect.set(obj, key, value, receiver);
},
deleteProperty(obj, key) {
  onChange(pathFor(key), undefined);
  return Reflect.deleteProperty(obj, key);
},
```
