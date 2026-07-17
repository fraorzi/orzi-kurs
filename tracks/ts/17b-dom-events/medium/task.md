# Medium — parser formularza logowania

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
