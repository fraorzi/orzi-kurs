import { describe, expect, it } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import {
  CatalogSearch,
  type CatalogResource,
} from "./starter";

interface PendingResult {
  readonly promise: Promise<void>;
  resolve(results: readonly string[]): void;
  results?: readonly string[];
}

function createResource(): CatalogResource & {
  resolve(query: string, results: readonly string[]): void;
} {
  const entries = new Map<string, PendingResult>();

  return {
    read(query) {
      if (query === "") {
        return ["Ostatnio oglądane"];
      }

      let entry = entries.get(query);
      if (!entry) {
        let settle = () => {};
        const promise = new Promise<void>((resolve) => {
          settle = resolve;
        });
        const pending: PendingResult = {
          promise,
          resolve(results) {
            pending.results = results;
            settle();
          },
        };
        entries.set(query, pending);
        entry = pending;
      }

      if (!entry.results) {
        throw entry.promise;
      }

      return entry.results;
    },
    resolve(query, results) {
      entries.get(query)?.resolve(results);
    },
  };
}

describe("CatalogSearch", () => {
  it("utrzymuje stare wyniki, gdy odroczony render zawiesza się", async () => {
    const resource = createResource();
    const { user } = renderWithUser(
      <CatalogSearch resource={resource} />,
    );

    expect(
      screen.getByText("Ostatnio oglądane"),
    ).toBeInTheDocument();

    const input = screen.getByRole("textbox", {
      name: "Szukaj w katalogu",
    });
    await user.type(input, "lap");

    expect(input).toHaveValue("lap");
    expect(
      screen.getByText("Ostatnio oglądane"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Ładowanie wyników…"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Aktualizowanie wyników…",
    );

    await act(async () => {
      resource.resolve("lap", ["Laptop Pro"]);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Laptop Pro"),
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByRole("status"),
    ).not.toBeInTheDocument();
  });
});
