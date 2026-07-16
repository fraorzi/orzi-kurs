import { describe, expect, it, vi } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  ProductDetails,
  type Product,
  type ProductClient,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe("ProductDetails", () => {
  it("anuluje stary request i ignoruje jego spóźniony wynik", async () => {
    const first = deferred<Product>();
    const second = deferred<Product>();
    const signals: AbortSignal[] = [];
    const client: ProductClient = {
      load: vi.fn((productId, signal) => {
        signals.push(signal);
        return productId === "a" ? first.promise : second.promise;
      }),
    };
    const { rerender, unmount } = render(
      <ProductDetails productId="a" client={client} />,
    );
    rerender(<ProductDetails productId="b" client={client} />);

    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);

    await act(async () => {
      second.resolve({ id: "b", name: "Monitor" });
      await second.promise;
    });
    expect(screen.getByRole("heading", { name: "Monitor" }))
      .toBeInTheDocument();

    await act(async () => {
      first.resolve({ id: "a", name: "Stary laptop" });
      await first.promise;
    });
    expect(screen.getByRole("heading", { name: "Monitor" }))
      .toBeInTheDocument();
    expect(screen.queryByText("Stary laptop")).not.toBeInTheDocument();

    unmount();
    expect(signals[1].aborted).toBe(true);
  });

  it("pokazuje błąd, którego nie spowodował abort", async () => {
    const operation = deferred<Product>();
    const client: ProductClient = {
      load: vi.fn(() => operation.promise),
    };
    render(<ProductDetails productId="a" client={client} />);

    await act(async () => {
      operation.reject(new Error("offline"));
      await operation.promise.catch(() => {});
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nie udało się pobrać produktu.",
    );
  });
});
