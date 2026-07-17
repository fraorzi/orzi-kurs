import { AsyncLocalStorage } from "node:async_hooks";
export function solve(): {
  run<T>(id: string, fn: () => T): T;
  current(): string;
} {
  const storage = new AsyncLocalStorage<string>();
  return {
    run: (id, fn) => storage.run(id, fn),
    current: () => {
      const id = storage.getStore();
      if (!id) throw new Error("Brak kontekstu żądania");
      return id;
    },
  };
}
