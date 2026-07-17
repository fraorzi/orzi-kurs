import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  ThemeContext,
  ThemeDetails,
} from "./starter";

describe("ThemeDetails", () => {
  it("czyta context dopiero w aktywnej gałęzi", () => {
    const { rerender } = render(
      <ThemeDetails showDetails={false} />,
    );
    expect(screen.getByText("Szczegóły motywu ukryte"))
      .toBeInTheDocument();

    rerender(
      <ThemeContext value="dark">
        <ThemeDetails showDetails />
      </ThemeContext>,
    );
    expect(screen.getByText("Aktywny motyw: dark")).toBeInTheDocument();
  });
});
