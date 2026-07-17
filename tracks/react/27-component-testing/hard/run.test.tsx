import "@harness/react-test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import "./starter";

describe("kontrakt testu InvoiceList", () => {
  it("testuje oba layouty przez ten sam kontrakt użytkownika", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/27-component-testing/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("it.each");
    expect(source).toContain("getByRole");
    expect(source).toContain("renderWithUser");
    expect(source).not.toMatch(
      /querySelector|getByTestId|container|toMatchSnapshot|dispatchEvent/,
    );
  });
});
