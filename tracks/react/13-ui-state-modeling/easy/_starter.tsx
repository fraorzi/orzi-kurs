export interface User {
  readonly id: string;
  readonly name: string;
}

export interface UserViewState {
  readonly status:
    "idle" | "pending" | "empty" | "success" | "error";
  readonly user?: User;
  readonly message?: string;
}

export function UserResult({
  state,
}: {
  state: UserViewState;
}) {
  if (state.status === "pending") {
    return <p>Ładowanie…</p>;
  }
  if (state.status === "success") {
    return <h1>{state.user?.name}</h1>;
  }
  if (state.status === "error") {
    return <p role="alert">{state.message}</p>;
  }
  return <p>Brak użytkownika.</p>;
}
