# Hard - generyczny `Result<T>`

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Wzorzec z Rusta, w TS używany wszędzie tam, gdzie błąd jest **wartością**, a nie wyjątkiem:
zamiast rzucać, funkcja zwraca „udało się z wartością” albo „nie udało się z powodem”.
Typ wyniku niesie informację, co jest w środku.

```ts
export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string };
```

To unia rozłączna (zagadnienie 02) sparametryzowana typem - po sprawdzeniu `result.ok`
kompilator sam zawęża wariant.

## Funkcje do napisania

### `ok<T>(value: T): Result<T>`

```ts
ok(2);   // { ok: true, value: 2 },  typ: Result<number>
```

### `err(error: string): Result<never>`

Wariant błędu nie niesie żadnej wartości, więc jego parametr typu to `never` - a `Result<never>`
jest przypisywalny do **każdego** `Result<T>`:

```ts
const parsed: Result<number> = err("nie liczba");   // OK
```

### `mapResult<T, U>(result: Result<T>, fn: (value: T) => U): Result<U>`

Przekształca wartość sukcesu. Na błędzie **nie woła `fn`** i przepuszcza błąd dalej.

```ts
mapResult(ok(2), (n) => n.toFixed(2));       // { ok: true, value: "2.00" }, Result<string>
mapResult(err("boom"), (n: number) => n);    // { ok: false, error: "boom" }
```

### `flatMapResult<T, U>(result: Result<T>, fn: (value: T) => Result<U>): Result<U>`

Jak `mapResult`, ale `fn` samo zwraca `Result` - wynik **nie może** być `Result<Result<U>>`.
Tak łańcuchuje się operacje, z których każda może się nie udać.

```ts
const half = (n: number): Result<number> =>
  n % 2 === 0 ? ok(n / 2) : err("nieparzysta");

flatMapResult(ok(8), half);   // { ok: true, value: 4 }
flatMapResult(ok(7), half);   // { ok: false, error: "nieparzysta" }
```

### `unwrapOr<T>(result: Result<T>, fallback: T): T`

Wartość albo wartość zastępcza. `unwrapOr(ok(1), "abc")` ma być **błędem typu** - `T` jest
już ustalone przez pierwszy argument.

### `collect<T>(results: readonly Result<T>[]): Result<T[]>`

Zamienia listę wyników w wynik z listą: same sukcesy → `ok` z tablicą wartości
w oryginalnej kolejności; pierwszy napotkany błąd → ten błąd (i koniec - dalszych elementów
nie sprawdzasz).

```ts
collect([ok(1), ok(2)]);              // { ok: true, value: [1, 2] }
collect([ok(1), err("x"), err("y")]); // { ok: false, error: "x" }
collect([]);                          // { ok: true, value: [] }
```
