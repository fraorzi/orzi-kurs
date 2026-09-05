import {
  type FormEvent,
  useState,
  useTransition,
} from "react";

export interface Customer {
  readonly id: string;
  readonly name: string;
}

export function CustomerSearch({
  initialCustomers,
  searchCustomers,
}: {
  initialCustomers: readonly Customer[];
  searchCustomers: (
    query: string,
  ) => Promise<readonly Customer[]>;
}) {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState(
    initialCustomers,
  );
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuery = query;

    startTransition(async () => {
      const nextCustomers =
        await searchCustomers(submittedQuery);
      startTransition(() => setCustomers(nextCustomers));
    });
  }

  return (
    <section aria-label="Wyszukiwarka klientów">
      <form onSubmit={handleSubmit}>
        <label>
          Szukaj klientów
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </label>
        <button type="submit">Szukaj</button>
      </form>

      {isPending && <p role="status">Wyszukiwanie…</p>}

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </section>
  );
}
