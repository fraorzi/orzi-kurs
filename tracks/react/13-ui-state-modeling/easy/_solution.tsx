export interface User {
  readonly id: string;
  readonly name: string;
}

export type UserViewState =
  | { readonly status: "idle" }
  | { readonly status: "pending" }
  | { readonly status: "empty" }
  | { readonly status: "success"; readonly user: User }
  | { readonly status: "error"; readonly message: string };

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
