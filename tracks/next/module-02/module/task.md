# Dokończ operacyjny dashboard magazynu

Pracuj w katalogu `src/`.

## Cache katalogu

- `getCatalog` ma dyrektywę `"use cache"`, lifetime `minutes` i dwa tagi:
  `catalog` oraz `tenant:{tenantId}:catalog`.
- Loader store otrzymuje tylko tenant ID.

## Mutacja stanu

- Zweryfikuj sesję, product ID i całkowity stock 0–10000.
- Odczytaj produkt, a membership sprawdź dla jego prawdziwego tenanta; tylko
  `manager | owner` może mutować.
- Po zapisie wywołaj `updateTag` dla produktu i katalogu jego tenanta.
- Nie ufaj `tenantId` z FormData.

## Streaming

- `InventoryDashboard` ma być synchroniczny i renderować heading od razu.
- `CatalogSection` i `AlertsSection` są niezależnymi async komponentami pod dwiema
  granicami Suspense z nazwanymi fallbackami.

## Telemetry

- `observeInventoryOperation` ma zawsze zakończyć span.
- Sukces ustawia status `ok` i loguje nazwę, tenantId, productId, durationMs.
- Błąd zapisuje wyjątek, status `error`, bezpieczny errorCode, loguje bez `secret`
  i ponownie rzuca oryginalny błąd.
