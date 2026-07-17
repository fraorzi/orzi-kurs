import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  RoomMessages,
  type MessageSource,
} from "./starter";

function createMessageSource() {
  const listeners = new Map<string, Set<(message: string) => void>>();
  const unsubscribes: ReturnType<typeof vi.fn>[] = [];
  const source: MessageSource = {
    subscribe: vi.fn((roomId, listener) => {
      const roomListeners = listeners.get(roomId) ?? new Set();
      roomListeners.add(listener);
      listeners.set(roomId, roomListeners);

      const unsubscribe = vi.fn(() => {
        roomListeners.delete(listener);
      });
      unsubscribes.push(unsubscribe);
      return unsubscribe;
    }),
  };

  return {
    source,
    unsubscribes,
    emit(roomId: string, message: string) {
      act(() => {
        for (const listener of listeners.get(roomId) ?? []) {
          listener(message);
        }
      });
    },
  };
}

describe("RoomMessages", () => {
  it("przenosi subskrypcję między pokojami i sprząta ją", () => {
    const messages = createMessageSource();
    const { rerender, unmount } = render(
      <RoomMessages roomId="general" source={messages.source} />,
    );

    messages.emit("general", "Cześć");
    expect(screen.getByRole("status", { name: "Ostatnia wiadomość" }))
      .toHaveTextContent("Cześć");

    rerender(<RoomMessages roomId="product" source={messages.source} />);
    expect(messages.unsubscribes[0]).toHaveBeenCalledOnce();

    messages.emit("general", "Nieaktualna");
    expect(screen.getByRole("status", { name: "Ostatnia wiadomość" }))
      .toHaveTextContent("Cześć");
    messages.emit("product", "Nowy release");
    expect(screen.getByRole("status", { name: "Ostatnia wiadomość" }))
      .toHaveTextContent("Nowy release");

    unmount();
    expect(messages.unsubscribes[1]).toHaveBeenCalledOnce();
  });
});
