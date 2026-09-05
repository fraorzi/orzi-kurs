# Moduł 04 - Mini state manager z undo/redo

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie **wieloplikowe**. Uzupełnij pliki w katalogu `src/`. Testy importują z
`src/index.js`, więc publiczne API musi zgadzać się co do nazw.

Budujesz obserwowalny store, który dodatkowo pamięta historię stanów - dzięki
niemutowalnym aktualizacjom cofanie i ponawianie to tylko wskazywanie na starszy
obiekt, bez żadnego „odwracania" zmian.

## `src/history.js` - historia dla undo/redo

- `createHistory(initial)` → `{ present, canUndo, canRedo, push, undo, redo }`.
  W domknięciu trzymaj trzy rzeczy: `past` (stos poprzednich), `present`, `future`
  (stos cofniętych).
  - `present` (getter) - bieżący element; `canUndo`/`canRedo` (gettery) - czy
    `past`/`future` mają elementy.
  - `push(next)` - odłóż `present` na `past`, ustaw `present = next`, **wyczyść**
    `future` (nowa zmiana kasuje redo).
  - `undo()` - gdy `past` pusty, zwróć `present` bez zmian; inaczej przenieś `present`
    na `future`, zdejmij ostatni z `past` jako `present`, zwróć nowy `present`.
  - `redo()` - symetrycznie (`future` ↔ `past`).

## `src/store.js` - obserwowalny store

- `createStore(initialState = {})` → `{ getState, get, set, update, subscribe, undo, redo, canUndo, canRedo }`.
  Użyj `createHistory` (start od kopii `initialState`) i `Set` słuchaczy.
  - `getState()` → `history.present`; `get(key)` → pole bieżącego stanu.
  - `set(key, value)` - gdy `present[key] === value` nic nie rób; inaczej `push`
    **nowego** obiektu `{ ...present, [key]: value }` i powiadom słuchaczy.
  - `update(key, updater)` - jak `set`, ale wartość liczy `updater(present[key])`.
  - `subscribe(listener)` - dodaj do `Set`, zwróć funkcję odsubskrybowującą;
    słuchacz dostaje bieżący stan.
  - `undo()` / `redo()` - przesuń historię (o ile można) i powiadom słuchaczy.
  - `canUndo` / `canRedo` (gettery) - delegują do historii.

## `src/index.js`

Re-eksportuj `createHistory` i `createStore`.

```js
import { createStore } from "./src/index.js";

const store = createStore({ count: 0 });
store.subscribe((s) => console.log("count:", s.count));

store.update("count", (n) => n + 1); // "count: 1"
store.update("count", (n) => n + 1); // "count: 2"
store.undo();                        // "count: 1"
store.redo();                        // "count: 2"
store.canUndo;                       // true
```
