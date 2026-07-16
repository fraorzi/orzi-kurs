import "@harness/react-test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import "./starter";

describe("kontrakt testu UserSearch", () => {
  it("modeluje kontrolowany async UI bez arbitralnych timeoutów", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/27-component-testing/medium/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("findByRole");
    expect(source).toContain("queryByRole");
    expect(source).toContain("getByRole");
    expect(source).toMatch(/reject/i);
    expect(source).not.toMatch(/setTimeout|sleep|getByTestId|querySelector/);
  });
});
