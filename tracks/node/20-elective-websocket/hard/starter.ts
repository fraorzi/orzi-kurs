export function solve(maxQueuedBytes: number): {
  enqueue(data: string): void;
  flush(send: (data: string) => void): void;
  queuedBytes(): number;
  close(): void;
} {
  throw new Error("TODO");
}
