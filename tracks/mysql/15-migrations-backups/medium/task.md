# Medium - rozdziel imię i nazwisko etapami

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

`customers.name` trzyma pełne imię i nazwisko jako jeden ciąg znaków, ale
nowy formularz rejestracji potrzebuje osobnych pól. Kod aplikacji czytający
`given_name`/`family_name` wdraża się osobno (i później) niż migracja bazy
- to typowy podział na expand i contract: migracja dodaje i wypełnia nowe
kolumny teraz, a usunięcie starego `name` to osobny, późniejszy deploy,
kiedy żaden kod nie będzie go już czytał.

## Wymagania

- Dodaj `given_name`, `family_name` jako `NULL`, wypełnij je z `name`
  (pierwsze słowo → `given_name`, reszta po pierwszej spacji →
  `family_name`, żeby wieloczłonowe nazwiska nie ucinały się do ostatniego
  słowa), dopiero potem zaostrz obie kolumny do `NOT NULL`.
- `name` zostaje w tabeli nietknięte - jego usunięcie to osobna migracja
  typu `contract`, po wdrożeniu kodu, który już go nie potrzebuje.
- Migracja nie może zakładać dokładnie dwóch słów w `name` - nazwisko
  wieloczłonowe (`Maria Skłodowska Curie`) ma trafić w całości do
  `family_name`.

Rozdzielenie na expand i contract nie jest formalnością: gdyby `name`
zniknął w tej samej migracji, stara wersja aplikacji (wciąż wdrożona na
części serwerów podczas rollout) przestałaby działać natychmiast.
