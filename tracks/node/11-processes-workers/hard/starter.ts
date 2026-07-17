export function solve(limit: number): {
  request<T>(send: (message: { id: number }) => void): Promise<T>;
  resolve(id: number, value: unknown): void;
  fail(error: Error): void;
} {
  throw new Error("TODO");
}
