# Hard — funkcje wyższego rzędu i obiekt wywoływalny

Trzy narzędzia, wszystkie operujące na funkcjach. Bez generyków (będą w zagadnieniu 05) —
konkretne typy wystarczą.

## 1. `once(fn: (value: number) => number): (value: number) => number`

Zwraca funkcję, która woła `fn` **tylko przy pierwszym wywołaniu**; kolejne zwracają
zapamiętany wynik (i nie wołają `fn` ponownie).

```ts
let calls = 0;
const init = once((n) => { calls += 1; return n * 2; });
init(5);  // 10, calls === 1
init(9);  // 10, calls === 1  ← argument zignorowany, fn nie wołane
```

## 2. `compose(f: Fn, g: Fn): Fn`, gdzie `type Fn = (value: number) => number`

Składanie od prawej do lewej: `compose(f, g)(x) === f(g(x))`.

```ts
const inc = (n: number) => n + 1;
const double = (n: number) => n * 2;
compose(inc, double)(5);  // 11   (najpierw double, potem inc)
```

## 3. `memoize(fn: (key: string) => number): Memoized`

`Memoized` to **obiekt wywoływalny** — funkcja z dodatkowymi właściwościami. W TS opisuje
się to sygnaturą wywołania w interfejsie:

```ts
interface Memoized {
  (key: string): number;      // sygnatura wywołania
  readonly hits: number;      // ile razy wynik przyszedł z cache'u
  readonly misses: number;    // ile razy trzeba było policzyć
  clear(): void;              // czyści cache i zeruje liczniki
}
```

Zachowanie:

```ts
const slow = (key: string) => key.length;
const fast = memoize(slow);

fast("abc");   // 3   — miss
fast("abc");   // 3   — hit (fn nie wołane)
fast.hits;     // 1
fast.misses;   // 1
fast.clear();
fast.hits;     // 0
```
