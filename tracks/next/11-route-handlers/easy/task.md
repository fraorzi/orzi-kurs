# Zwaliduj paginację GET

Uzupełnij `GET`. Parametr `page` domyślnie wynosi 1, a `limit` 20. Oba muszą być
dodatnimi liczbami całkowitymi; limit nie może przekroczyć 100. Dla błędu zwróć
JSON `{ error: "Invalid pagination" }` ze statusem 400. Dla sukcesu zwróć dane,
page i limit oraz nagłówek `Cache-Control: private, no-store`.
