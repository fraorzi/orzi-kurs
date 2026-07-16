# Easy — pozytywny i negatywny test kontraktu

Nie zmieniaj `api.ts`. Napraw wyłącznie `src/type-tests.ts`.

Plik ma:

- potwierdzić, że `createUser` zwraca `User`,
- potwierdzić, że parametr to `NewUser`,
- zawierać celowy błędny przypadek roli `"owner"` z `@ts-expect-error`.

Testy typów nie są uruchamiane runtime, ale muszą przejść `tsc --noEmit`.
