import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import type { EventHandlers } from "./starter";

type AppEvent =
  | { type: "user.created"; userId: string }
  | { type: "invoice.paid"; invoiceId: number; amount: number }
  | { type: "sync.failed"; reason: Error };

type Expected = {
  "user.created": (
    event: { type: "user.created"; userId: string },
  ) => void;
  "invoice.paid": (
    event: { type: "invoice.paid"; invoiceId: number; amount: number },
  ) => void;
  "sync.failed": (event: { type: "sync.failed"; reason: Error }) => void;
};

type _handlers = Expect<Equal<EventHandlers<AppEvent>, Expected>>;
type _createdArgument = Expect<
  Equal<
    Parameters<EventHandlers<AppEvent>["user.created"]>[0],
    { type: "user.created"; userId: string }
  >
>;

describe("EventHandlers", () => {
  it("buduje dokładny kontrakt handlerów z unii", () => {
    expect(true).toBe(true);
  });
});
