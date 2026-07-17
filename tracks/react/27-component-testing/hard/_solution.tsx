import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { InvoiceList } from "./fixture";

describe("InvoiceList", () => {
  it.each(["table", "cards"] as const)(
    "otwiera fakturę w layoucie %s",
    async (layout) => {
      const onOpen = vi.fn();
      const { user } = renderWithUser(
        <InvoiceList
          invoices={[{ id: "inv-1", customer: "Acme", total: 200 }]}
          layout={layout}
          onOpen={onOpen}
        />,
      );

      await user.click(
        screen.getByRole("button", { name: "Otwórz fakturę Acme" }),
      );

      expect(onOpen).toHaveBeenCalledWith("inv-1");
    },
  );
});
