# Medium — kolekcje z ograniczeniami

Cztery funkcje operujące na listach obiektów. Wszystkie mają być **dokładnie** typowane:
klucz spoza obiektu to błąd kompilacji, a typ wyniku wynika z typu pola.

## 1. `pluck`

Wyciąga jedno pole z każdego elementu.

```ts
const users = [{ name: "Ala", age: 30 }, { name: "Ola", age: 25 }];

pluck(users, "name");  // ["Ala", "Ola"]   (typ: string[])
pluck(users, "age");   // [30, 25]         (typ: number[])
pluck(users, "wiek");  // błąd typu
```

## 2. `indexBy`

Indeks „wartość pola → element”. Przy powtórzonym kluczu **wygrywa ostatni** element.

```ts
indexBy(users, "name").get("Ala");  // { name: "Ala", age: 30 }   (typ: Map<string, ...>)
```

## 3. `countBy`

Zlicza elementy według klucza wyliczanego funkcją. Klucz musi być czymś, czym można
indeksować (`PropertyKey` = `string | number | symbol`).

```ts
countBy(users, (u) => u.age >= 30);           // błąd typu: boolean to nie PropertyKey
countBy(users, (u) => (u.age >= 30 ? "30+" : "<30"));  // Map { "30+" => 1, "<30" => 1 }
```

## 4. `sumBy`

Sumuje wskazane pole liczbowe. Typ ma odrzucać klucz pola, którego wartości nie są liczbami.

```ts
const orders = [{ id: 1, total: 10 }, { id: 2, total: 5 }];

sumBy(orders, "total");  // 15
sumBy(users, "name");    // błąd typu: name nie jest liczbą
sumBy([], "total");      // 0
```

## Ograniczenia

- Żadna funkcja nie mutuje wejścia.
- `pluck` zachowuje kolejność elementów.
