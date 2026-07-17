import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  readonly agents: readonly Agent[];
  readonly fetchTickets: FetchTickets;
  readonly assignTicket: (input: AssignmentInput) => Promise<void>;
}) {
  const [status, setStatus] = useState<TicketStatus>("open");
  const [dialog, setDialog] = useState<{
    readonly ticket: Ticket;
    readonly trigger: HTMLButtonElement;
  } | null>(null);
  const queryKey = ticketKeys.list(status);
  const tickets = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchTickets(status, signal),
    staleTime: 60_000,
  });
  const assignment = useMutation({
    mutationFn: assignTicket,
    onMutate: async (input, context) => {
      await context.client.cancelQueries({ queryKey });
      const previousTickets = context.client.getQueryData<readonly Ticket[]>(queryKey);
      context.client.setQueryData<readonly Ticket[]>(queryKey, (current) =>
        current?.map((ticket) => ticket.id === input.ticketId
          ? { ...ticket, assigneeId: input.agentId }
          : ticket),
      );
      return { previousTickets, queryKey };
    },
    onError: (_error, _input, result, context) => {
      if (result?.previousTickets) {
        context.client.setQueryData(result.queryKey, result.previousTickets);
      }
    },
    onSettled: (_data, _error, _input, _result, context) =>
      context.client.invalidateQueries({ queryKey: ticketKeys.all }),
  });

  return (
    <section aria-label="Konsola operacyjna">
      <h1>Kolejka zgłoszeń</h1>
      <TicketTabs value={status} onChange={setStatus} />
      {tickets.isPending && <p role="status">Ładowanie zgłoszeń…</p>}
      {tickets.isError && <p role="alert">Nie udało się pobrać zgłoszeń.</p>}
      {tickets.data && (
        <TicketList
          status={status}
          tickets={tickets.data}
          agents={agents}
          onAssign={(ticket, trigger) => setDialog({ ticket, trigger })}
        />
      )}
      {assignment.isError && <p role="alert">Nie udało się przypisać zgłoszenia.</p>}
      {dialog && (
        <AssignDialog
          ticket={dialog.ticket}
          agents={agents}
          trigger={dialog.trigger}
          onClose={() => setDialog(null)}
          onAssign={(agentId) => {
            assignment.mutate({ ticketId: dialog.ticket.id, agentId });
            setDialog(null);
          }}
        />
      )}
    </section>
  );
}
