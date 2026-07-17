import { describe, expect, it } from "vitest";
import { loadWorkspace } from "./src/workspace-data";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("loadWorkspace", () => {
  it("respektuje zależności bez tworzenia zbędnego waterfallu", async () => {
    const events: string[] = [];
    const user = deferred<{ id: string; name: string }>();
    const flags = deferred<{ compactNavigation: boolean }>();
    const orders = deferred<readonly { id: string; total: number }[]>();

    const resultPromise = loadWorkspace("acme", {
      getUser: (slug) => {
        events.push(`user:${slug}`);
        return user.promise;
      },
      getFeatureFlags: () => {
        events.push("flags");
        return flags.promise;
      },
      getOrders: (userId) => {
        events.push(`orders:${userId}`);
        return orders.promise;
      },
    });

    expect(events).toEqual(["user:acme", "flags"]);

    flags.resolve({ compactNavigation: true });
    await Promise.resolve();
    expect(events).toEqual(["user:acme", "flags"]);

    user.resolve({ id: "u-7", name: "Alicja" });
    await Promise.resolve();
    expect(events).toEqual(["user:acme", "flags", "orders:u-7"]);

    orders.resolve([{ id: "o-1", total: 250 }]);
    await expect(resultPromise).resolves.toEqual({
      user: { id: "u-7", name: "Alicja" },
      flags: { compactNavigation: true },
      orders: [{ id: "o-1", total: 250 }],
    });
  });
});
