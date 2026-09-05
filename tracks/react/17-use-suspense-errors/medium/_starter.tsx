import { Suspense } from "react";

export interface User {
  readonly name: string;
  readonly role: string;
}

function UserDetails() {
  return (
    <article>
      <h2>Nieznany użytkownik</h2>
      <p>Brak roli</p>
    </article>
  );
}

export function UserPanel({
  userPromise: _userPromise,
}: {
  userPromise: Promise<User>;
}) {
  return (
    <Suspense
      fallback={<p role="status">Ładowanie użytkownika…</p>}
    >
      <UserDetails />
    </Suspense>
  );
}
