import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  UserRepository,
  parseNewUser,
  parsePatch,
  isRole,
  ROLES,
  type NewUser,
  type Role,
  type User,
  type UserPatch,
} from "./src/index";

const CLOCK = () => "2024-01-01T00:00:00.000Z";

const ALA = { name: "Ala", email: "ala@example.com", role: "admin" };
const OLA = { name: "Ola", email: "ola@example.com", role: "editor" };

function makeRepo(): UserRepository {
  return new UserRepository(CLOCK);
}

function created(repo: UserRepository, input: unknown): User {
  const result = repo.create(input);
  if (!result.ok) throw new Error(`create nieoczekiwanie oblało: ${result.error}`);
  return result.value;
}

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("ROLES jest readonly tuple, a Role unią z niej wyprowadzoną", () => {
    type _roles = Expect<
      Equal<typeof ROLES, readonly ["admin", "editor", "viewer"]>
    >;
    type _role = Expect<Equal<Role, "admin" | "editor" | "viewer">>;
    expect(ROLES).toEqual(["admin", "editor", "viewer"]);
  });

  it("NewUser to User bez id i createdAt", () => {
    type _t = Expect<
      Equal<NewUser, { readonly name: string; readonly email: string; readonly role: Role }>
    >;
    const draft: NewUser = { name: "Ala", email: "a@b.pl", role: "admin" };
    expect(draft.role).toBe("admin");
  });

  it("UserPatch ma wyłącznie opcjonalne name/email/role", () => {
    type _t = Expect<
      Equal<
        UserPatch,
        {
          readonly name?: string;
          readonly email?: string;
          readonly role?: Role;
        }
      >
    >;
    const patch: UserPatch = {};
    expect(patch).toEqual({});
  });

  it("Result jest unią rozłączną — value dostępne dopiero po sprawdzeniu ok", () => {
    const result = parseNewUser(ALA);
    const illegal = (): unknown =>
      // @ts-expect-error bez zawężenia po ok pole value nie istnieje na unii
      result.value;
    if (result.ok) {
      type _t = Expect<Equal<typeof result.value, NewUser>>;
    }
    expect(illegal).toBeTypeOf("function");
  });

  it("pola User są tylko do odczytu", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    const illegal = (): void => {
      // @ts-expect-error User ma pola readonly — zapis musi być błędem typu
      user.name = "Ola";
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("isRole jest strażnikiem typu (zawęża unknown do Role)", () => {
    const value: unknown = "editor";
    if (isRole(value)) {
      type _t = Expect<Equal<typeof value, Role>>;
      expect(value).toBe("editor");
    } else {
      throw new Error("isRole miało zawęzić 'editor' do Role");
    }
  });

  it("countByRole zwraca komplet ról", () => {
    const counts = makeRepo().countByRole();
    type _t = Expect<Equal<typeof counts, Record<Role, number>>>;
    expect(counts).toEqual({ admin: 0, editor: 0, viewer: 0 });
  });
});

describe("isRole", () => {
  it("przyjmuje role z ROLES", () => {
    expect(ROLES.every((role) => isRole(role))).toBe(true);
  });

  it("odrzuca tekst spoza listy i wartości nietekstowe", () => {
    expect([isRole("root"), isRole(1), isRole(null)]).toEqual([
      false,
      false,
      false,
    ]);
  });
});

describe("parseNewUser", () => {
  it("zwraca ok z wartością dla poprawnych danych", () => {
    const result = parseNewUser(ALA);
    expect(result).toEqual({ ok: true, value: ALA });
  });

  it("odrzuca dane, które nie są obiektem — jednym błędem", () => {
    expect(
      parseNewUser("Ala"),
      "gdy wejście nie jest obiektem, nie ma czego walidować pole po polu",
    ).toEqual({ ok: false, error: ["dane nie są obiektem"] });
  });

  it("odrzuca tablicę (tablica to nie rekord)", () => {
    expect(parseNewUser([])).toEqual({
      ok: false,
      error: ["dane nie są obiektem"],
    });
  });

  it("zbiera WSZYSTKIE błędy w kolejności pól", () => {
    expect(
      parseNewUser({ name: "", email: "ala", role: "root" }),
      "walidacja ma zebrać komplet błędów, a nie zatrzymać się na pierwszym",
    ).toEqual({
      ok: false,
      error: [
        "name musi być niepustym tekstem",
        "email musi zawierać @",
        "role musi być jedną z: admin, editor, viewer",
      ],
    });
  });

  it("odrzuca puste imię i brak @ w mailu", () => {
    expect(parseNewUser({ ...ALA, name: "" }).ok).toBe(false);
    expect(parseNewUser({ ...ALA, email: "ala.example.com" }).ok).toBe(false);
  });

  it("ignoruje nadmiarowe pola wejścia", () => {
    const result = parseNewUser({ ...ALA, admin: true });
    expect(
      result,
      "z unknown bierzemy tylko to, co znamy — nadmiarowe pola nie trafiają do wyniku",
    ).toEqual({ ok: true, value: ALA });
  });
});

describe("parsePatch", () => {
  it("pusty obiekt to poprawny pusty patch", () => {
    expect(parsePatch({})).toEqual({ ok: true, value: {} });
  });

  it("waliduje tylko obecne pola", () => {
    expect(parsePatch({ role: "viewer" })).toEqual({
      ok: true,
      value: { role: "viewer" },
    });
  });

  it("odrzuca obecne pole o złej wartości", () => {
    expect(parsePatch({ email: "ala" })).toEqual({
      ok: false,
      error: ["email musi zawierać @"],
    });
  });

  it("nie zgłasza błędu za pole, którego nie ma", () => {
    expect(
      parsePatch({ name: "Ola" }),
      "brak pola w patchu znaczy 'nie zmieniaj', a nie 'wartość niepoprawna'",
    ).toEqual({ ok: true, value: { name: "Ola" } });
  });
});

describe("UserRepository — create i get", () => {
  it("nadaje id od 1 w górę", () => {
    const repo = makeRepo();
    expect([created(repo, ALA).id, created(repo, OLA).id]).toEqual([1, 2]);
  });

  it("bierze createdAt ze wstrzykniętego zegara", () => {
    expect(created(makeRepo(), ALA).createdAt).toBe("2024-01-01T00:00:00.000Z");
  });

  it("zwraca błąd walidacji zamiast rzucać wyjątkiem", () => {
    expect(makeRepo().create({ name: "", email: "x", role: "root" })).toEqual({
      ok: false,
      error: [
        "name musi być niepustym tekstem",
        "email musi zawierać @",
        "role musi być jedną z: admin, editor, viewer",
      ],
    });
  });

  it("nie zapisuje użytkownika, gdy walidacja oblała", () => {
    const repo = makeRepo();
    repo.create({ name: "" });
    expect(repo.size).toBe(0);
  });

  it("get zwraca użytkownika po id, a dla nieznanego id null", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    expect(repo.get(user.id)).toEqual(user);
    expect(repo.get(99)).toBeNull();
  });
});

describe("UserRepository — update", () => {
  it("podmienia wskazane pola", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    const result = repo.update(user.id, { role: "viewer" });
    expect(result).toEqual({ ok: true, value: { ...user, role: "viewer" } });
  });

  it("zachowuje id i createdAt", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    const result = repo.update(user.id, { name: "Ola" });
    if (!result.ok) throw new Error("update oblało");
    expect([result.value.id, result.value.createdAt]).toEqual([
      user.id,
      user.createdAt,
    ]);
  });

  it("nie mutuje poprzedniego obiektu użytkownika", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    repo.update(user.id, { name: "Ola" });
    expect(
      user.name,
      "update ma tworzyć NOWY obiekt — stary musi zostać nietknięty",
    ).toBe("Ala");
  });

  it("nieznane id daje błąd z numerem id", () => {
    expect(makeRepo().update(7, { name: "Ola" })).toEqual({
      ok: false,
      error: ["nie ma użytkownika o id 7"],
    });
  });

  it("niepoprawny patch daje błąd walidacji i nie zmienia stanu", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    const result = repo.update(user.id, { email: "ala" });
    expect(result.ok).toBe(false);
    expect(repo.get(user.id)?.email).toBe("ala@example.com");
  });
});

describe("UserRepository — remove, list, countByRole, size", () => {
  it("remove zwraca true dla istniejącego i false dla nieznanego id", () => {
    const repo = makeRepo();
    const user = created(repo, ALA);
    expect([repo.remove(user.id), repo.remove(user.id)]).toEqual([true, false]);
  });

  it("id usuniętego użytkownika nie jest używane ponownie", () => {
    const repo = makeRepo();
    const first = created(repo, ALA);
    repo.remove(first.id);
    expect(
      created(repo, OLA).id,
      "licznik id rośnie monotonicznie — inaczej nowy użytkownik przejąłby tożsamość usuniętego",
    ).toBe(2);
  });

  it("list zwraca użytkowników posortowanych rosnąco po id", () => {
    const repo = makeRepo();
    created(repo, ALA);
    created(repo, OLA);
    expect(repo.list().map((u) => u.id)).toEqual([1, 2]);
  });

  it("list z filtrem zwraca tylko wskazaną rolę", () => {
    const repo = makeRepo();
    created(repo, ALA);
    created(repo, OLA);
    expect(repo.list({ role: "editor" }).map((u) => u.name)).toEqual(["Ola"]);
  });

  it("countByRole zwraca komplet ról, z zerami włącznie", () => {
    const repo = makeRepo();
    created(repo, ALA);
    expect(
      repo.countByRole(),
      "Record<Role, number> wymaga KAŻDEJ roli — role bez użytkowników mają 0",
    ).toEqual({ admin: 1, editor: 0, viewer: 0 });
  });

  it("size odzwierciedla liczbę użytkowników", () => {
    const repo = makeRepo();
    created(repo, ALA);
    created(repo, OLA);
    repo.remove(1);
    expect(repo.size).toBe(1);
  });

  it("stan jest prywatny w runtime (#users), nie tylko w typach", () => {
    const repo = makeRepo();
    created(repo, ALA);
    expect(
      Object.keys(repo),
      "pole z # nie pojawia się w Object.keys — private z TS owszem",
    ).not.toContain("users");
  });
});
