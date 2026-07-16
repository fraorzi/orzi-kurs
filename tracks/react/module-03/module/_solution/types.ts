export type TicketStatus = "open" | "resolved";
export type TicketPriority = "normal" | "urgent";

export interface Ticket {
  readonly id: string;
  readonly title: string;
  readonly status: TicketStatus;
  readonly priority: TicketPriority;
  readonly assigneeId: string | null;
}

export interface Agent {
  readonly id: string;
  readonly name: string;
}

export interface AssignmentInput {
  readonly ticketId: string;
  readonly agentId: string;
}

export type FetchTickets = (
  status: TicketStatus,
  signal: AbortSignal,
) => Promise<readonly Ticket[]>;
