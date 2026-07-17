import { describe, expect, it } from "vitest"; import { validatePlan } from "./starter";
describe("delivery plan", () => { it("wymusza bezpieczną kolejność", () => { expect(validatePlan(["test", "build", "backup", "migrate-expand", "deploy", "healthcheck", "rollback-ready"])).toBe(true); expect(validatePlan(["deploy", "test", "build", "backup", "migrate-expand", "healthcheck", "rollback-ready"])).toBe(false); }); });

