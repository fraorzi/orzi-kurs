import type { TicketStatus } from "./types";

export const ticketKeys = {
  all: ["tickets"] as const,
  list: (status: TicketStatus) => [
    ...ticketKeys.all,
    "list",
    { status },
  ] as const,
};
