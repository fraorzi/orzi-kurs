# Rejestracja pól z cleanupem callback refa

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `RegisteredFields`.

Komponent otrzymuje listę pól oraz zewnętrzny `registry`. Dla każdego inputa callback
ref ma wywołać `registry.attach(field.id, node)`. Metoda zwraca cleanup, który należy
zwrócić Reactowi, aby rejestr odpiął element po usunięciu refa lub unmountcie.

Nie wywołuj `attach`, gdy callback dostanie `null`. Pola mają zachować dostępne
etykiety z danych.
