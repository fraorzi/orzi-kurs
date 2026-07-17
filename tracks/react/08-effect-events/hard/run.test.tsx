import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
} from "@harness/react-test";
import {
  SearchPolling,
  type PollingScheduler,
} from "./starter";

describe("SearchPolling", () => {
  it("restartuje tylko po zmianie konfiguracji procesu", () => {
    let tick = () => {};
    const firstStop = vi.fn();
    const secondStop = vi.fn();
    const scheduler: PollingScheduler = {
      start: vi.fn((intervalMs, callback) => {
        tick = callback;
        return intervalMs === 1000 ? firstStop : secondStop;
      }),
    };
    const firstPoll = vi.fn();
    const secondPoll = vi.fn();
    const { rerender, unmount } = render(
      <SearchPolling
        intervalMs={1000}
        query="react"
        scheduler={scheduler}
        onPoll={firstPoll}
      />,
    );

    rerender(
      <SearchPolling
        intervalMs={1000}
        query="compiler"
        scheduler={scheduler}
        onPoll={secondPoll}
      />,
    );
    expect(scheduler.start).toHaveBeenCalledOnce();
    act(tick);
    expect(firstPoll).not.toHaveBeenCalled();
    expect(secondPoll).toHaveBeenCalledWith("compiler");

    rerender(
      <SearchPolling
        intervalMs={5000}
        query="compiler"
        scheduler={scheduler}
        onPoll={secondPoll}
      />,
    );
    expect(firstStop).toHaveBeenCalledOnce();
    expect(scheduler.start).toHaveBeenCalledTimes(2);

    unmount();
    expect(secondStop).toHaveBeenCalledOnce();
  });
});
