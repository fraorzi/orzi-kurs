import { describe, expect, it, vi } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ExportDashboard } from "./starter";

describe("ExportDashboard", () => {
  it("pomija render przycisku dla niezwiązanej zmiany i zachowuje świeże ID", async () => {
    const buttonRenders = createRenderCounter();
    const onExport = vi.fn();
    const { rerender, user } = renderWithUser(
      <ExportDashboard
        reportId="report-1"
        onExport={onExport}
        onExportButtonRender={buttonRenders.onRender}
      />,
    );
    buttonRenders.reset();

    await user.click(screen.getByRole("checkbox", { name: "Kompaktowy" }));
    expect(buttonRenders.commits).toBe(0);

    rerender(
      <ExportDashboard
        reportId="report-2"
        onExport={onExport}
        onExportButtonRender={buttonRenders.onRender}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Eksportuj raport" }));

    expect(onExport).toHaveBeenLastCalledWith("report-2");
  });
});

