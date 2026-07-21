import { describe, expect, it } from "vitest";
import { solve, type Tx } from "./starter";

function fixture(events: string[], overrides: Partial<Tx> = {}): Tx {
  return {
    update: async () => { events.push("update"); },
    audit: async () => { events.push("audit"); },
    commit: async () => { events.push("commit"); },
    rollback: async () => { events.push("rollback"); },
    ...overrides,
  };
}

describe("atomowa operacja redakcyjna", () => {
  it("błąd w audit pomija commit, wykonuje rollback i propaguje ten sam błąd", async () => {
    const events: string[] = [];
    const tx = fixture(events, { audit: async () => { throw new Error("audit"); } });
    await expect(solve(tx)).rejects.toThrow("audit");
    expect(events).toEqual(["update", "rollback"]);
  });

  it("sukces update i audit commituje dokładnie raz, bez rollbacku", async () => {
    const events: string[] = [];
    await solve(fixture(events));
    expect(events).toEqual(["update", "audit", "commit"]);
  });

  it("błąd już w update pomija audit i commit, ale nadal wykonuje rollback", async () => {
    const events: string[] = [];
    const tx = fixture(events, { update: async () => { throw new Error("update failed"); } });
    await expect(solve(tx)).rejects.toThrow("update failed");
    expect(events).toEqual(["rollback"]);
  });

  it("rollback nie jest wywoływany więcej niż raz po pojedynczym błędzie", async () => {
    let rollbackCalls = 0;
    const tx = fixture([], {
      audit: async () => { throw new Error("audit"); },
      rollback: async () => { rollbackCalls += 1; },
    });
    await expect(solve(tx)).rejects.toThrow("audit");
    expect(rollbackCalls).toBe(1);
  });
});
