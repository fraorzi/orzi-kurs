# Profil użytkownika z pełnym stanem żądania

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `UserProfile`.

Po renderze wywołaj `loadUser(userId)`. Komponent ma pokazywać:

- `Ładowanie profilu…` przed zakończeniem bieżącego żądania,
- nazwę użytkownika po sukcesie,
- alert `Nie udało się pobrać profilu.` po błędzie.

Zmiana `userId` ma ponownie pokazać pending zamiast prezentować poprzednie dane pod
nowym ID. Nie obsługuj requestu w handlerze zdarzenia - zależy od renderowanego profilu.
