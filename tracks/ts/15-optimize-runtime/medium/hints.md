## Hint 1

Nie potrzebujesz osobno listy kluczy. `Map` zachowuje kolejność pierwszego wstawienia,
więc może jednocześnie pełnić rolę indeksu i wyniku.

## Hint 2

Dla każdego elementu wywołaj `getKey(item)` raz, odczytaj dotychczasowy licznik przez
`counts.get(key) ?? 0` i zapisz wartość powiększoną o jeden.

## Hint 3

Nie twórz klucza stringowego ani zwykłego obiektu. `Map<Key, number>` zachowuje
oryginalny typ `Key` i natywnie obsługuje symbole, `NaN` oraz `-0`.
