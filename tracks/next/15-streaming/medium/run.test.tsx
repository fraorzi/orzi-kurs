import { act, render, screen } from "@harness/react-test";
import { describe, expect, it } from "vitest";
import { Dashboard, type OrdersSummary, type Revenue } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

describe("Dashboard streaming boundaries", () => {
  it("pokazuje shell i oba niezależne fallbacki", () => {
    render(<Dashboard
      revenuePromise={new Promise<Revenue>(() => undefined)}
      ordersPromise={new Promise<OrdersSummary>(() => undefined)}
    />);
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Ładowanie przychodu…")).toBeInTheDocument();
    expect(screen.getByText("Ładowanie zamówień…")).toBeInTheDocument();
  });

  it("ujawnia szybszą sekcję bez czekania na wolniejszą", async () => {
    const revenue = deferred<Revenue>();
    const orders = deferred<OrdersSummary>();
    const { rerender } = render(
      <Dashboard revenuePromise={revenue.promise} ordersPromise={orders.promise} />,
    );
    await act(async () => {
      revenue.resolve({ formatted: "120 000 zł" });
      await revenue.promise;
      rerender(<Dashboard
        revenuePromise={revenue.promise}
        ordersPromise={orders.promise}
      />);
    });
    expect(screen.getByText("120 000 zł")).toBeInTheDocument();
    expect(screen.getByText("Ładowanie zamówień…")).toBeInTheDocument();
  });
});
