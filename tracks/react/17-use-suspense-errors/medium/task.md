# Stabilna Promise pod granicą Suspense

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `UserPanel`.

Komponent otrzymuje stabilną `userPromise`. Podczas oczekiwania ma pokazywać status
`Ładowanie użytkownika…`. Po rozwiązaniu pokaż nagłówek z nazwą i tekst z rolą
użytkownika.

W potomnym komponencie odczytaj Promise przez `use(userPromise)`, a fragment
otocz `<Suspense>`.
