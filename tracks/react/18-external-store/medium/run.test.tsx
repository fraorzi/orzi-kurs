import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  MessageCounter,
  type ExternalStore,
} from "./starter";

describe("MessageCounter", () => {
  it("aktualizuje snapshot i sprząta subskrypcję po unmount", () => {
    let count = 2;
    let listener: (() => void) | undefined;
    const unsubscribe = vi.fn();
    const subscribe = vi.fn((callback: () => void) => {
      listener = callback;
      return unsubscribe;
    });
    const store: ExternalStore<number> = {
      subscribe,
      getSnapshot: () => count,
      getServerSnapshot: () => 0,
    };

    const { rerender, unmount } = render(<MessageCounter store={store} />);
    expect(screen.getByText("2 wiadomości")).toBeInTheDocument();
    expect(subscribe).toHaveBeenCalledTimes(1);

    act(() => {
      count = 3;
      listener?.();
    });
    expect(screen.getByText("3 wiadomości")).toBeInTheDocument();

    rerender(<MessageCounter store={store} />);
    expect(subscribe).toHaveBeenCalledTimes(1);

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
