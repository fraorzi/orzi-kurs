// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, renderWithUser, screen } from "@harness/react-test";
import { loadWidgetItems, Widget } from "./starter";

describe("server loader: minimalny, serializowalny DTO", () => {
  it("odrzuca rekordy nieopublikowane i usuwa pola serwerowe", async () => {
    const items = await loadWidgetItems(async () => [
      {
        id: "1",
        title: "Draft",
        status: "draft",
        secret: "top-secret",
        createdAt: new Date("2026-01-01"),
      },
      {
        id: "2",
        title: "Published",
        status: "published",
        secret: "top-secret",
        createdAt: new Date("2026-02-01"),
      },
    ]);

    expect(items).toEqual([
      { id: "2", title: "Published", createdAt: "2026-02-01T00:00:00.000Z" },
    ]);
  });

  it("zwraca dane, które JSON.stringify serializuje bez sekretu", async () => {
    const items = await loadWidgetItems(async () => [
      {
        id: "1",
        title: "Published",
        status: "published",
        secret: "top-secret",
        createdAt: new Date("2026-02-01"),
      },
    ]);

    const serialized = JSON.stringify(items);
    expect(() => serialized).not.toThrow();
    expect(serialized).not.toContain("top-secret");
  });
});

describe("client widget: filtr i dostępność", () => {
  const items = [
    { id: "1", title: "Faktura Acme", createdAt: "2026-02-01T00:00:00.000Z" },
    { id: "2", title: "Faktura Globex", createdAt: "2026-02-02T00:00:00.000Z" },
  ];

  it("renderuje tytuły przekazane w propsach", () => {
    render(<Widget items={items} />);
    expect(screen.getByText("Faktura Acme")).toBeInTheDocument();
    expect(screen.getByText("Faktura Globex")).toBeInTheDocument();
  });

  it("filtruje listę w miarę wpisywania tekstu", async () => {
    const { user } = renderWithUser(<Widget items={items} />);
    await user.type(screen.getByLabelText("Filtruj"), "Acme");

    expect(screen.getByText("Faktura Acme")).toBeInTheDocument();
    expect(screen.queryByText("Faktura Globex")).not.toBeInTheDocument();
  });

  it("pokazuje dostępny pusty stan, gdy filtr nie pasuje do niczego", async () => {
    const { user } = renderWithUser(<Widget items={items} />);
    await user.type(screen.getByLabelText("Filtruj"), "nie ma takiej");

    expect(screen.getByRole("status")).toHaveTextContent("Brak wyników");
  });
});
