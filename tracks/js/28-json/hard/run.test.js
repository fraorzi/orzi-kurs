import { describe, it, expect } from "vitest";
import { safeStringify } from "./starter.js";

describe("safeStringify", () => {
  it("serializuje zwykłe dane jak JSON.stringify", () => {
    expect(safeStringify({ a: 1, b: [2, 3] })).toBe('{"a":1,"b":[2,3]}');
  });

  it("nie rzuca na cyklu i zastępuje go [Circular]", () => {
    const obj = { name: "x" };
    obj.self = obj;
    let result;
    expect(() => {
      result = safeStringify(obj);
    }, "cykl ma być wykryty replacerem (WeakSet), nie doprowadzić do TypeError").not.toThrow();
    expect(JSON.parse(result).self).toBe("[Circular]");
    expect(JSON.parse(result).name).toBe("x");
  });

  it("obsługuje cykl zagnieżdżony", () => {
    const root = { child: {} };
    root.child.parent = root; // cykl przez zagnieżdżenie
    const result = safeStringify(root);
    expect(JSON.parse(result).child.parent).toBe("[Circular]");
  });
});
