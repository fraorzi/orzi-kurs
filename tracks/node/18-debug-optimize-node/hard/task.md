# [O] Hard — usuń leak listenerów

Starter dostarcza zdarzenia, ale każda re-subskrypcja klienta **dokłada**
listener (stary zostaje), a cleanup nic nie robi — klasyczny wyciek: rosnąca
lista handlerów i podwójne dostawy.

Kontrakt funkcjonalny (bez zmian):

- `subscribe(clientId, listener)` podpina listener zdarzenia `"update"`
  i zwraca cleanup.

Bramka `[quality]`:

- ponowna subskrypcja tego samego `clientId` **zastępuje** poprzedni
  listener (stary przestaje dostawać zdarzenia, licznik listenerów nie rośnie);
- cleanup zdejmuje dokładnie swój listener;
- różne `clientId` współistnieją niezależnie.
