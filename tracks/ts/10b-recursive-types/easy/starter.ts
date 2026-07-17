// TODO: funkcje bez zmian, tablice rekurencyjnie readonly, obiekty mapped type.
export type DeepReadonly<T> = T;

export function deepFreeze<T>(value: T): DeepReadonly<T> {
  // TODO: zamroź każdy zagnieżdżony obiekt i tablicę
  return value;
}
