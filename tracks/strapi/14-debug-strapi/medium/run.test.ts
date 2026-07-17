import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Napraw podwójne powiadomienie lifecycle", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve([{ documentId: "doc", operationId: "publish-1" }, { documentId: "doc", operationId: "publish-1" }, { documentId: "doc", operationId: "publish-2" }])).toEqual(["doc", "doc"]);
  });
});

