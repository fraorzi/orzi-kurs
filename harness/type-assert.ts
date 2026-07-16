/**
 * Type-level assertion helpers (type-challenges style) for the `ts` track.
 *
 * Import them from task tests with the `@harness/type-assert` alias:
 *
 *   import type { Equal, Expect } from "@harness/type-assert";
 *   type _c1 = Expect<Equal<TagCounts, Record<string, number>>>;
 *
 * A failing assertion is a *type* error (TS2344), caught by the tsc gate in the
 * submit pipeline — it never runs at runtime, so `import type` is mandatory.
 */

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export type Expect<T extends true> = T;

export type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true;

export type ExpectFalse<T extends false> = T;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type NotAny<T> = IsAny<T> extends true ? false : true;
