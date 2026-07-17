## Hint 1

Dyrektywa cache musi być pierwszą instrukcją funkcji; tagi mogą być wielopoziomowe.

## Hint 2

Action ustala tenant z `findProduct(productId)`, nie z payloadu klienta.

## Hint 3

Nie awaituj sekcji w `InventoryDashboard`; async pracę wykonują potomkowie pod Suspense.

## Hint 4

W telemetry użyj `try/catch/finally`, a log zbuduj przez jawną allow-listę.
