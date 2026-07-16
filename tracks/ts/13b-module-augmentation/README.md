# Declaration merging i module augmentation

Niektóre frameworki i systemy pluginów pozwalają rozszerzyć istniejący kontrakt bez
edytowania modułu bazowego. TypeScript modeluje to przez declaration merging i module
augmentation.

## Declaration merging

Dwie deklaracje `interface` o tej samej nazwie w tym samym zakresie łączą pola:

```ts
interface RequestMeta {
  requestId: string;
}

interface RequestMeta {
  userId?: number;
}
```

Alias `type` nie podlega takiemu scalaniu. To jedna z istotnych różnic między
`interface` i `type`.

## Module augmentation

Inny plik może rozszerzyć eksportowany interfejs:

```ts
import type { User } from "./auth";

declare module "./request" {
  interface RequestContext {
    user?: User;
  }
}
```

Nazwa modułu musi odpowiadać specifierowi importu. Plik augmentacji sam musi być
modułem — zwykle ma import lub `export {}`.

## System pluginów

Moduł bazowy może wystawić pusty albo minimalny interfejs rejestru. Plugin dopisuje
do niego własne wpisy, a generyczne API automatycznie widzi nowe klucze i payloady.
To wzorzec spotykany m.in. w routerach, frameworkach serwerowych i bibliotekach testów.

## Kiedy używać

- oficjalnych punktów rozszerzeń biblioteki,
- typów request/session dodawanych przez middleware,
- rejestru zdarzeń lub komend pluginów.

## Kiedy unikać

- „naprawiania” błędnej deklaracji biblioteki bez testu runtime,
- ukrywania globalnych efektów typu w przypadkowym pliku,
- augmentacji wewnętrznego modułu, który można normalnie zmienić.

## Pułapki

- import pliku pluginu może być potrzebny, aby augmentacja znalazła się w programie,
- nie można dodać nowego eksportu top-level przez augmentation — rozszerza się
  istniejące deklaracje,
- `default export` jest trudniejszy do augmentowania niż nazwany eksport,
- konflikt pól o różnych typach kończy się błędem deklaracji.

Źródła: TypeScript Handbook — Declaration Merging i Module Augmentation.
