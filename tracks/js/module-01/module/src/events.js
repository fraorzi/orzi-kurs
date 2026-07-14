export function createEmitter() {
  // TODO: prywatny Map: event -> Set słuchaczy (trzymany w domknięciu).
  // Zwróć obiekt { on, off, emit }:
  //  - on(event, handler): dodaj słuchacza; zwróć funkcję, która go wypisuje
  //  - off(event, handler): usuń danego słuchacza
  //  - emit(event, ...args): wywołaj słuchaczy z args w kolejności dodania;
  //    zwróć true, gdy byli słuchacze, false gdy nie
}
