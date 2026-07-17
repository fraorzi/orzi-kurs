# Migracja TypeScript 5.9 → 6 → 7

TypeScript 6 jest wydaniem przejściowym. Wprowadza nowe domyślne opcje i deprecjacje,
które w TypeScript 7 stają się twardymi błędami. Bezpieczna migracja nie polega na
dopisaniu `ignoreDeprecations`, lecz na usunięciu nieaktualnych założeń z konfiguracji,
źródeł i narzędzi.

## Najpierw TypeScript 6

Przed uruchomieniem TS 7 projekt powinien przechodzić TS 6:

- bez `ignoreDeprecations`,
- opcjonalnie z `stableTypeOrdering` do diagnozy różnic inferencji,
- z jawnymi `types`, `rootDir`, `strict`, `module` i `target`,
- bez opcji usuniętych lub zdeprecjonowanych.

## Zmiany konfiguracji

Najczęstsze problemy:

- `types` domyślnie jest puste — globals trzeba wymienić jawnie,
- `rootDir` domyślnie wskazuje katalog tsconfiga,
- `strict` domyślnie jest włączony,
- `module` domyślnie jest ESM, a `target` bieżącym standardem,
- `moduleResolution: node/node10` zastępuje `bundler` albo `nodenext`,
- `baseUrl` usuwa się, wpisując pełny prefiks bezpośrednio w `paths`,
- `esModuleInterop: false` i `allowSyntheticDefaultImports: false` nie są wspierane.

## Zmiany źródeł i CLI

- dawne `module Foo {}` zmień na `namespace Foo {}`,
- import assertions zastąp import attributes z `with`,
- `tsc file.ts` obok tsconfiga wymaga teraz `--ignoreConfig` albo użycia projektu `-p`,
- `ignoreDeprecations: "6.0"` tylko odkłada pracę i nie pomoże w TS 7.

## TS 6 i 7 obok siebie

TS 7 nie ma jeszcze stabilnego Compiler API. Oficjalny model przejściowy:

- TS 6 udostępnia API dla typescript-eslint i podobnych narzędzi,
- TS 7 uruchamia dodatkowy typecheck przez CLI,
- oba kompilatory sprawdzają ten sam projekt w CI.

## Kiedy używać

- przed podniesieniem głównej wersji TypeScript w monorepo,
- gdy declaration emit albo inferencja różnią się między TS 6 i 7,
- gdy część narzędzi zależy od Compiler API, a część tylko od CLI.

## Kiedy unikać

- bezpośredniego skoku na TS 7 przy nierozwiązanych deprecjacjach TS 6,
- globalnego wyciszania diagnostyk zamiast naprawy konfiguracji,
- zmiany kompilatora, bundlera, modułów i runtime w jednym niepodzielnym kroku.

## Pułapki

- `paths` wpływa na TypeScript, ale nie konfiguruje automatycznie runtime,
- `stableTypeOrdering` jest narzędziem diagnostycznym i może spowolnić TS 6,
- brak globalnych typów po migracji nie oznacza, że pakiet `@types` zniknął,
- TS 7 CLI i TS 6 API mogą wymagać dwóch aliasów zależności,
- test „kompiluje się” nie zastępuje testu uruchomienia emitowanego kodu.

Źródła: oficjalne release notes TypeScript 5.9 i 6.0 oraz ogłoszenie TypeScript 7.0.
