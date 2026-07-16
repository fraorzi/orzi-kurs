# Moduły ES: kontrakty, zależności i dynamiczny import

Moduł ES (ESM) to plik wykonywany we własnym zakresie, który jawnie publikuje część
API przez `export` i pobiera zależności przez `import`. To nie jest tylko składnia:
importy tworzą graf zależności, moduły są automatycznie w strict mode i wykonują się
raz dla danego adresu modułu.

## Eksporty nazwane i domyślne

Eksport nazwany ma stałą nazwę kontraktu:

```js
export function formatMoney(amount) {
  return `${amount.toFixed(2)} zł`;
}

import { formatMoney } from "./money.js";
```

Eksport domyślny może mieć dowolną lokalną nazwę przy imporcie:

```js
export default function normalize(value) {
  return value.trim().toLowerCase();
}

import normalizeText from "./normalize.js";
```

W kodzie aplikacyjnym eksporty nazwane zwykle ułatwiają refaktor i wyszukiwanie
użyć. Eksport domyślny jest sensowny, gdy plik naprawdę reprezentuje jeden główny
kontrakt, na przykład pojedynczy plugin.

## Importy są żywymi, tylko-do-odczytu powiązaniami

Import nie jest kopią wartości. Gdy moduł eksportujący zmieni eksportowaną zmienną,
moduł importujący zobaczy nową wartość:

```js
// config.js
export let environment = "development";
export function setEnvironment(next) {
  environment = next;
}

// api.js
import { environment } from "./config.js";
export const apiHost = () =>
  environment === "production" ? "https://api.example.com" : "http://localhost:3000";
```

Importowanego wiązania nie można przypisać po stronie konsumenta. Zmienia je moduł,
który je eksportuje.

## Re-eksport i publiczna granica pakietu

Plik `index.js` może wystawić małe, kontrolowane API wielu plików:

```js
export { formatMoney } from "./money.js";
export { summarizeOrder } from "./order.js";
```

Taki plik bywa nazywany barrel file. Pomaga ukryć strukturę wewnętrzną, ale barrel
eksportujący wszystko może tworzyć cykle zależności i utrudniać analizę bundlera.
Eksportuj świadomie tylko publiczny kontrakt.

## `import()` do ładowania na żądanie

Statyczny `import` jest analizowany przed wykonaniem modułu. Dynamiczny `import()`
zwraca Promise i pozwala załadować kod dopiero wtedy, gdy jest potrzebny:

```js
const loaders = {
  markdown: () => import("./plugins/markdown.js"),
  csv: () => import("./plugins/csv.js"),
};

export async function loadPlugin(name) {
  const load = loaders[name];
  if (!load) throw new Error(`Unknown plugin: ${name}`);
  return load();
}
```

Jawna allow-lista jest bezpieczniejsza i czytelniejsza niż składanie dowolnej
ścieżki z wejścia użytkownika. Środowisko wykonawcze buforuje załadowany moduł,
więc jego kod nie wykonuje się od nowa przy każdym imporcie.

## Kiedy używać

- Dziel kod według odpowiedzialności i wystawiaj małe publiczne API.
- Używaj importu dynamicznego dla rzadkich funkcji, pluginów i ciężkich ekranów.
- Re-eksportuj kontrakt feature'a, jeśli konsumenci nie powinni znać jego wnętrza.

## Kiedy unikać

- Nie twórz pliku dla każdej jednozdaniowej funkcji bez realnej granicy domenowej.
- Nie używaj dynamicznego importu do zwykłej, zawsze potrzebnej zależności.
- Nie buduj globalnego `index.js`, który re-eksportuje całe repo i tworzy cykle.

## Pułapki

- Rozwiązywanie ścieżek modułów zależy od hosta; w ESM Node lokalne importy mają
  jawne rozszerzenia plików.
- Kod na najwyższym poziomie modułu jest efektem ubocznym wykonywanym przy imporcie.
- Cykle nie zawsze rzucają błąd, ale mogą odczytać wiązanie przed inicjalizacją.
- Importowane wiązanie jest tylko do odczytu, choć obiekt pod nim nadal może być
  mutowalny.
- `export *` nie przekazuje eksportu domyślnego.
