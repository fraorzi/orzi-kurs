# Medium - parser formularza logowania

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `parseLoginForm(form)`.

Model:

```ts
type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};
```

- email i password odczytaj przez `FormData`,
- oba przytnij,
- email musi zawierać `@`,
- hasło musi mieć co najmniej 8 znaków po trim,
- checkbox `remember` jest true, gdy pole występuje,
- zwróć wszystkie błędy w kolejności `email`, `password`.
