import {
  type FormEvent,
  useState,
} from "react";

export interface Customer {
  readonly id: string;
  readonly name: string;
}

export function CustomerSearch({
  initialCustomers,
  searchCustomers,
}: {
  readonly initialCustomers: readonly Customer[];
  readonly searchCustomers: (
    query: string,
  ) => Promise<readonly Customer[]>;
}) {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCustomers(await searchCustomers(query));
  }

  return (
    <section aria-label="Wyszukiwarka klientów">
      <form onSubmit={handleSubmit}>
        <label>
          Szukaj klientów
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="submit">Szukaj</button>
      </form>

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </section>
  );
}

