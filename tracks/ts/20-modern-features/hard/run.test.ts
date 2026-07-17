import { describe, expect, it } from "vitest";
import { createDisposableStack } from "./starter";

function resource(name: string, log: string[]): Disposable {
  return {
    [Symbol.dispose]() {
      log.push(name);
    },
  };
}

describe("createDisposableStack", () => {
  it("obsługuje use, adopt i defer w kolejności LIFO", () => {
    const log: string[] = [];
    {
      using stack = createDisposableStack();
      stack.use(resource("use:first", log));
      stack.adopt("value", (value) => log.push(`adopt:${value}`));
      stack.defer(() => log.push("defer:last"));
    }
    expect(log).toEqual(["defer:last", "adopt:value", "use:first"]);
  });

  it("move przenosi odpowiedzialność i unieważnia źródło", () => {
    const log: string[] = [];
    const source = createDisposableStack();
    source.defer(() => log.push("moved"));
    const moved = source.move();

    expect(source.disposed).toBe(true);
    expect(moved.disposed).toBe(false);
    expect(() => source.defer(() => undefined)).toThrow(ReferenceError);
    moved.dispose();
    expect(log).toEqual(["moved"]);
  });

  it("dispose jest idempotentne i kontynuuje po błędzie cleanupu", () => {
    const log: string[] = [];
    const stack = createDisposableStack();
    stack.defer(() => log.push("first"));
    stack.defer(() => {
      log.push("throws");
      throw new Error("cleanup");
    });
    stack.defer(() => log.push("last"));

    expect(() => stack.dispose()).toThrow("cleanup");
    expect(log).toEqual(["last", "throws", "first"]);
    expect(() => stack.dispose()).not.toThrow();
  });
});
