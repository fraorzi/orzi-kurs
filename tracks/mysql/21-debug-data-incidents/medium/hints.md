## Hint 1

`SET @zmienna = (SELECT ...)` i późniejszy `UPDATE` to dwie osobne
instrukcje — druga sesja może odczytać tę samą starą wartość w oknie
między nimi, zanim którakolwiek zapisze nową.

## Hint 2

InnoDB blokuje wiersz na czas `UPDATE` i liczy prawą stronę wyrażenia na
aktualnym stanie w bazie w momencie zapisu — nie na wartości odczytanej
wcześniej do zmiennej klienta.

## Hint 3

Zastąp cały starter jedną instrukcją: `UPDATE counters SET value = value
+ 1 WHERE id = 1;` — bez `SET @zmienna`, bez `SLEEP`, bez pośredniego
odczytu.
