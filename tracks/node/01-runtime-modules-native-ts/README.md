# Runtime, moduły i natywny TypeScript

Node ma dwa systemy modułów: CommonJS (`require`, `module.exports`) i ESM
(`import`/`export`). O tym, jak Node zinterpretuje plik, decyduje rozszerzenie
oraz pole `"type"` najbliższego `package.json`:

- `.mjs` i `.mts` to zawsze ESM, `.cjs` i `.cts` to zawsze CommonJS,
- `.js` i `.ts` dziedziczą format z `"type": "module"` albo `"type": "commonjs"`,
- w nowym kodzie deklaruj format jawnie — brak pola `"type"` to dziś ostrzeżenie
  i heurystyki, na których nie warto polegać.

Nowsze wersje Node pozwalają też `require()` załadować moduł ESM, o ile jego graf
nie używa top-level `await` — to domyka większość problemów interop, ale nie
zwalnia z jawnego deklarowania formatu.

## Natywny TypeScript

Node 24 wykonuje pliki `.ts` bezpośrednio przez **type stripping**: typy są
wycinane, kod nie jest transformowany. Działa tylko *erasable syntax*. Poza
zakresem są konstrukcje wymagające emisji kodu:

- `enum` i `namespace` z wartościami runtime,
- parameter properties w konstruktorach,
- aliasy ścieżek z `tsconfig.json` — `paths` nie istnieją w runtime,
- import typów bez `import type` — po wycięciu typów zostaje pusty import,
  którego specyfikator Node i tak spróbuje rozwiązać.

Type stripping **nie sprawdza typów** — `node plik.ts` wykona kod z błędami
typów. Typecheck to osobny krok (`tsc --noEmit`); `.tsx` i składnia nie-erasable
nadal wymagają narzędzia takiego jak `tsx` (używa go też ten harness).

## Conditional exports

Pole `"exports"` w `package.json` mapuje warunki środowiska (`node`, `import`,
`require`, `default`, własne) na pliki. Node wybiera **pierwszy pasujący
warunek**, a `"default"` powinien zamykać każdą mapę. Brak dopasowania to twardy
błąd `ERR_PACKAGE_PATH_NOT_EXPORTED` — narzędzie budujące spec exportów musi to
walidować, zamiast liczyć na runtime.

## Kiedy używać

- Diagnoza `ERR_REQUIRE_ESM`, `ERR_MODULE_NOT_FOUND`, dual package hazard.
- Projektowanie mapy `"exports"` publikowanego pakietu.
- Decyzja, czy skrypt może być uruchamiany przez Node bez kroku budowania.

## Kiedy unikać

- Nie mieszaj formatów w jednym pakiecie bez powodu; wybierz ESM i trzymaj się go.
- Nie używaj `enum`/`namespace` w kodzie przeznaczonym do type strippingu.
- Nie polegaj na aliasach `paths` w kodzie wykonywanym bezpośrednio przez Node.

## Pułapki

- `"type"` czyta się z najbliższego `package.json` w górę drzewa — ten sam plik w
  innym katalogu może zmienić format.
- Kolejność kluczy w `"exports"` ma znaczenie; `"default"` na początku mapy
  przechwyci wszystkie warunki.
- Importy w ESM wymagają jawnych rozszerzeń plików; CommonJS-owe nawyki
  (`require("./util")`) nie przenoszą się 1:1.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Modules: ECMAScript modules](https://nodejs.org/download/release/latest-v24.x/docs/api/esm.html)
- [Modules: TypeScript](https://nodejs.org/download/release/latest-v24.x/docs/api/typescript.html)
- [Modules: Packages](https://nodejs.org/download/release/latest-v24.x/docs/api/packages.html)
