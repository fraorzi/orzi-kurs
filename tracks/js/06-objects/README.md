# Obiekty: podstawy

Obiekt to zbiór par klucz → wartość. Klucze są stringami (albo symbolami) —
`obj[1]` i `obj["1"]` to ta sama właściwość.

```js
const user = { name: "Ala", age: 30 };
user.name;        // dostęp kropką
user["age"];      // dostęp nawiasem — konieczny przy kluczach dynamicznych

const key = "name";
user[key];        // "Ala"

const prop = "score";
const obj = { [prop]: 10, name };  // dynamiczny klucz w literale + skrót name: name
```

Sprawdzanie i usuwanie:

```js
"name" in user;     // true — właściwość istnieje (nawet gdy wartość undefined)
delete user.age;    // usuwa właściwość
```

## Keys / values / entries

```js
Object.keys({ a: 1, b: 2 });    // ["a", "b"]
Object.values({ a: 1, b: 2 });  // [1, 2]
Object.entries({ a: 1, b: 2 }); // [["a", 1], ["b", 2]]
Object.fromEntries([["a", 1]]); // { a: 1 }
```

Idiom **entries → transformacja → fromEntries** to obiektowy odpowiednik
`map`/`filter`:

```js
Object.fromEntries(
  Object.entries(prices).map(([name, price]) => [name, price * 2]),
);
```

## Referencje i kopiowanie

Zmienna trzyma **referencję** do obiektu, nie sam obiekt. Przypisanie i przekazanie
do funkcji kopiują referencję — obiekt jest jeden:

```js
const a = { x: 1 };
const b = a;
b.x = 2;
a.x; // 2 — to ten sam obiekt!
```

Kopia płytka: `{ ...obj }` albo `Object.assign({}, obj)`. "Płytka" = zagnieżdżone
obiekty nadal są współdzielone przez referencję.

## ?. i ??

```js
user?.address?.street;   // undefined zamiast TypeError, gdy ogniwo jest null/undefined
config.retries ?? 3;     // 3 tylko gdy retries to null/undefined — 0 zostaje!
config.retries || 3;     // UWAGA: 0 też dostanie 3 — || patrzy na falsy
```

## Kiedy używać

- dostęp nawiasowy i `[expr]` w literale — klucze znane dopiero w runtime,
- `Object.entries`/`fromEntries` — transformacje obiektów bez ręcznych pętli,
- `?.` na danych z zewnątrz (API, JSON, konfiguracja),
- `??` do wartości domyślnych, gdy `0`/`""`/`false` są poprawnymi wartościami.

## Kiedy unikać

- `delete` w gorących ścieżkach — deoptymalizuje obiekt; często lepiej ustawić
  `undefined` albo zbudować nowy obiekt bez klucza,
- `?.` wszędzie "na wszelki wypadek" — maskuje błędy; używaj tam, gdzie brak
  wartości jest legalnym stanem,
- porównywania obiektów `===`, gdy chodzi o zawartość — porównuje referencje.

## Pułapki

- płytka kopia współdzieli zagnieżdżenia: po `copy = { ...user }` zapis
  `copy.address.city = ...` zmienia też `user.address.city`,
- `??` vs `||` przy `0` i `""` (patrz wyżej) — klasyczny bug konfiguracji,
- `in` zwraca true dla właściwości z wartością `undefined` — `obj.x === undefined`
  nie rozróżnia "brak klucza" od "klucz z undefined",
- kolejność kluczy: stringi całkowitoliczbowe idą pierwsze, rosnąco — nie polegaj
  na kolejności wstawiania, gdy klucze wyglądają jak liczby.
