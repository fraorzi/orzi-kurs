import type { Agent, Ticket, TicketStatus } from "./types";

export function TicketList({
  status,
  tickets,
  agents,
  onAssign,
}: {
  status: TicketStatus;
  tickets: Ticket[];
  agents: Agent[];
  onAssign: (
    ticket: Ticket,
    trigger: HTMLButtonElement,
  ) => void;
}) {
  const agentNamesById = new Map<string, string>();
  for (const agent of agents) {
    agentNamesById.set(agent.id, agent.name);
  }

  return (
    <div
      id="ticket-panel"
      aria-label={
        status === "open"
          ? "Otwarte zgłoszenia"
          : "Rozwiązane zgłoszenia"
      }
    >
      <ul>
        {tickets.map((ticket, index) => (
          <li
            key={index}
            className="ticket-row"
            style={{
              backgroundColor:
                ticket.priority === "urgent"
                  ? "#fee2e2"
                  : "#eff6ff",
            }}
          >
            <strong>{ticket.title}</strong>
            <span>
              {ticket.assigneeId
                ? `Przypisano: ${agentNamesById.get(ticket.assigneeId)}`
                : "Nieprzypisane"}
            </span>
            {status === "open" && (
              <button
                type="button"
                onClick={(event) =>
                  onAssign(ticket, event.currentTarget)
                }
              >
                Przypisz {ticket.title}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
