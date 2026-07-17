import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
  within,
} from "@harness/react-test";
import { ProductFilter } from "./starter";

describe("ProductFilter", () => {
  it("filtruje aktualne propsy bez synchronizowania drugiego stanu", async () => {
    const { rerender, user } = renderWithUser(
      <ProductFilter
        products={[
          { id: "projector", name: "Projektor" },
          { id: "monitor", name: "Monitor" },
        ]}
      />,
    );
    await user.type(
      screen.getByRole("textbox", { name: "Filtruj produkty" }),
      "pro",
    );

    const list = screen.getByRole("list", { name: "Produkty" });
    expect(within(list).getByText("Projektor")).toBeInTheDocument();
    expect(within(list).queryByText("Monitor")).not.toBeInTheDocument();

    rerender(
      <ProductFilter
        products={[
          { id: "processor", name: "Procesor" },
          { id: "keyboard", name: "Klawiatura" },
        ]}
      />,
    );

    expect(within(list).getByText("Procesor")).toBeInTheDocument();
    expect(within(list).queryByText("Projektor")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Filtruj produkty" }))
      .toHaveValue("pro");
  });
});
