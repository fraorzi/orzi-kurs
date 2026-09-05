# Hard - fulfillment przez małe porty

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `fulfillOrder` bez klas bazowych i bez sprawdzania `instanceof`.

Funkcja otrzymuje dwa capability interfaces:

- `StockPort.reserve(sku, quantity): boolean`,
- `AuditPort.record(event): void`.

Dla każdej pozycji spróbuj zarezerwować stan. Przy pierwszej odmowie zapisz zdarzenie
`rejected` i zwróć wynik błędu. Gdy wszystkie rezerwacje się powiodą, zapisz `fulfilled`
i zwróć sukces. Pustego zamówienia nie wolno realizować.

Adaptery mogą mieć dowolne dodatkowe pola i metody - liczy się zgodność strukturalna.
