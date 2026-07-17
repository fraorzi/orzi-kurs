import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { ToastPortal } from "./starter";

describe("ToastPortal", () => {
  it("umieszcza komunikat w przekazanej warstwie DOM", () => {
    const toastLayer = document.createElement("div");
    document.body.append(toastLayer);

    try {
      render(
        <ToastPortal
          message="Zmiany zapisane"
          container={toastLayer}
        />,
      );
      const toast = screen.getByRole("status");

      expect(toast).toHaveTextContent("Zmiany zapisane");
      expect(toastLayer).toContainElement(toast);
    } finally {
      toastLayer.remove();
    }
  });
});
