import { describe, expect, it, vi } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  OperationsDashboard,
  type QueueTicket,
} from "./starter";

const tickets = [
  { id: "1", status: "open", title: "Awaria płatności" },
  { id: "2", status: "closed", title: "Zmiana adresu" },
] satisfies QueueTicket[];

function queueBuilder() {
  return vi.fn(
    (
      source: readonly QueueTicket[],
      filter: "all" | "open" | "closed",
    ) =>
      filter === "all"
        ? source
        : source.filter(
            (ticket) => ticket.status === filter,
          ),
  );
}

describe("OperationsDashboard", () => {
  it("zachowuje filtrowanie i stan notatki", async () => {
    const buildQueue = queueBuilder();
    const { user } = renderWithUser(
      <OperationsDashboard
        tickets={tickets}
        buildQueue={buildQueue}
      />,
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Notatka operatora",
      }),
      "Skontaktować z klientem",
    );
    expect(
      screen.getByRole("textbox", {
        name: "Notatka operatora",
      }),
    ).toHaveValue("Skontaktować z klientem");

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Status" }),
      "closed",
    );
    expect(
      screen.getByText("Zmiana adresu"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Awaria płatności"),
    ).not.toBeInTheDocument();
  });

  it("[quality] nie powtarza pracy dla niezmienionych danych", async () => {
    const buildQueue = queueBuilder();
    const queueRenders = createRenderCounter();
    const { rerender, user } = renderWithUser(
      <OperationsDashboard
        tickets={tickets}
        buildQueue={buildQueue}
        onQueueRender={queueRenders.onRender}
      />,
    );
    queueRenders.reset();

    await user.type(
      screen.getByRole("textbox", {
        name: "Notatka operatora",
      }),
      "pilne",
    );
    rerender(
      <OperationsDashboard
        tickets={tickets}
        buildQueue={buildQueue}
        onQueueRender={queueRenders.onRender}
      />,
    );

    expect(buildQueue).toHaveBeenCalledTimes(1);
    expect(queueRenders.commits).toBe(0);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Status" }),
      "open",
    );
    expect(buildQueue).toHaveBeenCalledTimes(2);
    expect(queueRenders.commits).toBe(1);
  });
});
