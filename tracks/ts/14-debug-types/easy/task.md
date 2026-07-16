# Easy — odcięcie `any` z SDK

Funkcja `readSdkInvoice` symuluje cudze SDK i zwraca `any`; nie wolno zmieniać jej
deklaracji. Napraw `invoiceTotal`, aby:

- natychmiast przejąć wynik jako `unknown`,
- zaakceptować obiekt z tablicą `items`,
- każda pozycja ma `price: number` i `quantity: number`,
- zwrócić sumę albo `null` dla dowolnego złego kształtu.

W kodzie `invoiceTotal` zabronione są `any`, `as` i non-null assertion.
