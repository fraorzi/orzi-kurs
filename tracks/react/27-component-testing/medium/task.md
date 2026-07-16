# Przetestuj pending, sukces i błąd wyszukiwania

Edytujesz test w `starter.tsx`. `UserSearch` przyjmuje asynchroniczne
`searchUsers(query)`.

Napisz deterministyczne testy, które:

- sterują nierozwiązanym Promise i sprawdzają status `Wyszukiwanie…`,
- po rozwiązaniu odnajdują listę `Wyniki` przez `findByRole` i wynik `Anna`,
- potwierdzają zniknięcie statusu przez `queryByRole`,
- w osobnym przypadku odrzucają Promise i odnajdują alert
  `Nie udało się wyszukać`.

Używaj `renderWithUser`; nie dodawaj timeoutów ani `setTimeout`.
