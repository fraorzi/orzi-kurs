## Hint 1

`myMap`/`myFilter`: pętla `for` po indeksach, buduj wynikową tablicę przez `push`.
Pamiętaj o przekazaniu do callbacka trzech argumentów: `fn(arr[i], i, arr)`.

## Hint 2

`myReduce`: rozróżnienie „brak initialValue" od „undefined": zbierz go przez rest —
`function myReduce(arr, fn, ...rest)` — i sprawdź `rest.length === 0`. Bez initialValue:
`acc = arr[0]`, pętla od `i = 1`. Pusta tablica bez initialValue:
`throw new TypeError("Reduce of empty array with no initial value")`.

## Hint 3

`uniqueFast`: jeden przebieg z `Set` — `seen.has(x)` i `seen.add(x)` są O(1),
`arr.includes(x)` jest O(n) i w pętli daje O(n²).
