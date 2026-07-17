# Zbuduj MarketplaceRepository

Zaimplementuj findListing i placeOrder dla puli mysql2.

## Kryteria akceptacji

- Wszystkie dane wejściowe trafiają do prepared statements.
- Zakup blokuje listing, zapisuje order/item i zmniejsza stock w jednej transakcji.
- Deadlock/lock timeout ponawia całą transakcję maksymalnie trzy razy.
- Każde zakończenie emituje metrykę operation/outcome/attempt/duration bez SQL i danych klienta.
- Połączenie jest zwalniane na każdej ścieżce.
