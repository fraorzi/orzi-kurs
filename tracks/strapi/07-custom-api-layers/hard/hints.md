## Hint 1

Trzy kroki w ścisłej kolejności: normalizacja, walidacja formatu,
sprawdzenie konfliktu — dopiero po wszystkich trzech woła się `update`.

## Hint 2

Regex kotwiczony `^[a-z0-9]+(?:-[a-z0-9]+)*$` odrzuca wiodący/końcowy
myślnik i podwójny myślnik naraz — segment między myślnikami nie może być
pusty.

## Hint 3

`repo.exists(normalized, documentId)` — drugi argument to dokument, który
ma być **wykluczony** z porównania unikalności, nie dodatkowy filtr do
zapisania gdzie indziej; zapis tego samego sluga do tego samego dokumentu
nie powinien nigdy wyglądać jak konflikt.
