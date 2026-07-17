export function solve(maxQueuedBytes: number): {
  enqueue(data: string): void;
  flush(send: (data: string) => void): void;
  queuedBytes(): number;
  close(): void;
} {
  const queue: string[] = [];
  let bytes = 0;
  let closed = false;
  return {
    enqueue(data) {
      if (closed) throw new Error("Połączenie zamknięte");
      const size = Buffer.byteLength(data);
      if (bytes + size > maxQueuedBytes) throw new Error("Kolejka przeciążona");
      queue.push(data);
      bytes += size;
    },
    flush(send) {
      if (closed) return;
      while (queue.length) {
        const data = queue.shift()!;
        bytes -= Buffer.byteLength(data);
        send(data);
      }
    },
    queuedBytes: () => bytes,
    close() {
      closed = true;
      queue.length = 0;
      bytes = 0;
    },
  };
}
