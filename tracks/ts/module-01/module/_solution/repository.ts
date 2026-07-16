import { ROLES } from "./types";
import type { Result, Role, User } from "./types";
import { parseNewUser, parsePatch } from "./validate";

export class UserRepository {
  #users = new Map<number, User>();
  #nextId = 1;

  constructor(private readonly now: () => string) {}

  get size(): number {
    return this.#users.size;
  }

  create(input: unknown): Result<User> {
    const parsed = parseNewUser(input);
    if (!parsed.ok) return parsed;

    const user: User = {
      id: this.#nextId,
      createdAt: this.now(),
      ...parsed.value,
    };
    this.#nextId += 1;
    this.#users.set(user.id, user);
    return { ok: true, value: user };
  }

  get(id: number): User | null {
    return this.#users.get(id) ?? null;
  }

  update(id: number, patch: unknown): Result<User> {
    const current = this.#users.get(id);
    if (current === undefined) {
      return { ok: false, error: [`nie ma użytkownika o id ${id}`] };
    }

    const parsed = parsePatch(patch);
    if (!parsed.ok) return parsed;

    const updated: User = { ...current, ...parsed.value };
    this.#users.set(id, updated);
    return { ok: true, value: updated };
  }

  remove(id: number): boolean {
    return this.#users.delete(id);
  }

  list(filter?: { role?: Role }): readonly User[] {
    const users = [...this.#users.values()].sort((a, b) => a.id - b.id);
    const role = filter?.role;
    return role === undefined ? users : users.filter((u) => u.role === role);
  }

  countByRole(): Record<Role, number> {
    const counts = {} as Record<Role, number>;
    for (const role of ROLES) {
      counts[role] = 0;
    }
    for (const user of this.#users.values()) {
      counts[user.role] += 1;
    }
    return counts;
  }
}
