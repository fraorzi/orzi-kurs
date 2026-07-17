import { CustomerPanel } from "./CustomerPanel";
import { getCustomerSummary } from "./lib/customer-data";

export async function CustomerPage({ id }: { readonly id: string }) {
  const customer = await getCustomerSummary(id);
  return <CustomerPanel customer={customer} />;
}
