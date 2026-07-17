# Warianty debounce i throttle (leading/trailing, cancel/flush)

Podstawowe `debounce`/`throttle` (zagadnienie 25) mają w praktyce kilka opcji, bez których
nie da się ich dobrze użyć w UI. To warianty z biblioteki `lodash` — de facto standard.

## Krawędzie: leading vs trailing

Wyobraź sobie „serię" szybkich wywołań (użytkownik pisze w polu):

- **trailing** (domyślne dla debounce) — funkcja odpala **po** serii, gdy ucichnie na `wait`
  ms. Ostatnie wywołanie wygrywa (bierzesz jego argumenty).
- **leading** — funkcja odpala **od razu** na pierwszym wywołaniu serii (reszta jest tłumiona).

```js
debounce(fn, 300);                              // { trailing: true }  → po serii
debounce(fn, 300, { leading: true, trailing: false }); // → natychmiast, potem cisza
debounce(fn, 300, { leading: true, trailing: true });  // → i od razu, i po serii (jeśli >1 wywołanie)
```

Ważny szczegół (lodash): przy `leading` i `trailing` naraz **pojedyncze** wywołanie odpala
tylko raz (leading). Trailing dokłada się dopiero, gdy w serii było więcej niż jedno wywołanie.

## `cancel` i `flush`

Debounce/throttle trzymają „oczekujące" wywołanie. Dwie metody nim sterują:

- **`cancel()`** — porzuca oczekujące wywołanie (nic się nie odpali). Niezbędne w cleanupie
  (odmontowanie komponentu, `AbortController`), żeby nie strzelić do martwego widoku.
- **`flush()`** — odpala oczekujące wywołanie **natychmiast** (nie czekając na `wait`) i zwraca
  jego wynik. Przydatne np. przy „submit teraz" albo utracie fokusu.

```js
const d = debounce(save, 500);
d(payload);
d.cancel(); // nic się nie zapisze
// albo:
d.flush();  // zapisz teraz, nie czekaj 500 ms
```

## Throttle na rAF (przeglądarka)

Do aktualizacji **wizualnych** (scroll, mousemove, resize) zamiast okna czasowego użyj
`requestAnimationFrame` — „najwyżej raz na klatkę, z ostatnimi argumentami":

```js
function rafThrottle(fn) {
  let rafId = null;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    if (rafId !== null) return; // klatka już zaplanowana
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fn(...lastArgs);
    });
  };
}
```

Ekran i tak nie odmaluje się częściej niż odświeżanie (zwykle 60 Hz), więc częstsze
wywołania to zmarnowana praca. Bez zadania w tym module — `requestAnimationFrame` nie
istnieje w node; wariant do przećwiczenia w tracku react.

## throttle vs debounce (przypomnienie)

- **debounce** — czeka na ciszę; odpala **raz** po serii.
- **throttle** — odpala **regularnie, nie częściej niż raz na `wait`** w trakcie serii.
  Też ma krawędzie: `leading` (od razu) i `trailing` (na koniec okna, z ostatnimi argumentami).

## Kiedy używać którego wariantu

- Podpowiedzi wyszukiwania: `debounce` trailing (czekaj, aż przestanie pisać).
- Reakcja „na start" (np. natychmiastowy feedback): `debounce` leading.
- Scroll / resize / mousemove: `throttle` (regularne aktualizacje, ale nie na każdą klatkę).
- Cleanup / odmontowanie: zawsze `cancel()` oczekującego wywołania.

## Kiedy unikać

- Nie debounce'uj akcji, która musi zostać zapisana przy każdym zdarzeniu bez utraty danych.
- Nie używaj throttle do wyszukiwarki, jeśli liczy się dopiero ostateczna fraza po ciszy.
- Nie ukrywaj ważnego feedbacku użytkownika za długim opóźnieniem bez stanu pending.

## Pułapki

- `leading:false, trailing:false` to funkcja, która **nigdy** nie odpala — nie rób tego.
- Zapominając o `cancel()` w cleanupie, strzelasz do odmontowanego widoku (klasyczny bug).
- `flush()` na braku oczekującego wywołania nie może odpalić „starych" argumentów — po
  odpaleniu / `cancel()` stan trzeba wyzerować.
- Przy `leading + trailing` uważaj, by pojedyncze wywołanie nie odpaliło **dwa** razy.
