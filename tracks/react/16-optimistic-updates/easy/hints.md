## Hint 1

Trzymaj potwierdzoną wartość w `useState`, a jej projekcję w `useOptimistic`.

## Hint 2

Wywołaj optimistic setter przed `await saveLike(...)`.

## Hint 3

W razie błędu nie zmieniaj bazowego `liked`. Po zakończeniu Action optimistic
wartość sama do niego wróci.
