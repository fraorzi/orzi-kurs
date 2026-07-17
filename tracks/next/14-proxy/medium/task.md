# Dodaj optimistic redirect do logowania

Zaimplementuj `proxy`. Dla requestu do `/dashboard` i jego podtras bez cookie
`session` przekieruj na `/login`, dodając pełną ścieżkę i query jako parametr
`next`. Zalogowanego użytkownika oraz pozostałe trasy przepuść przez
`NextResponse.next()`.

To ma być wyłącznie tani prefiltr cookie. Nie wywołuj bazy ani zewnętrznego API;
bezpieczne authorization konkretnego zasobu pozostaje w DAL i endpointzie.
