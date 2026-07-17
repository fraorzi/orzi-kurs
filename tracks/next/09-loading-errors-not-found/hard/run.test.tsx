import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { renderWithUser, screen } from "@harness/next-test";
import ErrorPage from "./src/error";
import NotFound from "./src/not-found";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("route recovery boundaries", () => {
  it("raportuje awarię i pozwala ponowić segment", async () => {
    const report = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const unstable_retry = vi.fn();
    const error = Object.assign(new Error("secret database details"), { digest: "abc-7" });
    const { user } = renderWithUser(
      <ErrorPage error={error} unstable_retry={unstable_retry} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("abc-7");
    expect(screen.getByRole("alert")).not.toHaveTextContent("secret database details");
    expect(report).toHaveBeenCalledWith(error);
    await user.click(screen.getByRole("button", { name: "Spróbuj ponownie" }));
    expect(unstable_retry).toHaveBeenCalledOnce();
    report.mockRestore();
  });

  it("udostępnia drogę powrotu z 404", () => {
    renderWithUser(<NotFound />);
    expect(screen.getByRole("heading", { name: "Nie znaleziono produktu" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Wróć do katalogu" }))
      .toHaveAttribute("href", "/products");
  });

  it("utrzymuje error.tsx jako Client Component", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/next/09-loading-errors-not-found/hard/src/error.tsx"),
      "utf8",
    );
    expect(source.trimStart().startsWith('"use client"')).toBe(true);
    expect(source).toContain("useEffect");
  });
});
