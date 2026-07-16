# Znajdź wyciek starej subskrypcji

Napraw `NotificationBadge`.

`source.subscribe(listener)` rejestruje listener i zwraca cleanup. Po zmianie
obiektu `source` stara subskrypcja ma zostać odłączona, a nowe zdarzenia mają
pochodzić wyłącznie z aktualnego źródła. Odmontowanie także musi wykonać cleanup.

Nie zmieniaj interfejsu `NotificationSource`.

