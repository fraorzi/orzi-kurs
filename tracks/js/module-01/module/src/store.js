export function createStore(initialState = {}) {
  // TODO: prywatny `state` w domknięciu (zacznij od kopii initialState).
  // Zaimportuj createEmitter z "./events.js" i użyj go do powiadomień.
  // Zwróć { getState, get, set, update, subscribe }:
  //  - get(key) czyta pole; getState() zwraca cały obiekt stanu
  //  - set(key, value) i update(key, updater) tworzą NOWY obiekt stanu
  //    (niemutowalnie) i emitują zdarzenie "change"; pomiń emit, gdy wartość
  //    się nie zmienia (===)
  //  - subscribe(handler) rejestruje na "change"; zwraca funkcję odsubskrybowującą
  //  - "change" niesie argumenty (nextState, prevState, changedKey)
}
