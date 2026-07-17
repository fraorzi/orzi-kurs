import { readFileSync } from "node:fs";
import { join } from "node:path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import {
  OperationsConsole,
  type AssignmentInput,
  type FetchTickets,
  type Ticket,
} from "./src";

function createTestClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
}

function deferred<T>() {
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((_resolve, rejectPromise) => {
    reject = rejectPromise;
  });
  return { promise, reject };
}

const agents = [
  { id: "ola", name: "Agentka Ola" },
  { id: "jan", name: "Agent Jan" },
] as const;

describe("OperationsConsole", () => {
  it("obsługuje filtry klawiaturą i cache'uje każdą listę osobno", async () => {
    const fetchTickets = vi.fn<FetchTickets>(async (status, signal) => {
      expect(signal).toBeInstanceOf(AbortSignal);
      return status === "open"
        ? [{ id: "open-1", title: "Eksport", status, priority: "urgent", assigneeId: null }]
        : [{ id: "done-1", title: "Logowanie", status, priority: "normal", assigneeId: "jan" }];
    });
    const { user } = renderWithUser(
      <QueryClientProvider client={createTestClient()}>
        <OperationsConsole
          agents={agents}
          fetchTickets={fetchTickets}
          assignTicket={vi.fn()}
        />
      </QueryClientProvider>,
    );
    expect(await screen.findByText("Eksport")).toBeInTheDocument();

    const openTab = screen.getByRole("tab", { name: "Otwarte" });
    openTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Rozwiązane" })).toHaveFocus();
    expect(await screen.findByText("Logowanie")).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");
    expect(openTab).toHaveFocus();
    expect(await screen.findByText("Eksport")).toBeInTheDocument();
    expect(fetchTickets.mock.calls.map(([status]) => status))
      .toEqual(["open", "resolved"]);
  });

  it("przypisuje optymistycznie, przywraca snapshot i fokus po błędzie", async () => {
    const operation = deferred<void>();
    const fetchTickets = vi.fn<FetchTickets>(async (): Promise<readonly Ticket[]> => [{
      id: "open-1",
      title: "Eksport",
      status: "open",
      priority: "urgent",
      assigneeId: null,
    }]);
    const assignTicket = vi.fn((_input: AssignmentInput) => operation.promise);
    const { user } = renderWithUser(
      <QueryClientProvider client={createTestClient()}>
        <OperationsConsole
          agents={agents}
          fetchTickets={fetchTickets}
          assignTicket={assignTicket}
        />
      </QueryClientProvider>,
    );
    const trigger = await screen.findByRole("button", { name: "Przypisz Eksport" });
    await user.click(trigger);

    const agent = screen.getByRole("combobox", { name: "Agent" });
    expect(screen.getByRole("dialog", { name: "Przypisz Eksport" }))
      .toBeInTheDocument();
    expect(agent).toHaveFocus();
    await user.selectOptions(agent, "jan");
    await user.click(screen.getByRole("button", { name: "Zapisz przypisanie" }));

    await waitFor(() => expect(screen.getByText("Przypisano: Agent Jan"))
      .toBeInTheDocument());
    expect(assignTicket.mock.calls[0]?.[0]).toEqual({
      ticketId: "open-1",
      agentId: "jan",
    });
    expect(trigger).toHaveFocus();

    await act(async () => {
      operation.reject(new Error("Conflict"));
      await Promise.resolve();
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Nie udało się przypisać zgłoszenia.",
    );
    expect(await screen.findByText("Nieprzypisane")).toBeInTheDocument();
  });

  it("utrzymuje stabilne identity i przekazuje priorytet jako token CSS", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/react/module-03/module/src/TicketList.tsx"),
      "utf8",
    );

    expect(source).toContain("key={ticket.id}");
    expect(source).toContain('"--priority-accent"');
    expect(source).not.toContain("backgroundColor");
  });
});
