import { useFormStatus } from "react-dom";

function OrderControls() {
  const { pending } = useFormStatus();

  return (
    <>
      <label htmlFor="order-product">Produkt</label>
      <select id="order-product" name="product">
        <option>Klawiatura</option>
        <option>Monitor</option>
      </select>
      <button type="submit" disabled={pending}>
        {pending ? "Zamawianie…" : "Zamów"}
      </button>
      {pending && <p role="status">Zamawianie…</p>}
    </>
  );
}

export function OrderForm({
  placeOrder,
}: {
  placeOrder: (product: string) => Promise<void>;
}) {
  async function orderAction(formData: FormData) {
    await placeOrder(String(formData.get("product") ?? ""));
  }

  return (
    <form action={orderAction}>
      <OrderControls />
    </form>
  );
}
