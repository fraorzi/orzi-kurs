## Hint 1

Stan: `Map<string, listener>` per fabryka. Przy subskrypcji sprawdź, czy
klient ma już listener — jeżeli tak, najpierw `emitter.off` starej referencji.

## Hint 2

Cleanup zdejmuje listener **i** czyści wpis w mapie — ale tylko jeśli wpis
nadal wskazuje na ten listener (klient mógł się już ponownie zapisać).

## Hint 3

Test różnych klientów pilnuje, żeby mapa była per `clientId`, nie globalnym
"ostatnim listenerem".
