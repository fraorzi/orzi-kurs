import { describe, expect, it, vi } from "vitest";
import { render } from "@harness/react-test";
import { InvoiceList } from "./fixture";

describe("InvoiceList", () => {
  it("otwiera pierwszą fakturę w tabeli", () => {
    const onOpen = vi.fn();
    const { container } = render(
      <InvoiceList
        invoices={[{ id: "inv-1", customer: "Acme", total: 200 }]}
        layout="table"
        onOpen={onOpen}
      />,
    );

    container.querySelector("tbody tr:first-child button")
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(onOpen).toHaveBeenCalledWith("inv-1");
  });
});
