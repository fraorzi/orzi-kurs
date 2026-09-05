# Medium - znajdź zamówienia bez wysyłki

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Job magazynowy co godzinę pobiera zamówienia do spakowania: otwarte
i jeszcze niewysłane. Kolumna `shipped_at` pozostaje NULL do momentu
nadania paczki, więc "brak wysyłki" to filtr po braku wartości - a NULL
rządzi się w SQL logiką trójwartościową.

Napisz zapytanie, które:

- zwraca `id` zamówień o `status = 'open'` i pustym `shipped_at`,
- pomija zamówienia wysłane (dowolna data w `shipped_at`),
- pomija zamówienia w innych statusach, nawet jeżeli są niewysłane,
- sortuje wynik rosnąco po `id`.

Starter używa porównania `= NULL` - daje ono UNKNOWN dla każdego
wiersza, więc zapytanie zawsze zwraca pusty wynik, bez błędu i bez
ostrzeżenia. Napraw przyczynę, nie objaw.
