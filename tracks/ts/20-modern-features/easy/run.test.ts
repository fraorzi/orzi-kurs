import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { traced } from "./starter";

describe("traced", () => {
  it("zachowuje this, argumenty, wynik i kolejność logów", () => {
    const log: string[] = [];

    class Calculator {
      constructor(private readonly factor: number) {}

      multiply(value: number): number {
        return value * this.factor;
      }
    }

    const calculator = new Calculator(3);
    const original = Calculator.prototype.multiply;
    const wrapped = traced((message) => log.push(message))<
      Calculator,
      [value: number],
      number
    >(original, {
        kind: "method",
        name: "multiply",
        static: false,
        private: false,
        access: {
          has: (object) => "multiply" in object,
          get: () => original,
        },
        addInitializer: () => undefined,
        metadata: {},
      });
    const result = wrapped.call(calculator, 4);
    type _result = Expect<Equal<typeof result, number>>;
    expect(result).toBe(12);
    expect(log).toEqual(["enter:multiply", "exit:multiply"]);
  });

  it("loguje wyjście także po wyjątku", () => {
    const log: string[] = [];

    class Service {
      fail(message: string): never {
        throw new Error(message);
      }
    }

    const original = Service.prototype.fail;
    const wrapped = traced((message) => log.push(message))<
      Service,
      [message: string],
      never
    >(original, {
        kind: "method",
        name: "fail",
        static: false,
        private: false,
        access: {
          has: (object) => "fail" in object,
          get: () => original,
        },
        addInitializer: () => undefined,
        metadata: {},
      });
    expect(() => wrapped.call(new Service(), "boom")).toThrow("boom");
    expect(log).toEqual(["enter:fail", "exit:fail"]);
  });
});
