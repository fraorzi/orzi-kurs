# Easy — przepisz then na async/await

W `starter.js` są dwie **działające** funkcje napisane na łańcuchach `.then()`.
Przepisz je na `async/await`, zachowując dokładnie to samo zachowanie.

## 1. `loadUserProfile(fetchUser, fetchPosts)`

Pobiera użytkownika, potem jego posty (potrzebuje `user.id`), zwraca `{ user, posts }`.

## 2. `loadWithFallback(fetchData, fetchBackup)`

Próbuje `fetchData()`; jeśli odrzuci — zwraca wynik `fetchBackup()`.
Po przepisaniu `catch` z łańcucha ma zostać zastąpiony przez `try/catch`.

## Warunek zaliczenia

W kodzie nie może zostać **żadne** `.then(` ani `.catch(` — testy sprawdzają
też źródło pliku, nie tylko zachowanie.
