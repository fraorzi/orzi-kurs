# Hard — czytaj typowany fragment JSON

Kolumna `settings` przechowuje ustawienia profilu zaimportowane z
zewnętrznego systemu jako JSON — schemat dokumentu nie jest wymuszony
przez bazę, więc każdy klucz może mieć nieoczekiwany typ albo w ogóle
nie istnieć. Kod, który dalej przetwarza język powiadomień, oczekuje
zwykłego tekstu, nie dowolnej wartości JSON.

Napisz zapytanie, które:

- zwraca `id` i `language` (czysty tekst, bez cudzysłowów JSON) dla
  rekordów, w których `$.notifications.language` istnieje i ma typ
  STRING według `JSON_TYPE`,
- pomija rekord, gdy wartość pod tą ścieżką jest liczbą, obiektem albo
  literałem JSON `null` — dokument nie pasuje do oczekiwanego kształtu,
  ale to nie jest błąd zapytania,
- pomija rekord, gdy ścieżka `$.notifications.language` w ogóle nie
  istnieje w dokumencie,
- sortuje wynik rosnąco po `id`.

Starter czyta wartość operatorem `->`, który zwraca JSON (string w
cudzysłowach), i nie sprawdza `JSON_TYPE` — przepuszcza rekordy z
liczbą, obiektem albo brakiem klucza zamiast je odfiltrować.
