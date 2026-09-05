# Dobierz najniższą wiarygodną warstwę testu

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `chooseTestLayer`. Czysta logika, synchroniczny Server Component i
Client Component mają używać `unit`; Route Handler, DAL z bazą i Server Action z
repozytorium - `integration`; async Server Component, streaming/hydration oraz
wielostronicowa ścieżka użytkownika - `e2e`.

Nie wybieraj E2E tylko dlatego, że kod znajduje się w aplikacji Next.
