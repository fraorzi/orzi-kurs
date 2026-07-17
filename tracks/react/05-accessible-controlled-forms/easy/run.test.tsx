import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ProductSearch } from "./starter";

describe("ProductSearch", () => {
  it("czyści kontrolowane pole i wysyła znormalizowane query", async () => {
    const onSearch = vi.fn();
    const { user } = renderWithUser(<ProductSearch onSearch={onSearch} />);
    const input = screen.getByRole("textbox", { name: "Szukaj produktów" });

    await user.type(input, "monitor");
    await user.click(screen.getByRole("button", { name: "Wyczyść" }));
    expect(input).toHaveValue("");

    await user.type(input, "  laptop  ");
    await user.click(screen.getByRole("button", { name: "Szukaj" }));
    expect(onSearch).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledWith("laptop");

    await user.clear(input);
    await user.click(screen.getByRole("button", { name: "Szukaj" }));
    expect(onSearch).toHaveBeenCalledOnce();
  });
});
