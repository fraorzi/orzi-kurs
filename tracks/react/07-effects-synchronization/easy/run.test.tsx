import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { DocumentTitle } from "./starter";

describe("DocumentTitle", () => {
  it("resynchronizuje i przywraca tytuł dokumentu", () => {
    document.title = "Panel";
    const { rerender, unmount } = render(<DocumentTitle title="Zamówienia" />);

    expect(screen.getByRole("heading", { name: "Zamówienia" }))
      .toBeInTheDocument();
    expect(document.title).toBe("Zamówienia");

    rerender(<DocumentTitle title="Klienci" />);
    expect(document.title).toBe("Klienci");

    unmount();
    expect(document.title).toBe("Panel");
  });
});
