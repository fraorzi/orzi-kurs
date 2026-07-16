import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { WorkspaceOperations } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("WorkspaceOperations", () => {
  it("utrzymuje niezależne pending dla dwóch formularzy", async () => {
    const exporting = deferred();
    const archiving = deferred();
    const exportData = vi.fn(() => exporting.promise);
    const archiveWorkspace = vi.fn(() => archiving.promise);
    const { user } = renderWithUser(
      <WorkspaceOperations
        exportData={exportData}
        archiveWorkspace={archiveWorkspace}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Eksportuj dane" }));
    expect(screen.getByRole("button", { name: "Eksportowanie…" }))
      .toBeDisabled();
    expect(screen.getByRole("button", { name: "Archiwizuj workspace" }))
      .toBeEnabled();

    expect(exportData).toHaveBeenCalledTimes(1);

    await act(async () => {
      exporting.resolve();
      await exporting.promise;
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Eksportuj dane" }))
        .toBeEnabled();
    });

    await user.click(
      screen.getByRole("button", { name: "Archiwizuj workspace" }),
    );
    expect(archiveWorkspace).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Archiwizowanie…" }))
      .toBeDisabled();
    expect(screen.getByRole("button", { name: "Eksportuj dane" }))
      .toBeEnabled();

    await act(async () => {
      archiving.resolve();
      await archiving.promise;
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Archiwizuj workspace" }))
        .toBeEnabled();
    });
  });
});
