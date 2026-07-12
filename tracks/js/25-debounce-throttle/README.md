# Debounce i throttle

Dwa dekoratory ograniczające, **jak często** wywołuje się funkcję — kluczowe przy
zdarzeniach o wysokiej częstotliwości (input, scroll, resize, mousemove). Oba trzymają
stan w domknięciu i opakowują oryginalną funkcję.

## Debounce — „poczekaj na ciszę"

Debounce odracza wywołanie do momentu, gdy przez `delay` **nic się nie dzieje**. Każde
nowe wywołanie resetuje licznik. Efekt: seria szybkich wywołań → **jedno** wywołanie na
końcu.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);                       // anuluj poprzednie odroczenie
    timer = setTimeout(() => fn.apply(this, args), delay); // zaplanuj nowe
  };
}
```

Typowe użycie: **autouzupełnianie/wyszukiwarka** — czekaj, aż użytkownik przestanie pisać,
dopiero wtedy strzel zapytanie.

## Throttle — „nie częściej niż co X"

Throttle przepuszcza wywołanie **co najwyżej raz na `interval`**. Wersja z „leading edge"
odpala pierwsze wywołanie od razu, a kolejne w oknie ignoruje:

```js
function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

Typowe użycie: **scroll/resize/mousemove** — reaguj regularnie, ale nie na każdy z setek
eventów na sekundę.

## Różnica w jednym zdaniu

- **Debounce**: „wykonaj, gdy przestanie się dziać" (grupuje serię w jedno na końcu).
- **Throttle**: „wykonaj regularnie w trakcie" (przepuszcza równomiernie co interwał).

## Warianty (produkcyjne, np. lodash)

- **leading/trailing** — czy odpalać na początku okna, na końcu, czy oba.
- **cancel()** — anuluj zaplanowane, oczekujące wywołanie (np. przy odmontowaniu komponentu).
- **flush()** — wykonaj natychmiast to, co czeka.

## `this` i argumenty

Zachowuj przezroczystość: przekazuj oryginalny kontekst i argumenty przez
`fn.apply(this, args)`. Dlatego zwracaj **zwykłą** funkcję (nie strzałkę — strzałka nie
ma własnego `this`).

## Kiedy używać

- **Debounce**: pole wyszukiwania, walidacja formularza w locie, autosave, resize→relayout.
- **Throttle**: obsługa scrolla (parallax, „wczytaj więcej"), śledzenie kursora, rate-limit
  akcji użytkownika.

## Kiedy unikać

- Gdy każde zdarzenie jest istotne (np. klik „kup") — nie gub wywołań.
- Zamiast throttle na scrollu do wykrywania widoczności — lepszy `IntersectionObserver`.
- Zamiast throttle na animacji — `requestAnimationFrame` (synchronizacja z klatką).

## Pułapki

- **Strzałka zamiast zwykłej funkcji** → tracisz `this` wywołania.
- Zapomniany `clearTimeout` w debounce → odpala się wiele razy zamiast raz.
- Debounce może **nigdy** nie odpalić, jeśli zdarzenia płyną szybciej niż `delay` bez
  przerwy — czasem chcesz throttle (gwarancja regularności).
- Wspólny licznik dla wielu instancji — każde wywołanie `debounce(fn, d)` musi mieć własny
  `timer` w domknięciu (nie współdzielony moduł-owo).
- `cancel` musi realnie czyścić timer, inaczej „anulowane" wywołanie i tak strzeli.
