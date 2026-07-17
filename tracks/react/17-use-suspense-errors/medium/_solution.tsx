import {
  Suspense,
  use,
} from "react";

export interface User {
  readonly name: string;
  readonly role: string;
}

function UserDetails({
  userPromise,
}: {
  readonly userPromise: Promise<User>;
}) {
  const user = use(userPromise);

  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
    </article>
  );
}

export function UserPanel({
  userPromise,
}: {
  readonly userPromise: Promise<User>;
}) {
  return (
    <Suspense fallback={<p role="status">Ładowanie użytkownika…</p>}>
      <UserDetails userPromise={userPromise} />
    </Suspense>
  );
}
