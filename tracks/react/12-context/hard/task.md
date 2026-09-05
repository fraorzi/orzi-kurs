# Rozdzielenie stanu i dispatchu

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `CounterProvider`, `CounterValue` i `IncrementButton`.

`CounterValue` czyta zmieniający się licznik. `IncrementButton` potrzebuje wyłącznie
stabilnego dispatchu akcji `incremented`.

Użyj dwóch contextów z defaultem `null` i składni providerów React 19. Aktualizacja
licznika nie może ponownie renderować `IncrementButton`, jeśli jego propsy i context
dispatchu się nie zmieniły.

Nie rozwiązuj zadania przez ręczną memoizację komponentu lub obiektu value.
