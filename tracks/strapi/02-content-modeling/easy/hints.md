## Hint 1

Wspierane cardinality to zamknięty zbiór czterech nazw — trzymaj je w
`Set` i sprawdzaj przynależność, zamiast wymieniać warunki `||`.

## Hint 2

Właściciel relacji dwukierunkowej to `mappedBy` **lub** `inversedBy` —
wystarczy jedno z nich, nie oba naraz.

## Hint 3

Gdy `bidirectional` jest `false`, w ogóle nie patrz na `mappedBy`/`inversedBy`
— jednokierunkowa relacja jest poprawna, jeśli tylko typ jest wspierany.
