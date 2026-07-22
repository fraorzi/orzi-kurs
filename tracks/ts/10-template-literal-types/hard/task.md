# Hard — typowany router: parametry ścieżki wyciągnięte z wzorca

Wzorzec trasy to zwykły string: `"/users/:id/posts/:postId"`. Kompilator ma z niego
**sam** wyprowadzić, jakich parametrów wymaga ta trasa — bez powtarzania ich w drugim
miejscu.

## 1. `ParamKeys<P>`

Unia nazw parametrów (segmenty po dwukropku).

```ts
type A = ParamKeys<"/users/:id/posts/:postId">;  // "id" | "postId"
type B = ParamKeys<"/health">;                   // never
```

## 2. `PathParams<P>`

Obiekt: każdy parametr → `string`.

```ts
type A = PathParams<"/users/:id">;   // { id: string }
type B = PathParams<"/health">;      // Record<never, string>  (pusty obiekt)
```

## 3. `buildPath(pattern, params)`

Podstawia wartości do wzorca. Typ `params` wynika z `pattern` — brakujący albo nadmiarowy
klucz to błąd typu.

```ts
buildPath("/users/:id", { id: "7" });                       // "/users/7"
buildPath("/users/:id/posts/:postId", { id: "7", postId: "3" }); // "/users/7/posts/3"
buildPath("/health", {});                                   // "/health"

buildPath("/users/:id", {});                 // błąd typu: brakuje id
buildPath("/users/:id", { id: "7", x: 1 });  // błąd typu: nadmiarowy klucz
```

Wartości są kodowane przez `encodeURIComponent` (parametr może zawierać spację czy `/`).

## 4. `matchPath(pattern, path)`

Odwrotność: dopasowuje konkretną ścieżkę do wzorca. Zwraca parametry albo `null`, gdy
ścieżka nie pasuje.

```ts
matchPath("/users/:id", "/users/7");            // { id: "7" }
matchPath("/users/:id", "/users/7/posts");      // null   (inna liczba segmentów)
matchPath("/users/:id", "/orders/7");           // null   (segment stały się nie zgadza)
matchPath("/health", "/health");                // {}
```

Wartości są dekodowane przez `decodeURIComponent`, więc `matchPath(p, buildPath(p, x))`
oddaje dokładnie `x`.

## Sygnatury

```ts
export type ParamKeys<P extends string> = ...;
export type PathParams<P extends string> = ...;
export function buildPath<P extends string>(pattern: P, params: PathParams<P>): string;
export function matchPath<P extends string>(pattern: P, path: string): PathParams<P> | null;
```
