import { describe, expect, it } from "vitest";
import { transact, type Tx } from "./starter";

describe("transaction retry", () => {
  it("zatwierdza transakcję za pierwszym razem bez rollbacku", async () => {
    const events: string[] = [];
    const tx: Tx = {
      begin: async () => {
        events.push("begin");
      },
      work: async () => {
        events.push("work");
        return "ok";
      },
      commit: async () => {
        events.push("commit");
      },
      rollback: async () => {
        events.push("rollback");
      },
    };
    await expect(transact(tx)).resolves.toBe("ok");
    expect(events).toEqual(["begin", "work", "commit"]);
  });

  it("wycofuje i ponawia cały callback po deadlocku", async () => {
    const events: string[] = [];
    let attempts = 0;
    const tx: Tx = {
      begin: async () => {
        events.push("begin");
      },
      work: async () => {
        attempts += 1;
        events.push("work");
        if (attempts === 1) {
          throw Object.assign(new Error("deadlock"), {
            code: "ER_LOCK_DEADLOCK",
          });
        }
        return "ok";
      },
      commit: async () => {
        events.push("commit");
      },
      rollback: async () => {
        events.push("rollback");
      },
    };
    await expect(transact(tx)).resolves.toBe("ok");
    expect(events).toEqual([
      "begin",
      "work",
      "rollback",
      "begin",
      "work",
      "commit",
    ]);
  });

  it("nie ponawia błędu innego niż ER_LOCK_DEADLOCK", async () => {
    const events: string[] = [];
    const tx: Tx = {
      begin: async () => {
        events.push("begin");
      },
      work: async () => {
        events.push("work");
        throw Object.assign(new Error("duplicate"), {
          code: "ER_DUP_ENTRY",
        });
      },
      commit: async () => {
        events.push("commit");
      },
      rollback: async () => {
        events.push("rollback");
      },
    };
    await expect(transact(tx)).rejects.toThrow("duplicate");
    expect(events).toEqual(["begin", "work", "rollback"]);
  });

  it("przerywa po trzech nieudanych próbach mimo powtarzającego się deadlocka", async () => {
    const events: string[] = [];
    const tx: Tx = {
      begin: async () => {
        events.push("begin");
      },
      work: async () => {
        events.push("work");
        throw Object.assign(new Error("deadlock"), {
          code: "ER_LOCK_DEADLOCK",
        });
      },
      commit: async () => {
        events.push("commit");
      },
      rollback: async () => {
        events.push("rollback");
      },
    };
    await expect(transact(tx)).rejects.toThrow("deadlock");
    expect(events).toEqual([
      "begin",
      "work",
      "rollback",
      "begin",
      "work",
      "rollback",
      "begin",
      "work",
      "rollback",
    ]);
  });

  it("nie ponawia błędu bez kodu ER_LOCK_DEADLOCK", async () => {
    const events: string[] = [];
    const tx: Tx = {
      begin: async () => {
        events.push("begin");
      },
      work: async () => {
        events.push("work");
        throw new TypeError("boom");
      },
      commit: async () => {
        events.push("commit");
      },
      rollback: async () => {
        events.push("rollback");
      },
    };
    await expect(transact(tx)).rejects.toThrow("boom");
    expect(events).toEqual(["begin", "work", "rollback"]);
  });
});
