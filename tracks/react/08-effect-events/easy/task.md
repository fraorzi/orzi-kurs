# Ticker z najnowszym krokiem

Zaimplementuj `StepCounter`.

`ticker.subscribe(listener)` rejestruje callback wywoływany przez zewnętrzny zegar
i zwraca cleanup. Każdy tick zwiększa licznik o aktualny prop `step`.

Zmiana `step` nie może ponownie subskrybować tickera, ale następny tick ma użyć nowej
wartości. Użyj Effect Eventu do odczytu najnowszego kroku, a efekt pozostaw zależny
wyłącznie od źródła subskrypcji.
