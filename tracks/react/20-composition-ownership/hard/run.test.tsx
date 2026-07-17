import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { MemberPicker } from "./starter";

const ada = { id: "u1", name: "Ada" };
const lin = { id: "u2", name: "Lin" };

describe("SelectionController", () => {
  it("zachowuje wybór po reorderze dzięki stabilnemu ID", async () => {
    const { rerender, user } = renderWithUser(
      <MemberPicker members={[ada, lin]} />,
    );

    await user.click(screen.getByRole("button", { name: "Lin" }));
    expect(screen.getByRole("button", { name: "Lin (wybrano)" }))
      .toHaveAttribute("aria-pressed", "true");

    rerender(<MemberPicker members={[lin, ada]} />);
    expect(screen.getByRole("button", { name: "Lin (wybrano)" }))
      .toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Ada" }))
      .toHaveAttribute("aria-pressed", "false");
  });
});
