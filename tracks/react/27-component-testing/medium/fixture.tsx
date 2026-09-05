import { type FormEvent, useState } from "react";

export function UserSearch({
  searchUsers,
}: {
  searchUsers: (
    query: string,
  ) => Promise<readonly string[]>;
}) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "pending" }
    | { status: "success"; users: readonly string[] }
    | { status: "error" }
  >({ status: "idle" });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setState({ status: "pending" });

    try {
      setState({
        status: "success",
        users: await searchUsers(query),
      });
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Użytkownik
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <button type="submit">Szukaj</button>
      {state.status === "pending" && (
        <p role="status">Wyszukiwanie…</p>
      )}
      {state.status === "error" && (
        <p role="alert">Nie udało się wyszukać</p>
      )}
      {state.status === "success" && (
        <ul aria-label="Wyniki">
          {state.users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
