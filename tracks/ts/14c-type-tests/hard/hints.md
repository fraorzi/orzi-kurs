## Hint 1

Zachowaj cały obiekt przez `<Handlers extends HandlerMap>`.

## Hint 2

Metoda ma `K extends keyof Handlers`, input z `Parameters<Handlers[K]>[0]` i wynik
z `ReturnType<Handlers[K]>`.

## Hint 3

W implementacji pobierz handler i wykonaj jedno lokalne rzutowanie jego sygnatury.
Publiczne API nie może zawierać `any`.
