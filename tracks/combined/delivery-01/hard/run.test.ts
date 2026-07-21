import { describe, expect, it } from "vitest";
import { validatePlan } from "./starter";

const VALID_PLAN = [
  "test",
  "build",
  "backup",
  "migrate-expand",
  "deploy",
  "healthcheck",
  "rollback-ready",
];

describe("delivery plan", () => {
  it("akceptuje kompletny plan we właściwej kolejności", () => {
    expect(validatePlan(VALID_PLAN)).toBe(true);
  });

  it("odrzuca plan, w którym deploy wyprzedza test i build", () => {
    const steps = [
      "deploy",
      "test",
      "build",
      "backup",
      "migrate-expand",
      "healthcheck",
      "rollback-ready",
    ];
    expect(validatePlan(steps)).toBe(false);
  });

  it("odrzuca plan z brakującym krokiem rollback-ready", () => {
    const steps = VALID_PLAN.filter((step) => step !== "rollback-ready");
    expect(validatePlan(steps)).toBe(false);
  });

  it("toleruje dodatkowe kroki pomiędzy wymaganymi", () => {
    const steps = [
      "test",
      "build",
      "notify-slack",
      "backup",
      "migrate-expand",
      "deploy",
      "healthcheck",
      "rollback-ready",
    ];
    expect(validatePlan(steps)).toBe(true);
  });

  it("odrzuca migrację uruchomioną przed backupem", () => {
    const steps = [
      "test",
      "build",
      "migrate-expand",
      "backup",
      "deploy",
      "healthcheck",
      "rollback-ready",
    ];
    expect(validatePlan(steps)).toBe(false);
  });

  it("odrzuca healthcheck uruchomiony przed deployem", () => {
    const steps = [
      "test",
      "build",
      "backup",
      "migrate-expand",
      "healthcheck",
      "deploy",
      "rollback-ready",
    ];
    expect(validatePlan(steps)).toBe(false);
  });
});
