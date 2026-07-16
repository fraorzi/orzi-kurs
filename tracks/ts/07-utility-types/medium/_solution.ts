export interface Post {
  id: number;
  title: string;
}

export interface UserRecord {
  id: number;
  name: string;
  email: string | null;
  posts: Post[];
}

const DB: readonly UserRecord[] = [
  {
    id: 1,
    name: "Ala",
    email: "ala@example.com",
    posts: [{ id: 10, title: "Wstęp" }],
  },
  { id: 2, name: "Bob", email: null, posts: [] },
];

// Gotowa funkcja — nie zmieniaj jej sygnatury ani ciała.
export async function findUser(
  id: number,
  withPosts: boolean,
): Promise<UserRecord | null> {
  const found = DB.find((user) => user.id === id);
  if (found === undefined) return null;
  return withPosts ? found : { ...found, posts: [] };
}

export type FindUserArgs = Parameters<typeof findUser>;

export type FindUserResult = Awaited<ReturnType<typeof findUser>>;

export type FoundUser = NonNullable<FindUserResult>;

export async function findUserOrThrow(
  ...args: FindUserArgs
): Promise<FoundUser> {
  const user = await findUser(...args);
  if (user === null) {
    throw new Error(`nie znaleziono użytkownika: ${args[0]}`);
  }
  return user;
}

export type AppEvent =
  | { kind: "click"; x: number; y: number }
  | { kind: "key"; key: string }
  | { kind: "scroll"; top: number }
  | { kind: "close" };

export type ClickEvent = Extract<AppEvent, { kind: "click" }>;

export type ActiveEvent = Exclude<AppEvent, { kind: "close" }>;

export type EventKind = AppEvent["kind"];

export function isActive(event: AppEvent): event is ActiveEvent {
  return event.kind !== "close";
}

export function describeActive(event: ActiveEvent): string {
  switch (event.kind) {
    case "click":
      return `click ${event.x},${event.y}`;
    case "key":
      return `key ${event.key}`;
    case "scroll":
      return `scroll ${event.top}`;
  }
}

export function filterByKind<K extends EventKind>(
  events: readonly AppEvent[],
  kind: K,
): Extract<AppEvent, { kind: K }>[] {
  return events.filter(
    (event): event is Extract<AppEvent, { kind: K }> => event.kind === kind,
  );
}
