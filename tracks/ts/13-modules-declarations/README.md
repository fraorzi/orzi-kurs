# Moduły i pliki deklaracji

Typy modułu są częścią jego publicznego API. Dobrze zaprojektowany pakiet nie zmusza
odbiorcy do importowania plików wewnętrznych ani zgadywania, które eksporty istnieją
w runtime.

## `import type` i `export type`

Typ nie istnieje po kompilacji:

```ts
import { createUser, type User } from "./users";
export { createUser };
export type { User };
```

Przy `verbatimModuleSyntax` rozróżnienie jest jawne i odpowiada temu, co trafi do ESM.

## Publiczny plik `index.ts`

Barrel może być stabilną fasadą modułu, ale nie powinien re-eksportować wszystkiego
bez decyzji. Wewnętrzny helper, testowy fake albo szczegół adaptera nie musi stawać
się częścią kontraktu.

## Pliki `.d.ts`

Declaration file opisuje typy kodu istniejącego w JavaScript:

```ts
export function slugify(input: string): string;
```

Nie dodaje walidacji ani implementacji. Jeśli deklaracja kłamie, kompilator ufa
błędnemu opisowi. Dlatego `.d.ts` trzeba testować zarówno compile-time, jak i runtime.

## Typowanie legacy biblioteki

Najbezpieczniejsza migracja często wygląda tak:

1. opisz minimalne używane API,
2. dodaj testy kontraktu runtime,
3. wystaw typowany facade,
4. dopiero potem wymieniaj implementację.

Nie musisz od razu typować całej biblioteki.

## Kiedy używać

- bibliotek i większych modułów z kontrolowanym API,
- stopniowej migracji JavaScriptu,
- adapterów do pakietów bez typów lub z niepełnymi deklaracjami.

## Kiedy unikać

- barrel files tworzących cykle tylko dla krótszych importów,
- deklarowania szerszego API niż faktycznie używane,
- `declare module "*"` lub masowego `any`, które wyłącza kontrolę.

## Pułapki

- `.d.ts` może przejść kompilację i nadal nie zgadzać się z runtime,
- `export *` może nieoczekiwanie rozszerzyć publiczny kontrakt,
- import typu jako wartości kończy się błędem lub nieistniejącym eksportem,
- rozszerzenie `.js` w imporcie ESM może prowadzić do pliku `.ts` podczas typechecku.

Źródła: TypeScript Handbook — Modules, Declaration Files i Publishing.
