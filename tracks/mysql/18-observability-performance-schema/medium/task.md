# Medium — połącz oczekującą blokadę z blokującą sesją

Worker zgłasza timeouty na `UPDATE`, ale nie wiadomo, która sesja trzyma
blokadę. `performance_schema.data_lock_waits` mówi, kto na kogo czeka;
`data_locks` mówi, o jaki dokładnie obiekt i tryb blokady chodzi — trzeba
je połączyć po właściwej stronie, bo obie strony (czekająca i blokująca)
mają swój `ENGINE_LOCK_ID`.

Zbuduj raport oczekujących blokad z kolumnami `waiting_thread_id`,
`blocking_thread_id`, `object_schema`, `object_name`, `lock_type`
i `lock_mode`:

- `waiting_thread_id` to `REQUESTING_THREAD_ID` z `data_lock_waits` —
  strona, która czeka, nie ta, która blokuje,
- `blocking_thread_id` to `BLOCKING_THREAD_ID`,
- szczegóły obiektu i trybu blokady (`object_schema`, `object_name`,
  `lock_type`, `lock_mode`) pochodzą z wiersza **czekającej** blokady
  w `data_locks` — dołącz go po `REQUESTING_ENGINE_LOCK_ID = ENGINE_LOCK_ID`
  i zgodności `ENGINE`,
- raport ma obejmować każdą aktualnie oczekującą parę wait/block —
  bez agregacji, bez filtrowania po konkretnej tabeli.

`data_lock_waits` jest tabelą transient: wiersz istnieje tylko, dopóki
blokada faktycznie czeka, i znika, gdy blokująca transakcja się zakończy
(`COMMIT`/`ROLLBACK`).
