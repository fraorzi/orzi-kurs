import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import { DebouncedLabel } from "./starter";

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebouncedValue", () => {
  it("publikuje wyłącznie wartość stabilną przez całe opóźnienie", () => {
    vi.useFakeTimers();
    const { rerender } = render(
      <DebouncedLabel value="a" delayMs={100} />,
    );

    rerender(<DebouncedLabel value="ab" delayMs={100} />);
    act(() => vi.advanceTimersByTime(60));
    rerender(<DebouncedLabel value="abc" delayMs={100} />);
    act(() => vi.advanceTimersByTime(60));
    expect(screen.getByLabelText("Wartość")).toHaveTextContent(/^a$/);

    act(() => vi.advanceTimersByTime(40));
    expect(screen.getByLabelText("Wartość")).toHaveTextContent(/^abc$/);
  });
});
