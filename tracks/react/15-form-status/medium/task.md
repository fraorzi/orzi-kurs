# Komunikat z aktualnie wysyłanych danych

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `OrderForm`.

Formularz ma select `Produkt` z opcjami `Klawiatura` i `Monitor`. Podczas
wykonywania `placeOrder(product)` select i przycisk są wyłączone, a status pokazuje
`Zamawianie: {product}…`.

Nie kopiuj wybranego produktu do `useState`. Komponent potomny formularza ma
odczytać aktualnie wysyłaną wartość z `data` zwracanego przez `useFormStatus`.
