import type { Equal, Expect } from "@harness/type-assert";
import { createUser, type NewUser } from "./api";

// TODO: popraw oczekiwany typ wyniku.
type _return = Expect<Equal<ReturnType<typeof createUser>, string>>;
type _parameter = Expect<Equal<Parameters<typeof createUser>[0], NewUser>>;

// TODO: dodaj @ts-expect-error opisujący niedozwoloną rolę.
createUser({ name: "Ala", role: "owner" });
