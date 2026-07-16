# Stabilna Promise pod granicą Suspense

Zaimplementuj `UserPanel`.

Komponent otrzymuje stabilną `userPromise`. Podczas oczekiwania ma pokazywać status
`Ładowanie użytkownika…`. Po rozwiązaniu pokaż nagłówek z nazwą i tekst z rolą
użytkownika.

W potomnym komponencie odczytaj Promise przez `use(userPromise)`, a fragment
otocz `<Suspense>`.
