# Medium - komendy z różnymi argumentami

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Z mapy `CommandArguments` wyprowadź unię `AnyCommand`:

```ts
type CommandArguments = {
  createUser: [name: string, admin: boolean];
  deleteUser: [id: number];
  ping: [];
};
```

`makeCommand(name, ...args)` ma wymuszać właściwą listę argumentów i zwracać konkretny
wariant `{ name, args }`. `executeCommand` przyjmuje całą unię i zwraca opis operacji.

Nie twórz ręcznie trzech osobnych wariantów.
