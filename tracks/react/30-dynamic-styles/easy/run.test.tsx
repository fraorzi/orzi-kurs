import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/react-test";
import { ProgressBar } from "./starter";

describe("ProgressBar", () => {
  it("przekazuje wyliczony procent przez dynamiczny style", () => {
    const { rerender } = render(
      <ProgressBar label="Import danych" value={30} max={40} />,
    );

    const progress = screen.getByRole("progressbar", { name: "Import danych" });
    expect(progress).toHaveAttribute("aria-valuenow", "30");
    expect(progress.firstElementChild).toHaveClass("progress-bar__fill");
    expect(progress.firstElementChild).toHaveStyle({ width: "75%" });

    rerender(<ProgressBar label="Import danych" value={60} max={40} />);
    expect(progress).toHaveAttribute("aria-valuenow", "40");
    expect(progress.firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("bezpiecznie obsługuje niedodatnie maksimum", () => {
    render(<ProgressBar label="Pusty import" value={10} max={0} />);

    expect(screen.getByRole("progressbar").firstElementChild)
      .toHaveStyle({ width: "0%" });
  });
});
