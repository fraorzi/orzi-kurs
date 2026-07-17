## Hint 1

`renderWithUser(<LoginForm ... />)` zwraca instancję `user`, której metody trzeba
awaitować.

## Hint 2

E-mail ma rolę `textbox`. `input type="password"` nie ma domyślnej roli, dlatego
odnajdź go przez `getByLabelText("Hasło")`. Przycisk ma rolę `button`.

## Hint 3

`expect(onSubmit).toHaveBeenCalledWith({ email: ..., password: ... })` sprawdza
kontrakt formularza bez zaglądania do jego stanu.
