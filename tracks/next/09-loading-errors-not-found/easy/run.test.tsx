import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/next-test";
import Loading from "./starter";

describe("loading.tsx", () => {
  it("komunikuje stan i zachowuje nieinteraktywny skeleton", () => {
    render(<Loading />);
    const status = screen.getByRole("status");
    expect(
      screen.getByRole("heading", {
        name: "Ładowanie zamówień",
      }),
    ).toBeVisible();
    expect(status.querySelectorAll("li")).toHaveLength(3);
    expect(
      screen.queryByRole("button"),
    ).not.toBeInTheDocument();
  });
});
