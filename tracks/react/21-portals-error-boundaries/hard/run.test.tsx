import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  Dashboard,
  type Widget,
} from "./starter";

describe("Dashboard", () => {
  it("izoluje awarię i resetuje widget po zmianie wersji", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const onWidgetError = vi.fn();
    const healthy: Widget = {
      id: "traffic",
      title: "Ruch",
      version: 1,
      render: () => <p>1200 wizyt</p>,
    };
    const broken: Widget = {
      id: "sales",
      title: "Sprzedaż",
      version: 1,
      render: () => {
        throw new Error("invalid response");
      },
    };

    try {
      const { rerender } = render(
        <Dashboard
          widgets={[healthy, broken]}
          onWidgetError={onWidgetError}
        />,
      );

      expect(screen.getByText("1200 wizyt")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Widget Sprzedaż niedostępny",
      );
      expect(onWidgetError).toHaveBeenCalledWith(
        "sales",
        expect.any(Error),
      );

      rerender(
        <Dashboard
          widgets={[
            healthy,
            {
              ...broken,
              version: 2,
              render: () => <p>42 zamówienia</p>,
            },
          ]}
          onWidgetError={onWidgetError}
        />,
      );

      expect(screen.getByText("42 zamówienia")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.getByText("1200 wizyt")).toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  });
});
