export interface User {
  id: string;
  name: string;
}

export interface UserViewState {
  status:
    "idle" | "pending" | "empty" | "success" | "error";
  user?: User;
  message?: string;
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
