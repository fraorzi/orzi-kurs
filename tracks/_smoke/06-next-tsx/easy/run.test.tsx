// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@harness/next-test";

vi.mock("next/navigation", () => ({
  usePathname: () => "/reports",
}));

import { CurrentPath } from "./starter";

describe("Next TSX smoke task", () => {
  it("renderuje Client Component z zamockowanym routerem", () => {
    render(<CurrentPath />);

    expect(screen.getByText("Ścieżka: /reports")).toBeInTheDocument();
  });
});
