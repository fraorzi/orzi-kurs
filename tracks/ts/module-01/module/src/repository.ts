import type { Result, Role, User } from "./types";

export class UserRepository {
  // TODO: prywatny w runtime stan (#users: Map<number, User>) + licznik id
  users = new Map<number, User>();

  constructor(private readonly now: () => string) {}

  get size(): number {
    // TODO
    return 0;
  }

  create(input: unknown): Result<User> {
    // TODO: parseNewUser → id z licznika → createdAt z this.now()
    return { ok: false, error: [] };
  }

  get(id: number): User | null {
    // TODO
    return null;
  }

  update(id: number, patch: unknown): Result<User> {
    // TODO: parsePatch; brak użytkownika → ["nie ma użytkownika o id 7"]; bez mutacji
    return { ok: false, error: [] };
  }

  remove(id: number): boolean {
    // TODO
    return false;
  }

  list(filter?: { role?: Role }): readonly User[] {
    // TODO: sortowanie rosnąco po id; opcjonalny filtr po roli
    return [];
  }

  countByRole(): Record<Role, number> {
    // TODO: komplet ról, zera włącznie
    return {};
  }
}
