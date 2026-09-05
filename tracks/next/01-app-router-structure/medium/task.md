# Wyznacz URL z pliku App Routera

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `routePathForFile(filePath)`, używany przez wewnętrzny skrypt review.

Funkcja zwraca URL wyłącznie dla `page.tsx` i `route.ts` wewnątrz folderu `app`:

- usuwa route groups `(group)` i sloty `@slot` z URL,
- zachowuje zwykłe oraz dynamiczne segmenty,
- zwraca `null` dla prywatnej gałęzi `_folder`, innych plików i ścieżek poza `app`,
- obsługuje separatory `/` i `\\`.

Zakodowany segment `%5Finternal` jest publiczny - nie myl go z `_internal`.
