import { useState } from "react";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AssignDialog } from "./AssignDialog";
import { TicketList } from "./TicketList";
import { TicketTabs } from "./TicketTabs";
import { ticketKeys } from "./ticket-keys";
import type {
  Agent,
  AssignmentInput,
  FetchTickets,
  Ticket,
  TicketStatus,
} from "./types";

export function OperationsConsole({
  agents,
  fetchTickets,
  assignTicket,
}: {
  agents: readonly Agent[];
  fetchTickets: FetchTickets;
  assignTicket: (input: AssignmentInput) => Promise<void>;
}) {
  const [status, setStatus] =
    useState<TicketStatus>("open");
  const [dialog, setDialog] = useState<{
    ticket: Ticket;
    trigger: HTMLButtonElement;
  } | null>(null);
  const tickets = useQuery({
    queryKey: ticketKeys.list(status),
    queryFn: ({ signal }) => fetchTickets(status, signal),
  });
  const assignment = useMutation({
    mutationFn: assignTicket,
  });

  return (
    <section aria-label="Konsola operacyjna">
      <h1>Kolejka zgłoszeń</h1>
      <TicketTabs value={status} onChange={setStatus} />
      {tickets.isPending && (
        <p role="status">Ładowanie zgłoszeń…</p>
      )}
      {tickets.isError && (
        <p role="alert">Nie udało się pobrać zgłoszeń.</p>
      )}
      {tickets.data && (
        <TicketList
          status={status}
          tickets={tickets.data}
          agents={agents}
          onAssign={(ticket, trigger) =>
            setDialog({ ticket, trigger })
          }
        />
      )}
      {assignment.isError && (
        <p role="alert">
          Nie udało się przypisać zgłoszenia.
        </p>
      )}
      {dialog && (
        <AssignDialog
          ticket={dialog.ticket}
          agents={agents}
          trigger={dialog.trigger}
          onClose={() => setDialog(null)}
          onAssign={(agentId) => {
            assignment.mutate({
              ticketId: dialog.ticket.id,
              agentId,
            });
            setDialog(null);
          }}
        />
      )}
    </section>
  );
}
