# Dokończ granice odzyskiwania segmentu produktu

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Popraw dwa pliki konwencji:

- `error.tsx` ma być Client Component, raportować `error` w `useEffect`, pokazywać
  digest, jeśli istnieje, i wywoływać `unstable_retry` z przycisku,
- `not-found.tsx` ma zawierać nagłówek `Nie znaleziono produktu` i link Next do
  `/products` o nazwie `Wróć do katalogu`.

Nie pokazuj surowego message nieoczekiwanego błędu użytkownikowi.
