import type { Equal, Expect } from "@harness/type-assert";
import { createUser, type NewUser, type User } from "./api";

type _return = Expect<Equal<ReturnType<typeof createUser>, User>>;
type _parameter = Expect<Equal<Parameters<typeof createUser>[0], NewUser>>;

// @ts-expect-error rola owner nie należy do publicznego kontraktu
createUser({ name: "Ala", role: "owner" });
