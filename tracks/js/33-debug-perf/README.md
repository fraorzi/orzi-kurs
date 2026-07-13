# Wydajność i pamięć

Zagadnienie debugowe: startery zawierają kod **poprawny, ale zły** — wolny albo
przeciekający pamięć. Zadanie: znaleźć przyczynę i naprawić, nie zmieniając kontraktu.
Testy poprawności przechodzą od początku; oblewają testy **wydajności** (benchmark
skalowania) i **wycieku**.

## Wyszukiwanie w pętli → indeks

Najczęstsza „ukryta kwadratowość": dla każdego elementu przeszukujesz całą drugą kolekcję.

```js
// O(n·m): dla każdego id skanujemy users
ids.map((id) => users.find((u) => u.id === id).name);
```

Naprawa: zbuduj **indeks raz** (`Map`), potem czytaj w O(1):

```js
const byId = new Map(users.map((u) => [u.id, u.name])); // O(n)
ids.map((id) => byId.get(id));                           // O(m)
```

To ten sam wzorzec, co „N+1 query" w bazach: zamiast pytać w pętli, pobierz raz i zindeksuj.

## Kosztowne operacje na początku tablicy

`shift()` i `unshift()` **przesuwają wszystkie** pozostałe elementy — są O(n). W pętli
dają O(n²):

```js
while (queue.length > 0) {
  process(queue.shift()); // każdy shift przesuwa całą resztę
}
```

Naprawa: iteruj wskaźnikiem (`for (let i = 0; ...)`) albo zdejmuj z końca (`pop`), gdy
kolejność nie ma znaczenia. `push`/`pop` są O(1).

## Wyciek pamięci przez zapomniane wypisanie

Słuchacz zdarzenia trzyma przy życiu swoje domknięcie (a więc wszystko, co ono domyka).
Jeśli rejestrujesz słuchaczy i nigdy ich nie wypisujesz, ich liczba rośnie w nieskończoność:

```js
function subscribe(emitter, events, handler) {
  for (const event of events) emitter.on(event, handler);
  return () => emitter.off(events[0], handler); // BUG: wypisuje tylko pierwsze zdarzenie
}
```

Objaw: rosnąca pamięć i **wielokrotne** wywołania handlera. Naprawa: `unsubscribe` musi
cofnąć **dokładnie to**, co zrobił `subscribe`.

## Jak to wykrywać

- **Skalowanie**: zmierz czas dla `n` i `10n`. Wzrost ~10× → O(n). Wzrost ~100× → O(n²).
  Dokładnie to robi `expectScaling` z `@harness/bench`.
- **Wycieki**: policz „żywe" obiekty/słuchaczy po cyklu utworzenia i sprzątnięcia —
  powinno wrócić do zera.
- Nie zgaduj mikro-optymalizacji. Szukaj **pętli w pętli** (jawnej albo ukrytej w
  `find`/`includes`/`indexOf`/`shift`).

## Pułapki

- Ukryta pętla: `find`, `includes`, `indexOf`, `filter` **wewnątrz** innej pętli.
- `shift`/`unshift`/`splice(0, …)` w pętli — O(n) każde.
- Cache bez limitu (rosnąca `Map`) — pamięć rośnie w nieskończoność; rozważ `WeakMap`
  (klucze obiektowe) albo limit rozmiaru.
- `unsubscribe`, który nie cofa wszystkiego, co zrobił `subscribe`.
- „Działa na 100 elementach" ≠ „działa na 100 000" — złożoność widać dopiero przy skali.
