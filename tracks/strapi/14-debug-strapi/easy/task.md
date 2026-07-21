# [D] Easy — napraw brak populate relacji

Zgłoszenie: strona artykułu wywala się na produkcji przy części
wpisów, mimo że lokalnie „zawsze działało”. Przyczyna: lokalny fetch
używał `populate=*`, produkcyjny klient zawęził zapytanie do potrzebnych
pól i przestał dołączać `cover`. REST API Strapi 5 nie populates relacji
domyślnie — bez jawnego `populate` klucz `cover` **nie pojawia się w
odpowiedzi wcale** (nie jest `null`, po prostu go nie ma).
Zaimplementuj `solve(entry)`:

- gdy `entry.cover` istnieje i ma `url`, zwróć `{ title: entry.title,
  coverUrl: entry.cover.url }`;
- gdy klucza `cover` nie ma w ogóle (zapytanie go nie populate'owało),
  zwróć `coverUrl: null` — bez rzucania błędu;
- gdy `cover` jest jawnie `null` (spopulowana, ale pusta relacja),
  zachowaj się identycznie jak przy braku klucza — `coverUrl: null`;
- `title` przechodzi bez zmian niezależnie od stanu `cover`.
