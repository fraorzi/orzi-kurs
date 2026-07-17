# Trzy aktualizacje w jednym zdarzeniu

Zaimplementuj `BatchCounter`.

Komponent zaczyna od `0` i pokazuje wynik w elemencie `output` o nazwie
`Wynik`. Przycisk `Dodaj 3` ma zwiększyć licznik dokładnie o trzy przy każdym
kliknięciu.

Wykonaj trzy osobne aktualizacje stanu w handlerze. Każda musi korzystać z wyniku
poprzedniej aktualizacji, a nie ze snapshotu przechwyconego przez render.
