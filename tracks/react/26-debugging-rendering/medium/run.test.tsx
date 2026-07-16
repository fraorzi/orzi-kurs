import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { DocumentTitleSync } from "./starter";

describe("DocumentTitleSync", () => {
  it("synchronizuje aktualny dokument nawet przy niezmienionym tytule", () => {
    const saveTitle = vi.fn();
    const { rerender } = render(
      <DocumentTitleSync
        documentId="doc-1"
        title="Plan wydania"
        saveTitle={saveTitle}
      />,
    );

    rerender(
      <DocumentTitleSync
        documentId="doc-2"
        title="Plan wydania"
        saveTitle={saveTitle}
      />,
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Plan wydania");
    expect(saveTitle).toHaveBeenNthCalledWith(1, "doc-1", "Plan wydania");
    expect(saveTitle).toHaveBeenNthCalledWith(2, "doc-2", "Plan wydania");
  });
});

