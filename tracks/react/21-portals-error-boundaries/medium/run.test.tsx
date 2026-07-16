import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  PortalAction,
  WorkspaceContext,
} from "./starter";

describe("PortalAction", () => {
  it("zachowuje context i propagację według drzewa React", async () => {
    const portalLayer = document.createElement("div");
    document.body.append(portalLayer);
    const onInteraction = vi.fn();

    try {
      const { user } = renderWithUser(
        <WorkspaceContext value="Atlas">
          <PortalAction
            container={portalLayer}
            onInteraction={onInteraction}
          />
        </WorkspaceContext>,
      );
      const button = screen.getByRole("button", { name: "Otwórz Atlas" });

      expect(portalLayer).toContainElement(button);
      await user.click(button);
      expect(onInteraction).toHaveBeenCalledTimes(1);
    } finally {
      portalLayer.remove();
    }
  });
});
