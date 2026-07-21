## Hint 1

Dwa oddzielne wywołania z osobnymi kształtami payloadu — `update` niesie
`data`, `publish` go nie potrzebuje, bo tylko zmienia status wersji już
zapisanej.

## Hint 2

Zwykłe `await` w kolejności zapisuje kontrakt "najpierw update, potem
publish" — nie potrzebujesz `Promise.all` ani ręcznego `try/catch`, żeby
zatrzymać się na błędzie.

## Hint 3

Nie łap wyjątku z `update` wewnątrz `solve` — brak `try/catch` oznacza, że
odrzucona obietnica automatycznie propaguje się do wywołującego, a
`publish` nigdy się nie wykona.
