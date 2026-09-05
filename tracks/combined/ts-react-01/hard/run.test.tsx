import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { DataTable, type Column } from "./starter";

interface Person {
  id: string;
  name: string;
  city: string;
}

const people: Person[] = [
  { id: "1", name: "Ada", city: "Warszawa" },
  { id: "2", name: "Bo", city: "Kraków" },
];

const columns: Column<Person>[] = [
  { label: "Osoba", render: (row) => row.name },
  { label: "Miasto", render: (row) => row.city },
];

describe("generyczny DataTable", () => {
  it("renderuje nagłówki kolumn jako columnheader", () => {
    render(
      <DataTable
        rows={people}
        columns={columns}
        keyOf={(r) => r.id}
      />,
    );
    expect(
      screen.getByRole("columnheader", { name: "Osoba" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Miasto" }),
    ).toBeInTheDocument();
  });

  it("renderuje wiersze z komórkami z render kolumny", () => {
    render(
      <DataTable
        rows={people}
        columns={columns}
        keyOf={(r) => r.id}
      />,
    );
    const rows = screen.getAllByRole("row");
    // 1 nagłówkowy + 2 danych
    expect(rows).toHaveLength(3);
    expect(
      within(rows[1]!).getByRole("cell", { name: "Ada" }),
    ).toBeInTheDocument();
    expect(
      within(rows[2]!).getByRole("cell", {
        name: "Kraków",
      }),
    ).toBeInTheDocument();
  });

  it("pokazuje komunikat dla pustej listy", () => {
    render(
      <DataTable
        rows={[]}
        columns={columns}
        keyOf={(r: Person) => r.id}
      />,
    );
    expect(screen.getByText("Brak danych")).toBeVisible();
    expect(
      screen.queryByRole("table"),
    ).not.toBeInTheDocument();
  });

  it("działa dla dowolnego typu wiersza (generyczność)", () => {
    render(
      <DataTable
        rows={[{ sku: "X1", price: 10 }]}
        columns={[{ label: "SKU", render: (r) => r.sku }]}
        keyOf={(r) => r.sku}
      />,
    );
    expect(
      screen.getByRole("cell", { name: "X1" }),
    ).toBeInTheDocument();
  });
});
