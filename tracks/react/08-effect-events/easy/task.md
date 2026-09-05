# Ticker z najnowszym krokiem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `StepCounter`.

`ticker.subscribe(listener)` rejestruje callback wywoływany przez zewnętrzny zegar
i zwraca cleanup. Każdy tick zwiększa licznik o aktualny prop `step`.

Zmiana `step` nie może ponownie subskrybować tickera, ale następny tick ma użyć nowej
wartości. Użyj Effect Eventu do odczytu najnowszego kroku, a efekt pozostaw zależny
wyłącznie od źródła subskrypcji.
