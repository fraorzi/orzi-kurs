# Wielokrotne pole klucza API bez kolizji ID

Zaimplementuj `ApiKeyField`.

Komponent otrzymuje `label` i `hint`. Etykietę połącz z inputem przez `htmlFor`/`id`,
a hint z polem przez `aria-describedby`.

Na jednej stronie może być wiele instancji. Każda musi mieć własne ID, poprawną
dostępną nazwę i opis. Użyj jednego `useId` jako prefiksu powiązanych elementów.
