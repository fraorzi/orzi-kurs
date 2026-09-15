export type TicketStatus = "open" | "resolved";
export type TicketPriority = "normal" | "urgent";

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  assigneeId: string | null;
}

export interface Agent {
  id: string;
  name: string;
}

export interface AssignmentInput {
  ticketId: string;
  agentId: string;
}

export type FetchTickets = (
  status: TicketStatus,
  signal: AbortSignal,
) => Promise<Ticket[]>;
