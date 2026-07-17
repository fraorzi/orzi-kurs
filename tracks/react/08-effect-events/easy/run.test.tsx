import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  StepCounter,
  type Ticker,
} from "./starter";

describe("StepCounter", () => {
  it("czyta najnowszy krok bez ponownej subskrypcji", () => {
    let listener = () => {};
    const ticker: Ticker = {
      subscribe: vi.fn((nextListener) => {
        listener = nextListener;
        return vi.fn();
      }),
    };
    const { rerender } = render(<StepCounter step={1} ticker={ticker} />);

    act(listener);
    expect(screen.getByRole("status", { name: "Wynik" }))
      .toHaveTextContent("1");

    rerender(<StepCounter step={5} ticker={ticker} />);
    expect(ticker.subscribe).toHaveBeenCalledOnce();

    act(listener);
    expect(screen.getByRole("status", { name: "Wynik" }))
      .toHaveTextContent("6");
  });
});
