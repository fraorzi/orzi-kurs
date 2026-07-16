# Obiekty: `interface` vs `type`, `optional`, `readonly`, index signatures

Typ obiektu opisuje jego **kształt**: jakie pola, jakiego typu, które opcjonalne, które
tylko do odczytu. TypeScript jest **strukturalny** — liczy się kształt, nie nazwa typu.
Obiekt pasuje do typu, jeśli ma wszystko, czego typ wymaga.

## `interface` vs `type`

```ts
interface User { id: number; name: string }
type User2 = { id: number; name: string };
```

Praktycznie wymienne. Różnice, które realnie mają znaczenie:

| | `interface` | `type` |
|---|---|---|
| rozszerzanie | `extends` | przecięcie `&` |
| deklaracja wielokrotna (merging) | tak — dwie deklaracje się scalają | nie — błąd „duplicate identifier” |
| unie, krotki, typy warunkowe, mapped types | nie | tak |
| komunikaty błędów | zwykle krótsze (nazwa interfejsu) | rozwinięty kształt |

Reguła kciuka (Handbook): dla kształtów obiektów bierz `interface`; gdy potrzebujesz unii,
krotki albo operacji na typach — `type`. W bibliotece publicznej `interface` bywa lepszy,
bo konsument może go rozszerzyć przez declaration merging (i to jest zaleta albo wada,
zależnie od tego, czego chcesz).

## Pola opcjonalne i `readonly`

```ts
interface Options {
  readonly id: string;      // zapis = błąd kompilacji
  timeoutMs?: number;       // number | undefined
}
```

`?` znaczy „może nie być tego klucza”. Przy `strict` typ pola to `number | undefined`,
więc musisz obsłużyć brak. `readonly` blokuje zapis **na tym typie** — to nie zamrożenie
w runtime, a płytkie: zagnieżdżony obiekt nadal jest mutowalny.

## Excess property check

Ta sama wartość raz przechodzi, raz nie:

```ts
interface Point { x: number; y: number }

const p: Point = { x: 1, y: 2, z: 3 };   // BŁĄD: 'z' nie istnieje w Point
const raw = { x: 1, y: 2, z: 3 };
const q: Point = raw;                    // OK — przypisanie zmiennej, nie literału
```

Kontrola nadmiarowych właściwości działa **tylko na literałach obiektu** przypisywanych
bezpośrednio. To celowy kompromis: literał z polem `z` prawie zawsze znaczy literówkę
(`onClik`), a przypisanie zmiennej to zwykłe typowanie strukturalne.

## Index signatures

Gdy klucze nie są znane z góry:

```ts
interface Scores {
  [player: string]: number;
}
const s: Scores = { ala: 10, ola: 12 };
s.ktokolwiek;   // number — kompilator TWIERDZI, że to number...
```

…ale w runtime dostaniesz `undefined`. Dlatego przy danych o nieznanych kluczach włącza się
`noUncheckedIndexedAccess` (typ staje się `number | undefined`) albo używa `Map`.

Wariant bezpieczniejszy dla zamkniętego zbioru kluczy: `Record<Klucz, Wartość>` z unią
literałów — wtedy kompilator wymusza komplet i nie zmyśla kluczy, których nie ma.

## Rozszerzanie i łączenie kształtów

```ts
interface WithId { id: number }
interface User extends WithId { name: string }

type WithId2 = { id: number };
type User2 = WithId2 & { name: string };
```

`extends` sprawdza zgodność przy deklaracji (konflikt pól = błąd od razu). Przecięcie `&`
przy konflikcie potrafi wyprodukować `never` w polu i błąd dopiero w miejscu użycia.

## Kiedy używać

- `interface` do kształtów encji i propsów; `type` do unii, krotek, aliasów wyliczanych.
- `readonly` na wszystkim, co jest wejściem funkcji i nie ma być mutowane — czytelny kontrakt.
- `Record<Klucz, Wartość>` zamiast index signature, gdy zbiór kluczy jest zamknięty.
- Pola opcjonalne dla rzeczywiście opcjonalnych danych — nie jako sposób na „później dopiszę”.

## Kiedy unikać

- Index signature `[key: string]: any` jako sposób na wyciszenie błędów — to `any` w przebraniu.
- `readonly` „na wszelki wypadek” tam, gdzie kod naprawdę mutuje strukturę (będziesz walczył
  z kompilatorem albo obchodził go przez `as`).
- Przecięcia dwóch typów o tym samym polu innego typu — `{ a: string } & { a: number }` daje
  pole typu `never`, którego nie da się już wypełnić.

## Pułapki

- Excess property check nie zadziała, jeśli literał przejdzie przez zmienną — brak błędu
  nie znaczy, że pole jest w typie.
- Pole opcjonalne (`timeoutMs?: number`) a pole z `undefined` (`timeoutMs: number | undefined`)
  to nie to samo: przy drugim **musisz** podać klucz (choćby z `undefined`). Różnicę zaostrza
  flaga `exactOptionalPropertyTypes`.
- `readonly` jest płytkie: `readonly user: { name: string }` nie broni `cfg.user.name = "x"`.
- Typ z index signature „zjada” literówki kluczy — `s.nieistniejacyGracz` skompiluje się bez
  ostrzeżenia (o ile nie masz `noUncheckedIndexedAccess`).

Źródła: TypeScript Handbook — „Object Types”, „Interfaces vs Type Aliases”,
„Excess Property Checks”, „Index Signatures”; Effective TypeScript, rozdz. o `readonly`.
