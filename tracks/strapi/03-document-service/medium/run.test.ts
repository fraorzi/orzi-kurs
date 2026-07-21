import { describe, expect, it } from "vitest";
import { solve, type Documents } from "./starter";

function fixture(calls: string[], payloads: object[]): Documents {
  return {
    update: async (input: object) => {
      calls.push("update");
      payloads.push(input);
    },
    publish: async (input: object) => {
      calls.push("publish");
      payloads.push(input);
    },
  };
}

describe("update i publish dokumentu", () => {
  it("woła update przed publish", async () => {
    const calls: string[] = [];
    await solve(fixture(calls, []), "doc", "pl", { title: "T" });
    expect(calls).toEqual(["update", "publish"]);
  });

  it("przekazuje do update pełny payload z documentId, locale i data", async () => {
    const payloads: object[] = [];
    await solve(fixture([], payloads), "doc", "pl", { title: "T" });
    expect(payloads[0]).toEqual({ documentId: "doc", locale: "pl", data: { title: "T" } });
  });

  it("przekazuje do publish tylko documentId i locale, bez data", async () => {
    const payloads: object[] = [];
    await solve(fixture([], payloads), "doc", "pl", { title: "T" });
    expect(payloads[1]).toEqual({ documentId: "doc", locale: "pl" });
  });

  it("nie woła publish, gdy update odrzuca obietnicę", async () => {
    const calls: string[] = [];
    const service: Documents = {
      update: async () => {
        calls.push("update");
        throw new Error("zapis nieudany");
      },
      publish: async () => {
        calls.push("publish");
      },
    };
    await expect(solve(service, "doc", "pl", { title: "T" })).rejects.toThrow(
      "zapis nieudany",
    );
    expect(calls).toEqual(["update"]);
  });
});
