# Test odporny na zmianę tabeli w karty

Edytujesz test w `starter.tsx`. `InvoiceList` ma dwa równoważne layouty:
`"table"` i `"cards"`.

Napisz jeden parametryzowany test przez `it.each`, który dla obu layoutów:

- odnajduje przycisk po roli i nazwie `Otwórz fakturę Acme`,
- klika go przez `user-event`,
- sprawdza wywołanie `onOpen("inv-1")`.

Test nie może zależeć od `container`, tagów, kolejności dzieci, klas, test ID ani
snapshotu. Ma przeżyć refaktor struktury przy zachowaniu kontraktu użytkownika.
