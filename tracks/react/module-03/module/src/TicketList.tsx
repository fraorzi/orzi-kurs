import type { Agent, Ticket, TicketStatus } from "./types";

export function TicketList({
  status,
  tickets,
  agents,
  onAssign,
}: {
  readonly status: TicketStatus;
  readonly tickets: readonly Ticket[];
  readonly agents: readonly Agent[];
  readonly onAssign: (ticket: Ticket, trigger: HTMLButtonElement) => void;
}) {
  return (
    <div
      id="ticket-panel"
      aria-label={status === "open" ? "Otwarte zgłoszenia" : "Rozwiązane zgłoszenia"}
    >
      <ul>
        {tickets.map((ticket, index) => (
          <li
            key={index}
            className="ticket-row"
            style={{ backgroundColor: ticket.priority === "urgent" ? "#fee2e2" : "#eff6ff" }}
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
                onClick={(event) => onAssign(ticket, event.currentTarget)}
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
