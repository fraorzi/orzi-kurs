## Hint 1

Starter liczy `LAG` po całej tabeli naraz — sensor 2 dostaje w spadku
wartość sensora 1, jeżeli ten akurat wypadł wcześniej w kolejności czasu.

## Hint 2

`PARTITION BY sensor_id` w `OVER` zamyka `LAG` w granicach jednego
sensora — pierwszy wiersz partycji zawsze dostaje `NULL` z `LAG`, to
oczekiwany wynik, nie brak danych do obsłużenia osobno.

## Hint 3

Kształt: `value - LAG(value) OVER (PARTITION BY sensor_id ORDER BY
measured_at, id) AS delta`. Test z przeplecionymi sensorami sprawdza
dokładnie brak partycji — jeśli delta miesza serie, `PARTITION BY` wciąż
brakuje albo jest w złym miejscu.
