import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  WorkspacePresence,
  type ActivityService,
  type ChatService,
} from "./starter";

describe("WorkspacePresence", () => {
  it("resynchronizuje wyłącznie proces zależny od zmienionego workspace", () => {
    const disconnectGeneral = vi.fn();
    const disconnectProduct = vi.fn();
    const stopActivity = vi.fn();
    const chat: ChatService = {
      connect: vi.fn((workspaceId) => (
        workspaceId === "general" ? disconnectGeneral : disconnectProduct
      )),
    };
    const activity: ActivityService = {
      start: vi.fn(() => stopActivity),
    };

    const { rerender, unmount } = render(
      <WorkspacePresence
        workspaceId="general"
        chat={chat}
        activity={activity}
      />,
    );
    expect(screen.getByRole("heading", { name: "Workspace general" }))
      .toBeInTheDocument();
    expect(chat.connect).toHaveBeenCalledOnce();
    expect(activity.start).toHaveBeenCalledOnce();

    rerender(
      <WorkspacePresence
        workspaceId="product"
        chat={chat}
        activity={activity}
      />,
    );
    expect(disconnectGeneral).toHaveBeenCalledOnce();
    expect(chat.connect).toHaveBeenCalledTimes(2);
    expect(activity.start).toHaveBeenCalledOnce();
    expect(stopActivity).not.toHaveBeenCalled();

    unmount();
    expect(disconnectProduct).toHaveBeenCalledOnce();
    expect(stopActivity).toHaveBeenCalledOnce();
  });
});
