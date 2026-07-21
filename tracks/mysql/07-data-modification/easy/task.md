# Easy — wstaw rekord z jawnymi kolumnami

Formularz rejestracji wstawia nowego użytkownika i zostawia znacznik czasu
rejestracji bazie — aplikacja nie zna aktualnego czasu serwera, a różnica
stref czasowych między instancją a bazą regularnie psuje ręcznie liczony
`NOW()` po stronie klienta. Kolumna `created_at` ma default właśnie po to,
żeby baza sama wpisała poprawny czas.

Napisz zapytanie, które:

- wstawia dokładnie jeden wiersz do `users` z jawną listą kolumn
  `(id, email)` — bez polegania na kolejności kolumn zadeklarowanej
  w tabeli,
- wstawia `id = 1` i `email = 'a@example.com'`,
- pozostawia `created_at` bazie: kolumna ma zostać **pominięta** w
  insercie, żeby zadziałał jej `DEFAULT CURRENT_TIMESTAMP` — jawny `NULL`
  w `VALUES` nie uruchamia defaultu i przy rygorystycznym `sql_mode`
  MySQL 8.4 kończy się błędem `NOT NULL` na kolumnie `created_at`.

Zapytanie ma działać niezależnie od fizycznej kolejności kolumn w
definicji tabeli `users`.
