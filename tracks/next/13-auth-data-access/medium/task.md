# Zamknij IDOR w DAL projektu

`getProjectDTO` zwraca surowy rekord każdemu zalogowanemu użytkownikowi. Dodaj
`server-only`, pobierz viewer, sprawdź czy jego ID znajduje się w `memberIds`, a przy
braku dostępu lub rekordu rzuć jednakowe `Project not found`.

Zwróć nowy DTO z `id`, `name` i `status`. Nie zwracaj `budget`, `secretNotes` ani
`memberIds`.
