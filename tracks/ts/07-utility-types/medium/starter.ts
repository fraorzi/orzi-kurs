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

// TODO
export type FindUserArgs = unknown;

// TODO
export type FindUserResult = unknown;

// TODO
export type FoundUser = unknown;

export async function findUserOrThrow(
  // TODO
  id: number,
  withPosts: boolean,
): Promise<FoundUser> {
  // TODO
  throw new Error("TODO");
}

export type AppEvent =
  | { kind: "click"; x: number; y: number }
  | { kind: "key"; key: string }
  | { kind: "scroll"; top: number }
  | { kind: "close" };

// TODO
export type ClickEvent = unknown;

// TODO
export type ActiveEvent = unknown;

// TODO
export type EventKind = unknown;

export function isActive(event: AppEvent): boolean {
  // TODO
  return false;
}

export function describeActive(event: AppEvent): string {
  // TODO
  return "";
}

export function filterByKind(
  events: readonly AppEvent[],
  kind: string,
): AppEvent[] {
  // TODO
  return [];
}
