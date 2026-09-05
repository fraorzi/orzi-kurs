# Zaprojektuj cache wielodostępnego katalogu

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

`getProduct` ma już dyrektywę cache, ale używa wyłącznie globalnego tagu. Ustaw
jawny profil `hours` i przypisz w jednym wywołaniu `cacheTag` trzy poziomy:

- `products`,
- `tenant:{tenantId}:products`,
- `tenant:{tenantId}:product:{slug}`.

`tenantId` i `slug` pozostają argumentami funkcji, dlatego naturalnie wchodzą do
klucza cache. Nie zmieniaj sposobu odczytu produktu ze store.
