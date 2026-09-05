# Napisz test logowania jak użytkownik

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Edytujesz test w `starter.tsx`, nie komponent `fixture.tsx`.

Napisz test `LoginForm`, który:

- renderuje komponent przez `renderWithUser`,
- odnajduje e-mail po roli i nazwie dostępnej, a hasło po etykiecie,
- wpisuje `dev@example.com` oraz `sekret123`,
- klika przycisk `Zaloguj` przez rolę i nazwę,
- sprawdza dokładne dane przekazane do `onSubmit`.

Nie używaj `getByTestId`, `getByText`, `querySelector`, `fireEvent` ani bezpośredniego
`.click()` na elemencie DOM.
