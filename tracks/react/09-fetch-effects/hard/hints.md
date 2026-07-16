## Hint 1

Kontroler utwórz wewnątrz efektu, aby każdy `productId` miał własny signal.

## Hint 2

Przed każdym `setResult` sprawdź `controller.signal.aborted`.

## Hint 3

Cleanup wywołuje `controller.abort()`. Błąd po anulowaniu ignoruj, a pozostały
zamień na stan error.
