# Event loop: mikrotaski i makrotaski

JS wykonuje kod w jednym wątku. Silnik kręci pętlą: weź zadanie → wykonaj **do końca**
(run-to-completion) → weź następne. Zadania czekają w dwóch kolejkach o różnym priorytecie.

## Dwie kolejki

**Makrotaski** (task queue): `setTimeout`/`setInterval`, I/O, zdarzenia UI.
**Mikrotaski** (microtask queue): callbacki promisów (`then/catch/finally`),
`queueMicrotask`, `await` (kontynuacja po await to mikrotask).

Reguła, którą musisz znać na pamięć:

> Po zakończeniu bieżącego kodu silnik opróżnia **całą** kolejkę mikrotasków,
> zanim weźmie **jeden** następny makrotask.

```js
console.log("1");                          // sync
setTimeout(() => console.log("4"));        // makrotask
Promise.resolve().then(() => console.log("3")); // mikrotask
console.log("2");                          // sync

// kolejność: 1, 2, 3, 4
```

Sync zawsze pierwszy (run-to-completion), potem WSZYSTKIE mikrotaski, potem makrotask.

## Zagłodzenie (starvation)

Mikrotask, który kolejkuje kolejny mikrotask, w nieskończoność zablokuje makrotaski
(timery, rendering). Kolejka mikrotasków musi się opróżnić **do zera**, zanim cokolwiek
innego dostanie czas.

## Dzielenie ciężkiej pracy

Długa synchroniczna pętla blokuje wszystko — UI, timery, obsługę zdarzeń.
Rozwiązanie: przetwarzaj porcjami, a między porcjami **oddaj kontrolę** przez makrotask:

```js
function processChunk() {
  // ...przetwórz porcję...
  if (zostały) {
    setTimeout(processChunk, 0); // makrotask → inne zadania mają szansę wejść
  }
}
```

Uwaga: oddanie kontroli przez mikrotask (`queueMicrotask`, samo `await Promise.resolve()`)
NIE wystarczy — mikrotaski wykonują się przed makrotaskami, więc timery dalej czekają.

## await a kolejność

```js
async function f() {
  console.log("a");     // sync — do pierwszego await
  await null;           // reszta funkcji = mikrotask
  console.log("c");
}
f();
console.log("b");
// a, b, c
```

## Serializacja wywołań

Klasyczny wzorzec: kolejka na promisach — każde kolejne wywołanie „doczepia się"
do poprzedniego przez `then`, więc operacje wykonują się jedna po drugiej,
niezależnie od tego, jak gęsto ktoś je odpala:

```js
let queue = Promise.resolve();
function enqueue(job) {
  const result = queue.then(job, job);
  queue = result.catch(() => {}); // błąd nie zrywa kolejki
  return result;
}
```
