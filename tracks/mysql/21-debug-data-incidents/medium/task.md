# Medium - usuń lost update licznika

Tryb: naprawa. W `starter.sql` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Licznik odwiedzin ma być zwiększany przez wiele równoległych requestów.
Post-mortem: dwa requesty w tej samej milisekundzie mają zwiększyć
wartość łącznie o dwa, ale licznik rośnie tylko o jeden - `starter.sql`
czyta wartość do zmiennej, czeka (symulacja pracy między odczytem
a zapisem), potem zapisuje `@zmienna + 1`. Obie sesje zdążają przeczytać
tę samą starą wartość, zanim którakolwiek zapisze nową.

Napraw `starter.sql` tak, aby:

- zwiększał `value` w tabeli `counters` o dokładnie 1 za jedno
  wykonanie,
- pod dwiema **równoległymi** sesjami wykonującymi tę samą instrukcję na
  tym samym wierszu dawał sumaryczny przyrost o 2, nie o 1,
- pod dziesięcioma równoległymi sesjami dawał przyrost o 10 - bez
  względu na to, ile sesji odczytało "starą" wartość w tym samym
  momencie,
- pozostawał pojedynczą instrukcją - bez `SELECT` do zmiennej
  poprzedzającego `UPDATE`.

Read-modify-write (`SELECT` do zmiennej, potem `UPDATE` na jej
podstawie) to dwie osobne instrukcje z oknem czasowym między nimi -
atomowe `UPDATE counters SET value = value + 1 WHERE id = ?` liczy nową
wartość pod blokadą wiersza, na aktualnym stanie, w jednym kroku, bez
okna na wyścig.
