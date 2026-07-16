import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { CustomerSearch } from "./starter";

describe("CustomerSearch", () => {
  it("utrzymuje pilny input i stare wyniki podczas Transition", async () => {
    let resolveSearch: (
      customers: readonly { id: string; name: string }[],
    ) => void = () => {};
    const searchCustomers = vi.fn(
      () =>
        new Promise<readonly { id: string; name: string }[]>((resolve) => {
          resolveSearch = resolve;
        }),
    );
    const { user } = renderWithUser(
      <CustomerSearch
        initialCustomers={[{ id: "old", name: "Anna Kowalska" }]}
        searchCustomers={searchCustomers}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Szukaj klientów" });
    await user.type(input, "acme");
    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(searchCustomers).toHaveBeenCalledWith("acme");
    expect(screen.getByRole("status")).toHaveTextContent("Wyszukiwanie…");
    expect(screen.getByText("Anna Kowalska")).toBeInTheDocument();

    await user.type(input, " now");
    expect(input).toHaveValue("acme now");

    await act(async () => {
      resolveSearch([{ id: "new", name: "Acme Sp. z o.o." }]);
    });

    expect(await screen.findByText("Acme Sp. z o.o.")).toBeInTheDocument();
    expect(screen.queryByText("Anna Kowalska")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

