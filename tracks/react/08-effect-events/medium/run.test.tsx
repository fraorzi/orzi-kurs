import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
} from "@harness/react-test";
import {
  ChatNotifications,
  type ChatConnection,
} from "./starter";

describe("ChatNotifications", () => {
  it("używa najnowszych ustawień bez ponownego łączenia", () => {
    let connected = () => {};
    const disconnect = vi.fn();
    const chat: ChatConnection = {
      connect: vi.fn((_roomId, onConnected) => {
        connected = onConnected;
        return disconnect;
      }),
    };
    const firstNotify = vi.fn();
    const secondNotify = vi.fn();
    const { rerender } = render(
      <ChatNotifications
        roomId="general"
        muted
        chat={chat}
        onNotify={firstNotify}
      />,
    );

    rerender(
      <ChatNotifications
        roomId="general"
        muted={false}
        chat={chat}
        onNotify={secondNotify}
      />,
    );
    expect(chat.connect).toHaveBeenCalledOnce();

    act(connected);
    expect(firstNotify).not.toHaveBeenCalled();
    expect(secondNotify).toHaveBeenCalledWith("Połączono z general");

    rerender(
      <ChatNotifications
        roomId="product"
        muted={false}
        chat={chat}
        onNotify={secondNotify}
      />,
    );
    expect(disconnect).toHaveBeenCalledOnce();
    expect(chat.connect).toHaveBeenCalledTimes(2);
  });
});
