export function solve(limit: number): {
  request<T>(send: (message: { id: number }) => void): Promise<T>;
  resolve(id: number, value: unknown): void;
  fail(error: Error): void;
} {
  let nextId = 1;
  const pending = new Map<
    number,
    {
      resolve(value: unknown): void;
      reject(error: Error): void;
    }
  >();
  return {
    request(send) {
      if (pending.size >= limit)
        return Promise.reject(new Error("Pula przeciążona"));
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        send({ id });
      });
    },
    resolve(id, value) {
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      entry.resolve(value);
    },
    fail(error) {
      for (const entry of pending.values()) entry.reject(error);
      pending.clear();
    },
  };
}
