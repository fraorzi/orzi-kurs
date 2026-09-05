# Easy - pierwszy parametr typu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Wszystko poniżej ma być **generyczne** i działać bez podawania argumentu typu ręcznie -
kompilator wywnioskuje go z argumentów.

## 1. `identity<T>(value: T): T`

Zwraca dokładnie to, co dostała (ta sama referencja).

```ts
identity("abc");        // "abc", typ: string
identity({ id: 1 });    // typ: { id: number }
```

## 2. `firstOrNull<T>(items: readonly T[]): T | null`

Pierwszy element albo `null` dla pustej listy. Wejście jest `readonly` - funkcja go nie
mutuje.

```ts
firstOrNull([10, 20]);   // 10,   typ: number | null
firstOrNull([]);         // null
```

## 3. `Box<T>`, `box`, `unbox`

Generyczny alias - pudełko na wartość dowolnego typu:

```ts
type Box<T> = { value: T };

box(42);            // { value: 42 },  typ: Box<number>
unbox(box("x"));    // "x",            typ: string
```

## 4. `pair<A, B>(first: A, second: B): [A, B]`

Dwa **różne** parametry typu i krotka jako wynik.

```ts
pair("a", 1);   // ["a", 1], typ: [string, number]
```

Zwróć uwagę: typ to `[string, number]`, a nie `["a", 1]` - nagi parametr typu rozszerza
literały (jak `let`). Sterowanie tym poznasz w zagadnieniu 06b.
