import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/react-test";
import { DataTable } from "./starter";

describe("generyczny DataTable", () => {
  it("renderuje semantyczną tabelę i pusty stan", () => {
    const { rerender } = render(<DataTable rows={[{ id: "1", name: "Ada" }]} keyOf={(row) => row.id} columns={[{ label: "Osoba", render: (row) => row.name }]} />);
    expect(screen.getByRole("columnheader", { name: "Osoba" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Ada" })).toBeInTheDocument();
    rerender(<DataTable rows={[]} keyOf={(row: { id: string }) => row.id} columns={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent("Brak danych");
  });
});

