import { describe, expect, it } from "vitest";
import { loadWidget } from "./starter";

describe("server widget DTO", () => { it("minimalizuje i serializuje dane", async () => { const value = await loadWidget(async () => [{ id: "1", title: "D", status: "draft", secret: "x", createdAt: new Date("2026-01-01") }, { id: "2", title: "P", status: "published", secret: "y", createdAt: new Date("2026-02-01") }]); expect(value).toEqual([{ id: "2", title: "P", createdAt: "2026-02-01T00:00:00.000Z" }]); expect(() => JSON.stringify(value)).not.toThrow(); expect(JSON.stringify(value)).not.toContain("secret"); }); });

