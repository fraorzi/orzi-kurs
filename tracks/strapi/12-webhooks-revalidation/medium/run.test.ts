import { describe, expect, it } from "vitest";
import { solve, type RetryOptions } from "./starter";

function noBackoff(): RetryOptions["backoff"] {
  return async () => undefined;
}

describe("Deduplikuj i ponawiaj dostarczenie webhooka", () => {
  it("przetwarza nowy event i oznacza go jako widziany dopiero po sukcesie", async () => {
    const seen = new Set<string>();
    let calls = 0;
    const result = await solve(
      "e1",
      seen,
      async () => {
        calls += 1;
      },
      { maxAttempts: 3, backoff: noBackoff() },
    );
    expect(result).toBe("processed");
    expect(calls).toBe(1);
    expect(seen.has("e1")).toBe(true);
  });

  it("odrzuca duplikat bez ponownego wywołania handlera", async () => {
    const seen = new Set<string>(["e1"]);
    let calls = 0;
    const result = await solve(
      "e1",
      seen,
      async () => {
        calls += 1;
      },
      { maxAttempts: 3, backoff: noBackoff() },
    );
    expect(result).toBe("duplicate");
    expect(calls).toBe(0);
  });

  it("ponawia z backoff po przejściowym błędzie i w końcu się udaje", async () => {
    const seen = new Set<string>();
    const backoffAttempts: number[] = [];
    let calls = 0;
    const result = await solve(
      "e2",
      seen,
      async () => {
        calls += 1;
        if (calls < 3) throw new Error("przejściowy błąd");
      },
      {
        maxAttempts: 5,
        backoff: async (attempt) => {
          backoffAttempts.push(attempt);
        },
      },
    );
    expect(result).toBe("processed");
    expect(calls).toBe(3);
    expect(backoffAttempts).toEqual([1, 2]);
    expect(seen.has("e2")).toBe(true);
  });

  it("wyczerpuje próby, rzuca oryginalny błąd i nie oznacza eventu jako przetworzonego", async () => {
    const seen = new Set<string>();
    const failure = new Error("downstream niedostępny");
    let calls = 0;

    await expect(
      solve(
        "e3",
        seen,
        async () => {
          calls += 1;
          throw failure;
        },
        { maxAttempts: 3, backoff: noBackoff() },
      ),
    ).rejects.toBe(failure);

    expect(calls).toBe(3);
    expect(seen.has("e3")).toBe(false);
  });

  it("nie woła backoff po ostatniej nieudanej próbie", async () => {
    const seen = new Set<string>();
    const backoffAttempts: number[] = [];

    await expect(
      solve(
        "e4",
        seen,
        async () => {
          throw new Error("zawsze zawodzi");
        },
        {
          maxAttempts: 2,
          backoff: async (attempt) => {
            backoffAttempts.push(attempt);
          },
        },
      ),
    ).rejects.toThrow("zawsze zawodzi");

    expect(backoffAttempts).toEqual([1]);
  });
});
