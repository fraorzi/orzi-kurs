import type { ExperimentDefinition } from "../../shared/experiments";

// Optional per-task examples. Every other single-file function, component or types task infers an adapter.
export const EXPERIMENTS: Record<string, ExperimentDefinition> = {
  "js/29-numbers/easy": {
    kind: "function", title: "roundTo(value, digits)", exportName: "roundTo",
    description: "Zmień liczbę i precyzję. Argumenty podaj jako tablicę JSON.", example: [3.14159, 2],
  },
  "js/35-optimize-repeated-work/hard": {
    kind: "function", title: "firstUnique(values)", exportName: "firstUnique",
    description: "Porównaj dane z unikalną wartością i bez niej.", example: [[2, 2, 1, 3, 3]],
  },
  "ts/02-unions-narrowing/medium": {
    kind: "function", title: "countFatal(events)", exportName: "countFatal",
    description: "Podaj tablicę argumentów: jedną listę zdarzeń analitycznych.",
    example: [[{ type: "pageview", path: "/" }, { type: "error", message: "a", fatal: true }, { type: "error", message: "b", fatal: false }]],
  },
  "ts/18-type-challenges/medium": {
    kind: "types", title: "Diagnostyka typów",
    description: "Zapisz kod w IDE i sprawdź diagnostykę kompilatora. To uruchomienie nie zapisuje próby.",
  },
  "react/06-derived-state-no-effect/easy": {
    kind: "component", title: "OrderSummary", exportName: "OrderSummary",
    description: "Zmień items bez ponownego montowania komponentu i obserwuj sumę.",
    example: { items: [{ id: "book", quantity: 1, unitPriceCents: 1234 }] },
  },
  "node/02-process-config/easy": {
    kind: "function", title: "solve(argv)", exportName: "solve",
    description: "Wypróbuj własne argumenty CLI bez uruchamiania usługi.", example: [["--port", "8080", "--json"]],
  },
  "next/08-navigation-url-state/easy": {
    kind: "function", title: "patchCatalogQuery(current, change)", exportName: "patchCatalogQuery",
    description: "Sprawdź zmianę wyszukiwania bez utraty pozostałych filtrów URL.",
    example: ["category=books&page=3", { query: "react" }],
  },
  "combined/quality-01/hard": {
    kind: "function", title: "buildRows(items, users)", exportName: "buildRows",
    description: "Porównaj wiersze przed i po zmianie kolejności danych.",
    example: [[{ id: "book", ownerId: "u1", title: "React" }], [{ id: "u1", name: "Anna" }]],
  },
  "node/08-http-server/easy": {
    kind: "function", title: "solve(routes, method, rawUrl)", exportName: "solve",
    description: "Sprawdź dopasowanie trasy i metody HTTP.", example: [[{ method: "GET", path: "/items" }], "GET", "/items?limit=5"],
  },
  "strapi/14-debug-strapi/easy": {
    kind: "function", title: "solve(entry)", exportName: "solve",
    description: "Porównaj odpowiedź z relacją cover, z null i bez klucza cover.", example: [{ title: "Pierwszy wpis" }],
  },
  "mysql/03-joins/medium": {
    kind: "sql", title: "Klienci i opłacone zamówienia",
    description: "Zmień dane tabel i wykonaj zapisany starter.sql na osobnym schemacie testowym.",
    example: { customers: [1, 2, 3], orders: [{ id: 10, customerId: 1, status: "paid" }, { id: 11, customerId: 2, status: "cancelled" }] },
  },
};
