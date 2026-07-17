import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { runScoped } from "./starter";

class TrackedResource implements Disposable {
  constructor(
    readonly name: string,
    private readonly log: string[],
  ) {
    log.push(`open:${name}`);
  }

  read(): string {
    return `value:${this.name}`;
  }

  [Symbol.dispose](): void {
    this.log.push(`close:${this.name}`);
  }
}

describe("runScoped", () => {
  it("zwraca wynik i zwalnia zasób po sukcesie", () => {
    const log: string[] = [];
    const result = runScoped(
      () => new TrackedResource("db", log),
      (resource) => resource.read(),
    );
    type _result = Expect<Equal<typeof result, string>>;
    expect(result).toBe("value:db");
    expect(log).toEqual(["open:db", "close:db"]);
  });

  it("zwalnia zasób po wyjątku", () => {
    const log: string[] = [];
    expect(() =>
      runScoped(
        () => new TrackedResource("lock", log),
        () => {
          throw new Error("failed");
        },
      ),
    ).toThrow("failed");
    expect(log).toEqual(["open:lock", "close:lock"]);
  });
});
