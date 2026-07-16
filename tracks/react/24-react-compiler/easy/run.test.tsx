import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  compileReactSource,
  wasCompiled,
} from "@harness/react-compiler";
import { ExpandableDetails } from "./starter";

describe("ExpandableDetails", () => {
  it("zachowuje stabilną kolejność hooków przy zmianie propsa", async () => {
    const { rerender, user } = renderWithUser(
      <ExpandableDetails enabled={false} />,
    );
    expect(screen.getByText("Funkcja wyłączona")).toBeInTheDocument();

    rerender(<ExpandableDetails enabled />);
    await user.click(screen.getByRole("button", { name: "Pokaż szczegóły" }));
    expect(screen.getByText("Szczegóły wdrożenia")).toBeInTheDocument();
  });

  it("jest optymalizowany przez prawdziwy React Compiler", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/24-react-compiler/easy/starter.tsx",
      ),
      "utf8",
    );
    const output = compileReactSource(source);

    expect(wasCompiled(output, "ExpandableDetails")).toBe(true);
  });
});

