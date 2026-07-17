## Hint 1

Najpierw napisz pomocniczy typ dla pojedynczego segmentu. Sprawdzaj kolejno `:name?`,
`:name`, `*name`, a na końcu segment statyczny.

## Hint 2

Trasę rozbij przez `Path extends \`${infer Segment}/${infer Rest}\`` i połącz wynik
bieżącego segmentu z rekurencyjnym wynikiem reszty przez przecięcie.

## Hint 3

Przed rekurencją sprawdź `string extends Path`. Bez tego szeroki `string` zachowa się
jak nieznany segment statyczny zamiast bezpiecznego słownika parametrów.
