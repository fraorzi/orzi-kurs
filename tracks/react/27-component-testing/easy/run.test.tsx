import "@harness/react-test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import "./starter";

describe("kontrakt testu LoginForm", () => {
  it("używa semantycznych zapytań i pełnych interakcji", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/27-component-testing/easy/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("renderWithUser");
    expect(source).toContain("getByRole");
    expect(source).toContain("getByLabelText");
    expect(source).toContain("await user.type");
    expect(source).toContain("await user.click");
    expect(source).not.toMatch(/getByTestId|getByText|querySelector|fireEvent|\.click\(\)/);
  });
});
