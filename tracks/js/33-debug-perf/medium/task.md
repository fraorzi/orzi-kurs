# Medium [D] - wyciek słuchaczy przez niepełne wypisanie

Tryb: naprawa. W `starter.js` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`subscribeAll(emitter, events, handler)` rejestruje `handler` dla **każdego** zdarzenia
z listy `events` i zwraca funkcję `unsubscribe`, która ma go wypisać ze **wszystkich**.

Obecna wersja wypisuje tylko z **pierwszego** zdarzenia - reszta słuchaczy zostaje
na zawsze. Przy powtarzanych cyklach subscribe/unsubscribe ich liczba rośnie: to wyciek
pamięci (słuchacz trzyma przy życiu swoje domknięcie) i źródło wielokrotnych wywołań.

Napraw `unsubscribe` tak, by cofał dokładnie to, co zrobił `subscribe`.

```js
const unsubscribe = subscribeAll(emitter, ["open", "close"], handler);
// handler zarejestrowany na "open" i "close"
unsubscribe();
emitter.listenerCount("open");  // 0
emitter.listenerCount("close"); // 0  ← teraz zostaje 1
```

`emitter` ma API `on(event, handler)`, `off(event, handler)`, `listenerCount(event)`.
