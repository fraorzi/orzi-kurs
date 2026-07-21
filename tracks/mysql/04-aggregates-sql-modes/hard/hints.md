## Hint 1

`MAX(recorded_at)` zwraca jedną wartość — datę. `value` obok niej w
tym samym `SELECT` bez agregacji nie ma żadnej gwarancji, z którego
wiersza pochodzi; przy domyślnym `ONLY_FULL_GROUP_BY` MySQL w ogóle
odrzuci takie zapytanie.

## Hint 2

Rozbij problem na dwa kroki: najpierw policz w podzapytaniu klucz
rekordu — parę `(device_id, MAX(recorded_at))` — potem złącz ten
wynik z powrotem do `readings`, żeby odzyskać cały wiersz, łącznie z
`value`.

## Hint 3

Kształt: `FROM readings r JOIN (SELECT device_id, MAX(recorded_at) AS
recorded_at FROM readings GROUP BY device_id) latest ON
latest.device_id = r.device_id AND latest.recorded_at =
r.recorded_at`. Urządzenie z jednym odczytem powinno przejść przez tę
samą ścieżkę bez specjalnego przypadku.
