# Checkout jako jawna maszyna stanów

Zaimplementuj `CheckoutFlow` i eksportowany `checkoutReducer`.

Stany:

- `cart` z `itemCount`,
- `review` z `itemCount`,
- `submitting` z `itemCount`,
- `error` z `itemCount` i `message`,
- `success` z `orderId`.

Zdarzenia:

- dodanie produktu działa tylko w `cart`,
- przejście do review wymaga co najmniej jednego produktu,
- edycja wraca z `review` lub `error` do koszyka,
- submit/retry przechodzi z `review` lub `error` do `submitting`,
- sukces i błąd są akceptowane wyłącznie w `submitting`,
- nielegalna akcja zwraca dokładnie ten sam obiekt stanu.

`submitOrder(itemCount)` wywołuj w handlerze. Pending pokazuje status
`Składanie zamówienia…`, error alert i przyciski `Edytuj koszyk`/`Ponów zamówienie`,
a sukces nagłówek `Zamówienie {orderId} złożone`.
