# Dokończ panel zgłoszeń projektu

Pracuj w wieloplikowym katalogu `src/`.

## Filtry URL

- `parseIssueFilters` przyjmuje status `all | open | in-progress | done`, przycina
  query do 80 znaków i normalizuje page do dodatniej liczby całkowitej.
- `buildIssueFilterHref` zachowuje obce parametry, aktualizuje wskazane pola i
  resetuje page do 1 po zmianie statusu albo query.

## DAL i DTO

- Każdy odczyt wymaga membership użytkownika w projekcie.
- Lista wywołuje store dopiero po authz i zwraca minimalne DTO.
- Szczegół nie ujawnia, czy rekord istnieje poza projektem użytkownika; zwraca
  `null` dla obu przypadków. Nie zwracaj `internalNotes`.

## Server Action

- Odczytaj sesję, `issueId` i docelowy status z FormData.
- Odrzuć brak sesji, zły payload, brak rekordu, brak membership lub rolę `viewer`.
- Nie ufaj `projectId` z formularza — użyj projektu rzeczywistego zgłoszenia.
- Po mutacji wywołaj tag `project:{projectId}:issues` i zwróć success.

Zachowaj rozłączne wyniki i wszystkie publiczne typy.
