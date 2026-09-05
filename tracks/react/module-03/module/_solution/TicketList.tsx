import type { CSSProperties } from "react";
import type { Agent, Ticket, TicketStatus } from "./types";

type TicketRowStyle = CSSProperties & {
  "--priority-accent": string;
};

export function TicketList({
  status,
  tickets,
  agents,
  onAssign,
}: {
  status: TicketStatus;
  tickets: readonly Ticket[];
  agents: readonly Agent[];
  onAssign: (
    ticket: Ticket,
    trigger: HTMLButtonElement,
  ) => void;
}) {
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
            style={
              {
                "--priority-accent":
                  ticket.priority === "urgent"
                    ? "#dc2626"
                    : "#2563eb",
              } as TicketRowStyle
            }
          >
            <strong>{ticket.title}</strong>
            <span>
              {ticket.assigneeId
                ? `Przypisano: ${agents.find((agent) => agent.id === ticket.assigneeId)?.name}`
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
