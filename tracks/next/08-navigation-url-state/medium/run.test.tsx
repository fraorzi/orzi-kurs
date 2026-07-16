import { describe, expect, it, vi } from "vitest";
import { renderWithUser, screen } from "@harness/next-test";

const navigation = vi.hoisted(() => ({ replace: vi.fn(), push: vi.fn() }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/catalog",
  useRouter: () => navigation,
  useSearchParams: () => new URLSearchParams("query=old&sort=price-asc&page=4&stock=1"),
}));

import { CatalogSearch } from "./starter";

describe("CatalogSearch", () => {
  it("zachowuje filtry, resetuje page i zastępuje wpis historii", async () => {
    const { user } = renderWithUser(<CatalogSearch />);
    const input = screen.getByRole("textbox", { name: "Query" });
    await user.clear(input);
    await user.type(input, "keyboard");
    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/catalog?query=keyboard&sort=price-asc&stock=1",
    );
    expect(navigation.push).not.toHaveBeenCalled();
  });
});
