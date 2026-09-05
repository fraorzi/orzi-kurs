# Moduł 01 - Store z eventami

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie **wieloplikowe**. Uzupełnij pliki w katalogu `src/`. Testy importują z
`src/index.js`, więc publiczne API musi zgadzać się co do nazw.

## `src/events.js` - `createEmitter()`

Fabryka emittera zdarzeń. Zwraca `{ on, off, emit }`:

- `on(event, handler)` - rejestruje słuchacza `event`. **Zwraca funkcję**, która go
  wypisuje (wygodny „unsubscribe").
- `off(event, handler)` - usuwa danego słuchacza.
- `emit(event, ...args)` - woła słuchaczy `event` z `...args`, w kolejności dodania.
  Zwraca `true`, gdy byli jacyś słuchacze, `false` w przeciwnym razie.

Rejestr trzymaj w domknięciu (`Map` z `event` na `Set` słuchaczy).

## `src/store.js` - `createStore(initialState = {})`

Obserwowalny store. Zaimportuj `createEmitter` z `./events.js`. Zwraca
`{ getState, get, set, update, subscribe }`:

- `getState()` - cały bieżący obiekt stanu.
- `get(key)` - wartość jednego pola.
- `set(key, value)` - zapis **niemutowalny**: nowy obiekt stanu (`{ ...state, [key]: value }`),
  potem emit `"change"`.
- `update(key, updater)` - jak `set`, ale nową wartość liczy `updater(bieżąca)`.
- `subscribe(handler)` - rejestruje `handler` na `"change"`; **zwraca** funkcję
  odsubskrybowującą.

Zdarzenie `"change"` niesie `(nextState, prevState, changedKey)`. Gdy wartość się nie
zmienia (`===`), **nie** emituj - brak realnej zmiany, brak powiadomienia.

## `src/index.js`

Publiczne API modułu - re-eksportuj `createEmitter` i `createStore`.

```js
import { createStore } from "./src/index.js";

const store = createStore({ count: 0 });
const off = store.subscribe((next, prev, key) => {
  console.log(key, prev[key], "→", next[key]); // "count 0 → 1"
});

store.update("count", (n) => n + 1);
store.set("count", 1);   // bez zmiany (=== 1) - cisza
off();                   // koniec subskrypcji
```
