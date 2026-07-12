# Easy — throw, catch, finally

Zaimplementuj w `starter.js` trzy funkcje. Każda ćwiczy jeden filar obsługi błędów.

## 1. `getAge(user)` — throw

Zwróć `user.age`. Jeśli `user.age` jest `undefined` — **rzuć** `new Error` z komunikatem
dokładnie `"brak pola: age"`.

```js
getAge({ age: 30 }); // 30
getAge({});          // rzuca Error("brak pola: age")
```

## 2. `readAgeOrDefault(user)` — catch

Zwróć wiek użytkownika przez `getAge(user)`. Jeśli `getAge` rzuci — **złap** błąd
i zwróć `0` zamiast wywalać program.

```js
readAgeOrDefault({ age: 30 }); // 30
readAgeOrDefault({});          // 0
```

## 3. `withCleanup(fn, cleanup)` — finally

Wywołaj `fn()` i zwróć jego wynik. Niezależnie od tego, czy `fn` zakończy się normalnie,
czy rzuci — **zawsze** wywołaj `cleanup()`. Jeśli `fn` rzucił, błąd ma polecieć dalej
(po wykonaniu `cleanup`).

```js
withCleanup(() => 42, log);          // zwraca 42, log wywołany
withCleanup(() => { throw e }, log); // log wywołany, potem rzuca e
```
