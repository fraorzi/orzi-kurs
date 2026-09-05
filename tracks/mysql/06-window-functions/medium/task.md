# Medium - porównaj z poprzednim pomiarem

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Dashboard czujników IoT ma wyróżnić skokową zmianę wartości - różnicę
między bieżącym a poprzednim odczytem tego samego sensora. Policzenie tego
przez samo-join dwóch kopii tabeli po `id - 1` psuje się, gdy w serii
brakuje odczytu (numeracja nie jest ciągła); `LAG()` porównuje z faktycznie
poprzednim wierszem w kolejności czasowej, nie po arytmetyce na `id`.

Napisz zapytanie, które:

- zwraca kolumny `id`, `value`, `delta` - dokładnie te trzy,
- liczy `delta` jako różnicę bieżącej i poprzedniej wartości **tego samego
  `sensor_id`**, uporządkowanej po `measured_at`,
- dla pierwszego odczytu każdego sensora (brak poprzednika) zwraca
  `delta = NULL` - nie 0 i nie błąd,
- przy dwóch odczytach tego samego sensora z identycznym `measured_at`
  rozstrzyga remis rosnąco po `id`,
- sortuje wynik po `id` rosnąco.

Sensory nie mogą się nawzajem "widzieć" - odczyt sensora 2 nigdy nie jest
poprzednikiem odczytu sensora 1, nawet jeśli w tabeli sąsiaduje z nim po
czasie.
