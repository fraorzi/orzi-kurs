import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { WorkflowHistory } from "./starter";

describe("WorkflowHistory", () => {
  it("obsługuje undo/redo i czyści przyszłość po nowej zmianie", async () => {
    const { user } = renderWithUser(
      <WorkflowHistory initialStatus="backlog" />,
    );
    const status = screen.getByRole("status", { name: "Status" });
    const undo = screen.getByRole("button", { name: "Cofnij" });
    const redo = screen.getByRole("button", { name: "Ponów" });

    await user.click(screen.getByRole("button", { name: "Ustaw w toku" }));
    await user.click(screen.getByRole("button", { name: "Ustaw gotowe" }));
    expect(status).toHaveTextContent("done");

    await user.click(undo);
    expect(status).toHaveTextContent("doing");
    expect(redo).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Ustaw backlog" }));
    expect(status).toHaveTextContent("backlog");
    expect(redo).toBeDisabled();

    await user.click(undo);
    expect(status).toHaveTextContent("doing");
    await user.click(redo);
    expect(status).toHaveTextContent("backlog");
  });
});
