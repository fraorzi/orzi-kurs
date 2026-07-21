## Hint 1

`name.replaceAll("\\", "/").split("/").at(-1)` zdejmuje ścieżkę
niezależnie od tego, czy ktoś użył separatora uniksowego czy windowsowego.

## Hint 2

Sprawdź rozszerzenie **przed** czyszczeniem bazy — allow-list
(`["jpg", "jpeg", "png", "webp"]` po `.toLowerCase()`) i mapowanie
`jpeg → jpg` to osobny krok od sanityzacji nazwy.

## Hint 3

`name.normalize("NFKD").replace(/\p{M}/gu, "")` rozkłada znak z diakrytyką
na literę bazową i znak diakrytyczny, który potem usuwasz — dopiero
wtedy zamieniaj resztę niedozwolonych znaków na `-`.
