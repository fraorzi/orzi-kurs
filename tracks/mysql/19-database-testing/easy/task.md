# Easy — zbuduj idempotentną fixture

Zestaw testów integracyjnych ma wspólną fixture `seedUsers`, która
przygotowuje dwóch kanonicznych użytkowników przed każdym scenariuszem.
Uruchomiona raz na czystej bazie działa — ale drugie uruchomienie (kolejny
test w tym samym pliku, albo ponowny przebieg CI na tej samej bazie
deweloperskiej) kończy się `ER_DUP_ENTRY`, bo `starter.ts` robi zwykły
`INSERT`.

Zaimplementuj `seedUsers(connection)` tak, aby:

- wstawiała użytkowników `(101, 'Ada')` i `(102, 'Grace')`, gdy tabela
  jest pusta,
- przy powtórnym wywołaniu **naprawiała** wartości do kanonicznych, jeśli
  ktoś je wcześniej nadpisał (np. wiersz `101` ma dziś `name = 'stale'`),
  zamiast rzucać błąd duplikatu klucza,
- nie usuwała ani nie modyfikowała wierszy spoza tego zestawu — inny test
  mógł celowo zostawić w tabeli dodatkowego użytkownika,
- była w pełni idempotentna: N wywołań pod rząd ma dać dokładnie ten sam
  stan co jedno.

Fixture, która działa tylko raz na pustej tabeli, nie jest fixture — jest
pułapką na drugi test w kolejności.
