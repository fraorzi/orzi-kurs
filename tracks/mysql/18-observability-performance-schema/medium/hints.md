## Hint 1

`data_lock_waits` ma osobne identyfikatory dla obu stron:
`REQUESTING_THREAD_ID` (czeka) i `BLOCKING_THREAD_ID` (blokuje) —
`waiting_thread_id` to ten pierwszy, nie drugi.

## Hint 2

Szczegóły obiektu i tryb blokady pobierz z `data_locks` po stronie
czekającej: `JOIN data_locks ON data_locks.ENGINE_LOCK_ID =
data_lock_waits.REQUESTING_ENGINE_LOCK_ID AND data_locks.ENGINE =
data_lock_waits.ENGINE`.

## Hint 3

Jeżeli test widzi zamienione `waiting_thread_id`/`blocking_thread_id`,
sprawdź, czy przypadkiem nie dołączasz do `data_locks` po
`BLOCKING_ENGINE_LOCK_ID` zamiast `REQUESTING_ENGINE_LOCK_ID` — to
odwraca cały raport, mimo że zapytanie wykonuje się bez błędu.
