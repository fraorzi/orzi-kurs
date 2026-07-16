# Funkcje: sygnatury, przeciążenia, `void` / `unknown` / `never`

Funkcja ma w TS **typ**: lista parametrów plus typ zwracany. Ten typ da się zapisać
osobno i przekazywać dalej — tak typuje się callbacki.

```ts
type Mapper = (value: number, index: number) => number;

function mapNumbers(items: number[], fn: Mapper): number[] {
  return items.map(fn);
}
```

## Parametry: opcjonalne, domyślne, rest

```ts
function greet(name: string, greeting = "Cześć"): string { … }   // domyślny
function log(message: string, meta?: object): void { … }         // opcjonalny
function sum(...numbers: number[]): number { … }                 // rest
```

Opcjonalny parametr ma typ `T | undefined`. Domyślny nie — kompilator wie, że wartość
zawsze będzie. Parametr opcjonalny nie może stać przed wymaganym.

## Mniej parametrów niż w typie — i to jest OK

```ts
const items = ["a", "b"];
items.forEach((item) => console.log(item));   // callback bierze 1 z 3 argumentów
```

Funkcja o **mniejszej** liczbie parametrów jest przypisywalna tam, gdzie oczekiwana jest
funkcja o większej. To celowe — inaczej każdy callback musiałby deklarować `index` i `array`.

## `void` w typie zwracanym callbacku

`void` znaczy „nie obchodzi mnie wynik”, nie „funkcja nic nie zwraca”:

```ts
type Cb = (item: string) => void;
const cb: Cb = (item) => item.length;   // OK — zwrócona liczba jest ignorowana
```

Dzięki temu `items.forEach(item => set.add(item))` działa, choć `add` zwraca `Set`.
Ale funkcja **zadeklarowana** jako `function f(): void` naprawdę nie może nic zwrócić.

## Przeciążenia (overloads)

Gdy kształt wyniku zależy od liczby lub typu argumentów, deklarujesz kilka **sygnatur**
i jedną implementację. Implementacja nie jest widoczna z zewnątrz:

```ts
function range(stop: number): number[];
function range(start: number, stop: number): number[];
function range(start: number, stop: number, step: number): number[];
function range(a: number, b?: number, step = 1): number[] {
  const [start, stop] = b === undefined ? [0, a] : [a, b];
  …
}

range(3);          // [0, 1, 2]
range(1, 4);       // [1, 2, 3]
range(0, 10, 5);   // [0, 5]
```

Sygnatura implementacji musi być zgodna ze wszystkimi przeciążeniami, ale **nie da się jej
wywołać** — `range(1, 2, 3, 4)` to błąd, mimo że implementacja przyjmuje trzy argumenty.

## `unknown` i `never`

- `unknown` — „coś, czego typu nie znam”; nic nie wolno z tym zrobić bez zawężenia.
- `never` — typ bez wartości. Zwraca go funkcja, która **nigdy nie kończy się normalnie**
  (rzuca albo pętli w nieskończoność):

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

`never` w typie zwracanym mówi kompilatorowi, że kod po wywołaniu jest nieosiągalny —
dlatego `const x = cond ? value : fail("brak")` zawęża `x` do typu `value`.

## `this` w funkcjach

Jeśli funkcja polega na `this`, zadeklaruj go jako **pierwszy, fikcyjny parametr**
(nie istnieje w runtime, znika po kompilacji):

```ts
interface Counter { count: number }

function increment(this: Counter, by: number): void {
  this.count += by;
}
```

## Kiedy używać

- Typ funkcji (`type Handler = (e: Event) => void`) zamiast powtarzania sygnatury w pięciu
  miejscach.
- Przeciążenia, gdy API ma naprawdę różne kształty wywołań (jak `range`) — a nie po to,
  żeby udawać unię.
- `never` dla funkcji rzucających i dla bramek wyczerpania unii (`assertNever`).
- Adnotacja typu zwracanego w eksportowanych funkcjach — chroni przed przypadkową zmianą
  kontraktu przy refaktorze.

## Kiedy unikać

- Przeciążenia tam, gdzie wystarczy parametr opcjonalny albo unia — przeciążenia gorzej
  współpracują z inferencją i są trudniejsze w utrzymaniu (Effective TypeScript).
- `Function` jako typ (to `any` w przebraniu — przyjmie wszystko i zwróci `any`).
- `void` jako typ zwracany funkcji, której wynik **jednak** czytasz.

## Pułapki

- Sygnatura implementacji nie jest częścią publicznego API — jeśli chcesz, żeby dało się
  wywołać `range(1, 2, 3)`, musi istnieć takie przeciążenie.
- Callback z `void` przepuszcza dowolną zwracaną wartość. Jeśli chcesz zabronić —
  deklaruj `=> undefined`.
- `never[]` w inferencji pustej tablicy: `const xs = []` bez adnotacji ma typ `never[]`
  i nie da się do niej nic wsadzić (przy `strict`).
- Parametr `this` musi być pierwszy i nie liczy się do arności funkcji.

Źródła: TypeScript Handbook — „More on Functions” (Call Signatures, Overloads,
Assignability of Functions, `void`, `never`, `this` parameters); Effective TypeScript.
