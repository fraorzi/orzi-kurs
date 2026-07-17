import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { deepFreeze, type DeepReadonly } from "./starter";

type Config = {
  server: {
    port: number;
    hosts: string[];
  };
  format: (value: number) => string;
};

describe("DeepReadonly", () => {
  it("rekurencyjnie blokuje obiekty i tablice, ale zachowuje funkcję", () => {
    type Frozen = DeepReadonly<Config>;
    type Expected = {
      readonly server: {
        readonly port: number;
        readonly hosts: readonly string[];
      };
      readonly format: (value: number) => string;
    };
    type _frozen = Expect<Equal<Frozen, Expected>>;
    expect(true).toBe(true);
  });
});

describe("deepFreeze", () => {
  it("zamraża każdy poziom i zachowuje działanie funkcji", () => {
    const config = deepFreeze({
      server: { port: 3000, hosts: ["localhost"] },
      format: (value: number) => String(value),
    });
    expect(Object.isFrozen(config)).toBe(true);
    expect(Object.isFrozen(config.server)).toBe(true);
    expect(Object.isFrozen(config.server.hosts)).toBe(true);
    expect(config.format(7)).toBe("7");
  });

  it("uniemożliwia mutację w typach", () => {
    const config = deepFreeze({ nested: { count: 1 }, values: [1, 2] });
    const illegal = (): void => {
      // @ts-expect-error nested jest readonly
      config.nested.count = 2;
      // @ts-expect-error tablica jest readonly
      config.values.push(3);
    };
    expect(illegal).toBeTypeOf("function");
  });
});
