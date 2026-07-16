import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { renderWithUser, screen } from "@harness/react-test";
import { StockControl } from "./starter";

function deferred<T>() {
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((_resolve, rejectPromise) => {
    reject = rejectPromise;
  });
  return { promise, reject };
}

describe("StockControl", () => {
  it("pokazuje zmianę optymistycznie i przywraca snapshot po błędzie", async () => {
    const request = deferred<void>();
    const fetchStock = vi.fn(async () => ({ productId: "keyboard", quantity: 10 }));
    const updateStock = vi.fn((_quantity: number) => request.promise);
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const { user } = renderWithUser(
      <QueryClientProvider client={client}>
        <StockControl
          productId="keyboard"
          fetchStock={fetchStock}
          updateStock={updateStock}
        />
      </QueryClientProvider>,
    );
    expect(await screen.findByRole("status", { name: "Ilość" }))
      .toHaveTextContent("10");

    await user.click(screen.getByRole("button", { name: "Zmniejsz stan" }));
    expect(screen.getByRole("status", { name: "Ilość" })).toHaveTextContent("9");
    expect(updateStock.mock.calls[0]?.[0]).toBe(9);

    request.reject(new Error("Conflict"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Nie udało się zapisać stanu.",
    );
    expect(screen.getByRole("status", { name: "Ilość" })).toHaveTextContent("10");
  });
});
