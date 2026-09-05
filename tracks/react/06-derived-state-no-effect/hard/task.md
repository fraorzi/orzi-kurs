# Potwierdzenie zamówienia jest zdarzeniem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `OrderCheckout`.

Komponent otrzymuje `unitPriceCents`, ma kontrolowane pole numeryczne `Ilość`,
wyświetla `Łącznie` i przy submitcie wywołuje `onConfirm` z:

```ts
{
  (quantity, totalCents);
}
```

`totalCents` wyliczaj podczas renderu. Potwierdzenie wykonuj bezpośrednio w handlerze
submitu. Sama edycja ilości nie może wywołać callbacku, a dwa kolejne submitty bez
zmiany danych mają wywołać go dwa razy.

Nie modeluj zdarzenia przez flagę w stanie i obserwujący ją efekt.
