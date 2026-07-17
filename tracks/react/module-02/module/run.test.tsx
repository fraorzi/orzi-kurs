import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
  within,
} from "@harness/react-test";
import {
  SupportDesk,
  createIncidentStore,
  type DraftStorage,
  type Incident,
} from "./src";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("incident store", () => {
  it("cache'uje snapshot i zachowuje istniejące incydenty", () => {
    const original = { id: "inc-1", title: "Problem z logowaniem" };
    const store = createIncidentStore([original]);
    const initialSnapshot = store.getSnapshot();

    expect(store.getSnapshot()).toBe(initialSnapshot);
    store.addIncident({ id: "inc-2", title: "Brak płatności" });
    expect(store.getSnapshot()).not.toBe(initialSnapshot);
    expect(store.getSnapshot()).toEqual([
      { id: "inc-2", title: "Brak płatności" },
      original,
    ]);
  });
});

describe("SupportDesk", () => {
  it("prowadzi od draftu przez walidację i pending do listy i toastu", async () => {
    const initialIncidents = deferred<readonly Incident[]>();
    const operation = deferred<Incident>();
    const createIncident = vi.fn(() => operation.promise);
    const values = new Map([["incident-draft", "Stary draft"]]);
    const storage: DraftStorage = {
      getItem: vi.fn((key) => values.get(key) ?? null),
      setItem: vi.fn((key, value) => values.set(key, value)),
    };
    const toastContainer = document.createElement("div");
    document.body.append(toastContainer);

    try {
      const renderDesk = () => (
        <SupportDesk
          initialIncidentsPromise={initialIncidents.promise}
          createIncident={createIncident}
          storage={storage}
          toastContainer={toastContainer}
        />
      );
      const { rerender, user } = renderWithUser(renderDesk());
      expect(screen.getByRole("status")).toHaveTextContent(
        "Ładowanie incydentów…",
      );

      await act(async () => {
        initialIncidents.resolve([
          { id: "inc-1", title: "Problem z logowaniem" },
        ]);
        await initialIncidents.promise;
        rerender(renderDesk());
      });
      const title = screen.getByRole("textbox", {
        name: "Tytuł incydentu",
      });
      expect(title).toHaveValue("Stary draft");

      await user.clear(title);
      await user.type(title, " x ");
      await user.click(
        screen.getByRole("button", { name: "Utwórz incydent" }),
      );
      expect(createIncident).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Tytuł musi mieć co najmniej 3 znaki.",
      );

      await user.clear(title);
      await user.type(title, "  Awaria eksportu  ");
      await user.click(
        screen.getByRole("button", { name: "Utwórz incydent" }),
      );
      expect(createIncident).toHaveBeenCalledWith("Awaria eksportu");
      expect(screen.getByRole("button", { name: "Tworzenie…" }))
        .toBeDisabled();
      expect(screen.getByText("Awaria eksportu (tworzenie…)"))
        .toBeInTheDocument();

      await act(async () => {
        operation.resolve({ id: "inc-2", title: "Awaria eksportu" });
        await operation.promise;
      });
      const list = screen.getByRole("list", { name: "Incydenty" });
      await waitFor(() => {
        expect(within(list).getAllByRole("listitem")).toHaveLength(2);
      });
      expect(within(list).getAllByRole("listitem")[0])
        .toHaveTextContent("Awaria eksportu");
      expect(within(list).getByText("Problem z logowaniem"))
        .toBeInTheDocument();
      expect(title).toHaveValue("");
      await waitFor(() => {
        expect(values.get("incident-draft")).toBe("");
      });

      const toast = screen.getByRole("status");
      expect(toast).toHaveTextContent("Utworzono incydent inc-2");
      expect(toastContainer).toContainElement(toast);
    } finally {
      toastContainer.remove();
    }
  });
});
