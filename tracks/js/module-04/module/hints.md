## Hint 1

Model undo/redo to trzy stosy: co **było** (`past`), co jest (`present`) i co
**cofnięto** (`future`). Wszystkie w domknięciu `createHistory`:

```js
const past = [];
let present = initial;
const future = [];
```

`canUndo`/`canRedo` to po prostu `past.length > 0` / `future.length > 0` (gettery).

## Hint 2

`push` to „nowy ruch" — dlatego kasuje `future` (nie da się już ponowić starej gałęzi):

```js
push(next) {
  past.push(present);
  present = next;
  future.length = 0;   // wyczyszczenie stosu redo
}
```

`undo`/`redo` przekładają jeden element między stosami — pamiętaj o strażniku pustego
stosu (`if (past.length === 0) return present;`).

## Hint 3

Store nie mutuje stanu — każda zmiana to `push` **nowego** obiektu do historii. Wspólny
krok wydziel do `commit`, a strażnik „bez zmiany — bez zapisu" trzymaj przy `===`:

```js
function commit(next) {
  history.push(next);
  notify();
}
// set:
if (history.present[key] === value) return;
commit({ ...history.present, [key]: value });
```

To dlatego undo jest tanie: skoro `set` nigdy nie nadpisał starego obiektu, `undo`
tylko wskazuje z powrotem na niego.

## Hint 4

Pub/sub to `Set` słuchaczy; `notify` woła je bieżącym stanem (iteruj po kopii, gdyby
słuchacz się wypisał w trakcie):

```js
function notify() {
  const state = history.present;
  for (const listener of [...listeners]) listener(state);
}
```

`undo()`/`redo()` w store to `history.undo()`/`history.redo()` + `notify()`, ale tylko
gdy `canUndo`/`canRedo` (inaczej nie ma o czym powiadamiać). `canUndo`/`canRedo` w store
to gettery delegujące do historii.
