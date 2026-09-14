export interface User {
  id: string;
  name: string;
}

export type UserViewState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "empty" }
  | { status: "success"; user: User }
  | { status: "error"; message: string };

export function UserResult({
  state,
}: {
  state: UserViewState;
}) {
  switch (state.status) {
    case "idle":
      return <p>Wybierz użytkownika.</p>;
    case "pending":
      return <p role="status">Ładowanie…</p>;
    case "empty":
      return <p>Brak użytkownika.</p>;
    case "success":
      return <h1>{state.user.name}</h1>;
    case "error":
      return <p role="alert">{state.message}</p>;
  }
}
