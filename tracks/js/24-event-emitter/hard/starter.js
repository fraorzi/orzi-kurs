export class EventEmitter {
  // TODO: przechowuj słuchaczy (np. Map event -> [{ fn, once }])

  on(event, handler) {
    // TODO: dodaj słuchacza, zwróć this
  }

  once(event, handler) {
    // TODO: dodaj słuchacza jednorazowego, zwróć this
  }

  off(event, handler) {
    // TODO: usuń po referencji, zwróć this
  }

  emit(event, ...args) {
    // TODO: wywołaj słuchaczy (kopia listy!), wypisz once; zwróć czy byli słuchacze
  }

  listenerCount(event) {
    // TODO
  }

  removeAllListeners(event) {
    // TODO: usuń dla event albo wszystkich (gdy event === undefined); zwróć this
  }
}
