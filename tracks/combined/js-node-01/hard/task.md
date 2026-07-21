# CLI z pulą i retry

## Kontekst

CLI importuje katalog plików przez zawodny endpoint HTTP. Bez limitu
współbieżności zalewa endpoint setkami żądań naraz; bez retry jeden
przejściowy timeout wywala cały import od zera.

## Wymagania

- `runCli(items, limit, worker)` przetwarza `items` przez `worker`,
  maksymalnie `limit` równolegle.
- Wynik zachowuje kolejność wejściową, niezależnie od kolejności
  zakończenia poszczególnych zadań.
- Błąd z `error.transient === true` ponawiany do 3 prób łącznie na item;
  błąd bez tej flagi przerywa cały import natychmiast, bez ponawiania.
- `limit` niecałkowity lub mniejszy niż 1 rzuca błąd, zanim jakikolwiek
  `worker` zostanie wywołany.

## Kryteria akceptacji

- Szczytowa liczba równoległych wywołań `worker` nie przekracza `limit`.
- Item, który raz rzucił błąd transient i za kolejną próbą się udał, trafia
  do wyniku na swojej pozycji.
- Item z błędem trwałym przerywa `runCli` bez dodatkowych prób.
