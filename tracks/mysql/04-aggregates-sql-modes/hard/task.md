# Hard — wybierz rekord ostatniego zdarzenia

Panel monitoringu urządzeń IoT ma pokazać ostatni odczyt każdego
urządzenia — cały rekord, nie samą maksymalną datę. `MAX(recorded_at)`
mówi *kiedy* było ostatnie zdarzenie, ale nie mówi, jaka `value` mu
towarzyszyła — dobranie jej wprost obok `MAX` w tym samym `SELECT`
wymaga zgadywania, którą wartość silnik akurat wybierze.

Napisz zapytanie, które:

- dla każdego `device_id` zwraca `recorded_at` i `value` z dokładnie
  tego wiersza, który ma najnowszy `recorded_at` w tej grupie,
- nie zwraca `value` z przypadkowego wiersza grupy (nawet gdy w
  danych testowych "wygląda dobrze" — sedno błędu w tym, że wybór nie
  jest zagwarantowany),
- obsługuje urządzenie z pojedynczym odczytem tak samo jak z wieloma,
- sortuje wynik rosnąco po `device_id`.

Starter zwraca `value` obok `MAX(recorded_at)` bez agregacji ani
złączenia z powrotem do tabeli źródłowej — MySQL odrzuci to zapytanie
błędem 1055, bo `value` nie jest zależne funkcyjnie od `device_id`.
Zakłada przy tym, że każde urządzenie ma co najwyżej jeden odczyt z
danym `recorded_at`; obsługa dokładnych remisów czasu to temat
window functions.
