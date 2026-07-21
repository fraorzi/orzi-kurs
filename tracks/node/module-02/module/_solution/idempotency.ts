import type { IdempotencyStore, ResponseSnapshot } from "./types";

export function createIdempotencyStore(): IdempotencyStore {
  const snapshots = new Map<string, ResponseSnapshot>();
  return {
    get(key) {
      return snapshots.get(key);
    },
    remember(key, snapshot) {
      snapshots.set(key, {
        status: snapshot.status,
        body: structuredClone(snapshot.body),
      });
    },
  };
}
