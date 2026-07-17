import type {
  Equal,
  Expect,
  NotAny,
} from "@harness/type-assert";
import { createClient } from "./client";

const client = createClient({
  getUser: (input: { id: number }) => ({
    id: input.id,
    name: "Ala",
  }),
  health: (_input: null) => "ok" as const,
});

const user = client.call("getUser", { id: 7 });
type _user = Expect<Equal<typeof user, { id: number; name: string }>>;
type _notAny = Expect<NotAny<typeof user>>;

const health = client.call("health", null);
type _health = Expect<Equal<typeof health, "ok">>;

// @ts-expect-error id musi być number
client.call("getUser", { id: "7" });

// @ts-expect-error nieznana trasa
client.call("deleteUser", { id: 7 });
