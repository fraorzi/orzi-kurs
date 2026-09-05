import type { CustomerSummary } from "../types";

export async function getCustomerSummary(
  id: string,
): Promise<CustomerSummary> {
  return {
    id,
    name: "Alicja",
    email: "alicja@example.com",
  };
}
