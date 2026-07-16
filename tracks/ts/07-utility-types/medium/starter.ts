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

// TODO: krotka argumentów findUser — Parameters.
export type FindUserArgs = unknown;

// TODO: wynik findUser po zdjęciu Promise — ReturnType + Awaited.
export type FindUserResult = unknown;

// TODO: FindUserResult bez null — NonNullable.
export type FoundUser = unknown;

export async function findUserOrThrow(
  // TODO: rest-parametr o typie FindUserArgs
  id: number,
  withPosts: boolean,
): Promise<FoundUser> {
  // TODO: brak użytkownika → Error(`nie znaleziono użytkownika: ${id}`)
  throw new Error("TODO");
}

export type AppEvent =
  | { kind: "click"; x: number; y: number }
  | { kind: "key"; key: string }
  | { kind: "scroll"; top: number }
  | { kind: "close" };

// TODO: wariant "click" wyciągnięty z unii — Extract.
export type ClickEvent = unknown;

// TODO: wszystkie warianty poza "close" — Exclude.
export type ActiveEvent = unknown;

// TODO: unia nazw zdarzeń — indeksowany dostęp AppEvent["kind"].
export type EventKind = unknown;

export function isActive(event: AppEvent): boolean {
  // TODO: predykat typu — event is ActiveEvent
  return false;
}

export function describeActive(event: AppEvent): string {
  // TODO: parametr ma być typu ActiveEvent; switch bez default
  return "";
}

export function filterByKind(
  events: readonly AppEvent[],
  kind: string,
): AppEvent[] {
  // TODO: generyk K extends EventKind, wynik Extract<AppEvent, { kind: K }>[]
  return [];
}
