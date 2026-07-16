// TODO: rekurencyjnie readonly na każdym poziomie.
export type DeepReadonly<T> = T;

// TODO: rekurencyjnie opcjonalne na każdym poziomie.
export type DeepPartial<T> = T;

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  // TODO: Object.freeze rekurencyjnie (obiekty i tablice)
  throw new Error("TODO");
}

export function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  // TODO: scal rekurencyjnie, bez mutacji; tablica nadpisuje w całości
  throw new Error("TODO");
}
