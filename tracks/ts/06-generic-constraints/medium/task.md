# Medium — kolekcje z ograniczeniami

Cztery funkcje operujące na listach obiektów. Wszystkie mają być **dokładnie** typowane:
klucz spoza obiektu to błąd kompilacji, a typ wyniku wynika z typu pola.

## 1. `pluck<T extends object, K extends keyof T>(items: readonly T[], key: K): T[K][]`

Wyciąga jedno pole z każdego elementu.

```ts
const users = [{ name: "Ala", age: 30 }, { name: "Ola", age: 25 }];

pluck(users, "name");  // ["Ala", "Ola"]   (typ: string[])
pluck(users, "age");   // [30, 25]         (typ: number[])
pluck(users, "wiek");  // błąd typu
```

## 2. `indexBy<T extends object, K extends keyof T>(items: readonly T[], key: K): Map<T[K], T>`

Indeks „wartość pola → element”. Przy powtórzonym kluczu **wygrywa ostatni** element.

```ts
indexBy(users, "name").get("Ala");  // { name: "Ala", age: 30 }   (typ: Map<string, ...>)
```

## 3. `countBy<T, K extends PropertyKey>(items: readonly T[], keyOf: (item: T) => K): Map<K, number>`

Zlicza elementy według klucza wyliczanego funkcją. Klucz musi być czymś, czym można
indeksować (`PropertyKey` = `string | number | symbol`).

```ts
countBy(users, (u) => u.age >= 30);           // błąd typu: boolean to nie PropertyKey
countBy(users, (u) => (u.age >= 30 ? "30+" : "<30"));  // Map { "30+" => 1, "<30" => 1 }
```

## 4. `sumBy<K extends PropertyKey, T extends Record<K, number>>(items: readonly T[], key: K): number`

Sumuje pole liczbowe. Ograniczenie `T extends Record<K, number>` mówi: „element MUSI mieć
pole `K` i musi ono być liczbą”. Kolejność parametrów typu ma znaczenie — `T` odwołuje się
do `K`, więc `K` musi być zadeklarowane pierwsze.

```ts
const orders = [{ id: 1, total: 10 }, { id: 2, total: 5 }];

sumBy(orders, "total");  // 15
sumBy(users, "name");    // błąd typu: name nie jest liczbą
sumBy([], "total");      // 0
```

## Ograniczenia

- Żadna funkcja nie mutuje wejścia.
- `pluck` zachowuje kolejność elementów.
