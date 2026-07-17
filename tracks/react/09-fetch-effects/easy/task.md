# Profil użytkownika z pełnym stanem żądania

Zaimplementuj `UserProfile`.

Po renderze wywołaj `loadUser(userId)`. Komponent ma pokazywać:

- `Ładowanie profilu…` przed zakończeniem bieżącego żądania,
- nazwę użytkownika po sukcesie,
- alert `Nie udało się pobrać profilu.` po błędzie.

Zmiana `userId` ma ponownie pokazać pending zamiast prezentować poprzednie dane pod
nowym ID. Nie obsługuj requestu w handlerze zdarzenia — zależy od renderowanego profilu.
