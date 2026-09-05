# Suma zamówienia zawsze zgodna z propsami

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `OrderSummary`.

Komponent otrzymuje pozycje z `quantity` i `unitPriceCents`. Ma wyświetlić ich sumę
w elemencie `output` o nazwie `Suma` w formacie `12.34 zł`.

Suma ma reagować także na nowe `items` przekazane przez rodzica. Oblicz ją podczas
renderu; nie kopiuj wyniku ani propsów do stanu i nie używaj efektu.
