# Medium [O] - deduplikacja: findIndex → Set widzianych

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`uniqueByEmail(users)` zwraca tablicę użytkowników z **unikalnymi** e-mailami - dla
powtórzonego e-maila zostaje **pierwsze** wystąpienie, w oryginalnej kolejności.

Kod jest **poprawny**, ale kwadratowy: dla każdego elementu woła `findIndex` skanujący
całą tablicę (`users.findIndex(...) === i`) → O(n²). Testy poprawności przechodzą - obleje
benchmark. Przepisz na czas liniowy, zachowując kontrakt.

```js
uniqueByEmail([
  { email: "a@x.pl", name: "Ala" },
  { email: "b@x.pl", name: "Bob" },
  { email: "a@x.pl", name: "Ala2" },
]);
// [{ email: "a@x.pl", name: "Ala" }, { email: "b@x.pl", name: "Bob" }]
// (zostaje PIERWsze "a@x.pl", drugie odpada)
```

Podpowiedź kierunkowa: co pozwala w O(1) sprawdzić „czy ten e-mail już był"?
