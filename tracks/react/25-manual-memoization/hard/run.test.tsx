import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { LiveChart } from "./starter";

describe("LiveChart", () => {
  it("utrzymuje połączenie dla niezwiązanej zmiany i odtwarza je dla opcji", async () => {
    const cleanups: ReturnType<typeof vi.fn>[] = [];
    const connectChart = vi.fn(() => {
      const cleanup = vi.fn();
      cleanups.push(cleanup);
      return cleanup;
    });
    const series = [10, 20] as const;
    const { rerender, user } = renderWithUser(
      <LiveChart
        currency="PLN"
        series={series}
        connectChart={connectChart}
      />,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Tytuł widoku" }),
      "Sprzedaż",
    );

    expect(connectChart).toHaveBeenCalledTimes(1);
    expect(cleanups[0]).not.toHaveBeenCalled();

    rerender(
      <LiveChart
        currency="EUR"
        series={series}
        connectChart={connectChart}
      />,
    );

    expect(cleanups[0]).toHaveBeenCalledTimes(1);
    expect(connectChart).toHaveBeenCalledTimes(2);
    expect(connectChart).toHaveBeenLastCalledWith({
      currency: "EUR",
      series,
    });
  });
});
