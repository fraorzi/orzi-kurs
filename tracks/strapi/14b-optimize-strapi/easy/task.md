# [O] Easy - zawęź fields i populate

Tryb: optymalizacja. Popraw istniejący kod w `starter.ts`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Endpoint listy artykułów zwraca poprawne dane, ale każdy rekord ciągnie
wszystkie kolumny i całą relację `cover` przez `populate: "*"`. Widok używa
tylko tytułu, sluga i URL okładki.

Starter jest funkcjonalnie poprawny. Zawęź zapytanie, nie zmieniając
kontraktu widoku:

- `status` pozostaje `"published"`;
- `fields` ograniczone do `["title", "slug"]`;
- `populate` to jawny obiekt `{ cover: { fields: ["url", "alternativeText"] } }`,
  nie wildcard `"*"`.

Bramka `[quality]`: dokładnie 2 pola i brak wildcard populate.
