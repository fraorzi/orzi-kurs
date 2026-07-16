// TODO: spłaszcz przecięcie do jednego obiektu (mapped type po keyof T).
export type Prettify<T> = T;

// TODO: klucze K stają się opcjonalne, reszta bez zmian; wynik płaski (Prettify).
export type Optional<T, K extends keyof T> = T;

// TODO: wszystko opcjonalne POZA kluczami K; wynik płaski.
export type RequiredOnly<T, K extends keyof T> = T;

export function applyDefaults<T extends object, K extends keyof T>(
  input: Optional<T, K>,
  defaults: Pick<T, K>,
): T {
  // TODO: brakujące pola (undefined) bierz z defaults; 0/""/false z input WYGRYWA
  throw new Error("TODO");
}
