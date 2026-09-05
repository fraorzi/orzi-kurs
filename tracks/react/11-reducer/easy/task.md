# Ilość produktu z akcjami domenowymi

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `QuantityPicker` przez `useReducer`.

Komponent startuje od `initialQuantity`, pokazuje `Ilość` oraz przyciski `Zmniejsz`,
`Zwiększ` i `Resetuj`.

Ilość nie może spaść poniżej `1`. Reset przywraca wartość `initialQuantity`.
Zdefiniuj rozłączną unię akcji opisujących te trzy zdarzenia.
