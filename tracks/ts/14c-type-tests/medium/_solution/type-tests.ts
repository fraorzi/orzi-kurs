import type { Equal, Expect } from "@harness/type-assert";
import { keyBy } from "./key-by";

type User = { id: number; email: string };
declare const users: readonly User[];

const byId = keyBy(users, (user) => user.id);
type _byId = Expect<Equal<typeof byId, Map<number, User>>>;

// @ts-expect-error boolean nie jest PropertyKey
keyBy(users, (user) => user.email.length > 0);
