import { describe, expect, it } from "vitest"; import { guard } from "./starter";
describe("security gate", () => { it("rozdziela statusy i redaguje sekrety", () => { expect(guard({ requestId: "r1", role: "editor", attempts: 2, token: "secret", password: "p" })).toEqual({ allowed: true, status: 200, log: { requestId: "r1", role: "editor", outcome: "allow" } }); expect(guard({ requestId: "r2", role: "admin", attempts: 10, token: "x" }).status).toBe(429); }); });

