import { createHistory } from "./history.js";

export function createStore(initialState = {}) {
  // TODO: obserwowalny store z historią. Użyj createHistory (zacznij od kopii
  // initialState) i zbioru słuchaczy (Set) w domknięciu.
  // Zwróć { getState, get, set, update, subscribe, undo, redo, canUndo, canRedo }:
  //  - getState() → history.present; get(key) → pole present
  //  - set(key, value): jeśli present[key] === value → nic; inaczej push NOWEGO
  //    obiektu ({ ...present, [key]: value }) do historii i powiadom słuchaczy
  //  - update(key, updater): jak set, ale wartość liczy updater(present[key])
  //  - subscribe(listener): dodaj do Set, zwróć funkcję odsubskrybowującą;
  //    słuchacz dostaje bieżący stan
  //  - undo()/redo(): przesuń historię (o ile można) i powiadom słuchaczy
  //  - canUndo/canRedo (gettery) → delegują do historii
}
