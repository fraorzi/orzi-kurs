import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  act,
  render,
  screen,
} from "@harness/react-test";
import {
  CartSummary,
  createCartStore,
} from "./starter";

describe("createCartStore", () => {
  it("cache'uje snapshot, aktualizuje go i wspiera server rendering", () => {
    const store = createCartStore([{ id: "p1", price: 20 }]);
    const initialSnapshot = store.getSnapshot();

    expect(store.getSnapshot()).toBe(initialSnapshot);
    expect(renderToString(<CartSummary store={store} />))
      .toContain("1 produktów");

    render(<CartSummary store={store} />);
    expect(screen.getByText("1 produktów")).toBeInTheDocument();
    expect(screen.getByLabelText("Suma")).toHaveTextContent("20 zł");

    act(() => {
      store.addItem({ id: "p2", price: 15 });
    });

    expect(store.getSnapshot()).not.toBe(initialSnapshot);
    expect(store.getSnapshot()).toBe(store.getSnapshot());
    expect(screen.getByText("2 produktów")).toBeInTheDocument();
    expect(screen.getByLabelText("Suma")).toHaveTextContent("35 zł");
  });
});
