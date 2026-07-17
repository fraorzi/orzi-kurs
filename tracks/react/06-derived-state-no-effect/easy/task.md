# Suma zamówienia zawsze zgodna z propsami

Zaimplementuj `OrderSummary`.

Komponent otrzymuje pozycje z `quantity` i `unitPriceCents`. Ma wyświetlić ich sumę
w elemencie `output` o nazwie `Suma` w formacie `12.34 zł`.

Suma ma reagować także na nowe `items` przekazane przez rodzica. Oblicz ją podczas
renderu; nie kopiuj wyniku ani propsów do stanu i nie używaj efektu.
