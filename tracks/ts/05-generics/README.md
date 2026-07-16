# Generyki: parametry typu, inferencja, generyczne typy i klasy

Generyk to **funkcja na poziomie typów**: bierze typ jako argument i zwraca typ. Dzięki temu
piszesz kod raz, a on zachowuje informację o typie zamiast ją gubić.

Bez generyków masz dwie złe opcje:

```ts
function firstAny(items: any[]): any { … }        // typ znika — `any` zatruwa wszystko dalej
function firstNumber(items: number[]): number { … } // ten sam kod dla każdego typu z osobna
```

Z generykiem:

```ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

first([1, 2, 3]);       // number | undefined
first(["a", "b"]);      // string | undefined
```

`<T>` to **parametr typu** — miejsce na typ, który zostanie podstawiony przy wywołaniu.
Nazwa jest umowna (`T`, `U`, `K`, `V`), ale nic nie stoi na przeszkodzie, żeby nazwać go
opisowo: `<Item>`, `<Payload>`.

## Inferencja parametru typu

Prawie nigdy nie podajesz argumentu typu ręcznie — kompilator wyprowadza go z argumentów:

```ts
first([1, 2, 3]);           // T = number      (wywnioskowane)
first<number>([1, 2, 3]);   // to samo, tylko głośniej
```

Jawny argument typu przydaje się tylko wtedy, gdy nie ma z czego wnioskować albo gdy
inferencja daje coś węższego/szerszego niż chcesz:

```ts
const empty = first<string>([]);   // bez <string> byłoby first<never>
```

Uwaga na **rozszerzanie literałów**. Z literału TS wnioskuje typ literalny, ale
„rozszerzalny” — przeżywa tylko wtedy, gdy trafia wprost do `const`:

```ts
const a = identity("abc");     // "abc"    — const trzyma literał
let b = identity("abc");       // string   — mutowalna zmienna rozszerza
const c = box("abc");          // { value: string } — literał w polu obiektu rozszerza się
const d = pair("a", 1);        // [string, number]  — tak samo w krotce
```

Innymi słowy: literał ginie, gdy `T` ląduje w mutowalnej pozycji (pole obiektu, element
krotki). Jak to wymusić — `const` type parameters (TS 5.0) i `as const` u wywołującego —
zagadnienie 06b.

## Generyczne aliasy i interfejsy

Parametr typu może przyjąć też alias albo interfejs:

```ts
type Box<T> = { value: T };
type Pair<A, B> = [A, B];

interface Repository<T> {
  add(item: T): void;
  all(): readonly T[];
}
```

Użycie wymaga **podania argumentu** — `Box` samo w sobie nie jest typem, `Box<string>` jest.
(Wyjątek: parametry z wartością domyślną — zagadnienie 06.)

## Generyczne klasy

Klasa deklaruje parametr typu przy nazwie; pola i metody mogą go używać:

```ts
class Stack<T> {
  private readonly items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

const stack = new Stack<string>();   // jawnie
stack.push("a");
```

Parametr typu klasy dotyczy **instancji**, nie statyki — metoda statyczna musi mieć własny
parametr typu:

```ts
class Stack<T> {
  static from<U>(items: readonly U[]): Stack<U> { … }   // U, nie T
}
```

## Generyczne funkcje wyższego rzędu

Dwa parametry typu wystarczą, żeby opisać transformację — i to jest dokładnie sygnatura
`Array.prototype.map`:

```ts
function mapItems<T, U>(items: readonly T[], transform: (item: T) => U): U[] {
  return items.map(transform);
}

mapItems([1, 2], (n) => n.toFixed(2));   // T = number, U = string → string[]
```

Kompilator wnioskuje `T` z tablicy, a `U` z **typu zwracanego callbacku** — dlatego wewnątrz
`(n) => …` parametr `n` ma już typ `number` bez żadnej adnotacji.

## Kiedy używać

- Gdy funkcja/klasa/typ ma działać dla wielu typów, a wynik **zależy** od typu wejścia
  (`first`, `Stack`, `map`, `Result`).
- Gdy alternatywą jest `any` albo duplikacja tej samej implementacji per typ.
- Dla kontenerów i opakowań (`Box`, `Cache`, `Result`, `Maybe`) — parametr typu opisuje,
  co jest w środku.

## Kiedy unikać

- **Parametr typu użyty tylko raz** to prawie zawsze błąd projektowy. `function log<T>(value: T): void`
  nie daje nic ponad `(value: unknown)` — generyk ma sens, gdy typ *łączy* co najmniej dwa
  miejsca (wejście z wyjściem albo dwa wejścia).
- Gdy typ wyniku nie zależy od wejścia — zwykła adnotacja jest czytelniejsza.
- Generyk „na zapas”, bo *może się kiedyś przyda* — dodaje szum w sygnaturze i komunikatach
  błędów.

## Pułapki

- Nagi `T` zachowuje literał tylko w `const`: `const a = identity("abc")` → `"abc"`, ale
  `let a = identity("abc")` → `string`. Gdy `T` wchodzi do krotki albo pola obiektu,
  literał ginie: `pair("a", 1)` → `[string, number]`, nie `["a", 1]`.
- Pusta tablica bez jawnego argumentu typu daje `never`: `first([])` → `never | undefined`.
- `readonly T[]` w parametrze, `T[]` w wyniku — inaczej funkcja przyjmie tablicę tylko do
  odczytu, ale odda uchwyt do mutacji (albo w ogóle nie przyjmie stałej `as const`).
- Parametr typu klasy nie jest widoczny w metodach statycznych — musisz zadeklarować nowy.
- Generyki są wymazywane w runtime. `new Stack<string>()` nie wie w czasie działania, że
  trzyma stringi — nie da się zrobić `if (T === string)`.

Źródła: TypeScript Handbook — „Generics” (Generic Functions, Generic Types, Generic Classes,
Type Argument Inference); Total TypeScript — „Generics” (darmowe rozdziały);
Effective TypeScript, „Avoid unnecessary type parameters”.
