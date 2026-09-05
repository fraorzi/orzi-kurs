# Znajdź wyciek starej subskrypcji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Napraw `NotificationBadge`.

`source.subscribe(listener)` rejestruje listener i zwraca cleanup. Po zmianie
obiektu `source` stara subskrypcja ma zostać odłączona, a nowe zdarzenia mają
pochodzić wyłącznie z aktualnego źródła. Odmontowanie także musi wykonać cleanup.

Nie zmieniaj interfejsu `NotificationSource`.
