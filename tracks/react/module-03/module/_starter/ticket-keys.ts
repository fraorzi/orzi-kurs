import type { TicketStatus } from "./types";

export const ticketKeys = {
  all: ["tickets"] as const,
  list: (_status: TicketStatus) =>
    ["tickets", "list"] as const,
};
