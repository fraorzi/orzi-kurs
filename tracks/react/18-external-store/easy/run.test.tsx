import { describe, expect, it } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  OnlineBadge,
  type OnlineSource,
} from "./starter";

describe("OnlineBadge", () => {
  it("renderuje zmiany zgłaszane przez external source", () => {
    let online = true;
    const listeners = new Set<() => void>();
    const source: OnlineSource = {
      subscribe(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
      },
      getSnapshot: () => online,
      getServerSnapshot: () => true,
    };

    render(<OnlineBadge source={source} />);
    expect(screen.getByText("Online")).toBeInTheDocument();

    act(() => {
      online = false;
      listeners.forEach((listener) => listener());
    });
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});
