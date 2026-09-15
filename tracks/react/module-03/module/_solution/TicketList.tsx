import type { CSSProperties } from "react";
import type { Agent, Ticket, TicketStatus } from "./types";

type TicketRowStyle = CSSProperties & {
  "--priority-accent": string;
};

function ticketRowStyle(priority: Ticket["priority"]): TicketRowStyle {
  return {
    "--priority-accent": priority === "urgent" ? "#dc2626" : "#2563eb",
  };
}

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
      role="tabpanel"
      aria-labelledby={`ticket-tab-${status}`}
    >
      <ul
        aria-label={
          status === "open"
            ? "Otwarte zgłoszenia"
            : "Rozwiązane zgłoszenia"
        }
      >
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="ticket-row"
            style={ticketRowStyle(ticket.priority)}
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
