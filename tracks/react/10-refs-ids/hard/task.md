# Rejestracja pól z cleanupem callback refa

Zaimplementuj `RegisteredFields`.

Komponent otrzymuje listę pól oraz zewnętrzny `registry`. Dla każdego inputa callback
ref ma wywołać `registry.attach(field.id, node)`. Metoda zwraca cleanup, który należy
zwrócić Reactowi, aby rejestr odpiął element po usunięciu refa lub unmountcie.

Nie wywołuj `attach`, gdy callback dostanie `null`. Pola mają zachować dostępne
etykiety z danych.
