## Hint 1

Utwórz `deferredQuery = useDeferredValue(query)` i tylko tę wartość przekaż do
komponentu czytającego resource.

## Hint 2

Stara zawartość jest widoczna, gdy `query !== deferredQuery`. To dobry sygnał dla
tekstu statusu oraz `aria-busy`.

## Hint 3

Boundary Suspense nadal jest potrzebny dla pierwszego renderu bez gotowych
danych. Przy aktualizacji odroczonej React zachowa jednak poprzednią zawartość.

