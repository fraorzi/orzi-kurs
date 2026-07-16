# Komunikat z aktualnie wysyłanych danych

Zaimplementuj `OrderForm`.

Formularz ma select `Produkt` z opcjami `Klawiatura` i `Monitor`. Podczas
wykonywania `placeOrder(product)` select i przycisk są wyłączone, a status pokazuje
`Zamawianie: {product}…`.

Nie kopiuj wybranego produktu do `useState`. Komponent potomny formularza ma
odczytać aktualnie wysyłaną wartość z `data` zwracanego przez `useFormStatus`.
