import { describe, expect, it } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  NotificationBadge,
  type NotificationSource,
} from "./starter";

function createSource() {
  const listeners = new Set<(count: number) => void>();
  const source: NotificationSource = {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };

  return {
    emit(count: number) {
      listeners.forEach((listener) => listener(count));
    },
    get listenerCount() {
      return listeners.size;
    },
    source,
  };
}

describe("NotificationBadge", () => {
  it("sprząta stare źródło przy zmianie i odmontowaniu", () => {
    const first = createSource();
    const second = createSource();
    const { rerender, unmount } = render(
      <NotificationBadge source={first.source} />,
    );

    act(() => first.emit(3));
    expect(screen.getByLabelText("Nieprzeczytane")).toHaveTextContent("3");

    rerender(<NotificationBadge source={second.source} />);
    expect(first.listenerCount).toBe(0);
    expect(second.listenerCount).toBe(1);

    act(() => first.emit(9));
    expect(screen.getByLabelText("Nieprzeczytane")).toHaveTextContent("3");
    act(() => second.emit(4));
    expect(screen.getByLabelText("Nieprzeczytane")).toHaveTextContent("4");

    unmount();
    expect(second.listenerCount).toBe(0);
  });
});

