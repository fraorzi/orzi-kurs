// TODO: dla każdego pola T getter `get<Pole>` zwracający wartość tego pola.
export type Getters<T> = unknown;

export function makeGetters<T extends object>(source: T): Getters<T> {
  // TODO: { getName: () => source.name, ... }
  throw new Error("TODO");
}

// TODO: dla każdego pola T handler `on<Pole>Change` przyjmujący wartość tego pola.
export type ChangeHandlers<T> = unknown;

export function makeChangeHandlers<T extends object>(
  state: T,
  onChange: (next: T) => void,
): ChangeHandlers<T> {
  // TODO: każdy handler woła onChange z NOWYM stanem (bez mutacji state)
  throw new Error("TODO");
}

// TODO: T bez pól z prefiksem "_" (klucz zwrócony jako never znika z mapped type).
export type WithoutInternal<T> = unknown;

export function stripInternal<T extends object>(obj: T): WithoutInternal<T> {
  // TODO: kopia obiektu bez pól zaczynających się od "_"
  throw new Error("TODO");
}
