# ts+react — typowany reducer i Context koszyka

Zbuduj stan koszyka na typowanym reducerze i udostępnij go przez Context
z bezpiecznym hookiem. Łączy dyskryminowane unie akcji (TypeScript)
z wzorcem Provider/hook (React).

Uzupełnij:

- `reducer(state, action)`: `add` zwiększa `count` o `amount`, `remove`
  zmniejsza, `reset` zeruje. Stan **nigdy** nie schodzi poniżej zera,
  a ujemny `amount` jest traktowany jak zero (`Math.max(0, ...)`);
- obsłuż wyczerpanie unii akcji przez `satisfies never` (kompilator wymusi
  komplet przypadków);
- `useCart()`: zwraca stan z Contextu, a **poza** `CartProvider` rzuca
  czytelny błąd wskazujący brakującego Providera (nie cichy fallback).

## Kryteria akceptacji

- żadna akcja nie tworzy ujemnego `count`,
- dodanie nowego wariantu akcji bez obsługi = błąd kompilacji,
- `useCart` poza Providerem rzuca, wewnątrz zwraca stan.
