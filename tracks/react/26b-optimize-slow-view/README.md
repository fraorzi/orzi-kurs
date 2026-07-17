# Optymalizacja wolnego widoku bez zmiany zachowania

Zadania optymalizacyjne różnią się od zwykłych napraw: starter jest funkcjonalnie
poprawny. Najpierw testy chronią zachowanie, a osobna bramka `[quality]` zapisuje
zmierzony budżet renderów lub kosztownych obliczeń. Refaktor jest ukończony dopiero
wtedy, gdy oba rodzaje testów są zielone.

## Kolejność interwencji

1. Zmierz konkretną interakcję małą granicą Profiler lub licznikiem kosztownej
   funkcji.
2. Zlokalizuj przejściowy stan tak nisko, jak pozwala przepływ danych.
3. Użyj kompozycji `children`, aby stan wrappera nie wymuszał odtwarzania jego
   kosztownej zawartości.
4. Podziel widok na granice o niezależnych powodach do renderu.
5. Dopiero wtedy stabilizuj dane i callbacki oraz memoizuj zmierzony fragment.
6. Powtórz pomiar i testy poprawności.

Małe propsy-prymitywy ułatwiają pominięcie renderu. Jeśli komponent dostaje nowy
obiekt lub funkcję przy każdym renderze, `memo` nie pomaga. Custom comparator jest
ostatecznością, bo musi być szybszy od renderu i porównywać również callbacki.

## Kiedy używać

- W granularnych interfejsach, gdzie częste lokalne interakcje dotykają dużego
  poddrzewa.
- Gdy Profiler wskazał konkretny komponent lub kalkulację, a nie ogólne odczucie.
- Przy regresji potwierdzonej powtarzalnym scenariuszem i budżetem jakościowym.

## Pułapki

- Szybszy kod z innym zachowaniem jest regresją, nie optymalizacją.
- Milisekundy w jsdom/CI są niestabilne; deterministycznie licz pracę, a czas
  potwierdzaj w przeglądarce na reprezentatywnych danych.
- Memoizacja całego drzewa zwiększa złożoność i może nie dać żadnego zysku.
- Nowy inline prop unieważnia domyślne porównanie `memo`.
- Przeniesienie stanu zbyt nisko może zerwać potrzebną koordynację komponentów.
- Optymalizacja development builda nie zastępuje pomiaru builda produkcyjnego.

## Źródła

- <https://react.dev/reference/react/Profiler>
- <https://react.dev/reference/react/memo>
- <https://react.dev/reference/react/useMemo>
- <https://react.dev/reference/react/useCallback>
- <https://react.dev/learn/sharing-state-between-components>
- <https://react.dev/reference/react/memo#should-you-add-memo-everywhere>

