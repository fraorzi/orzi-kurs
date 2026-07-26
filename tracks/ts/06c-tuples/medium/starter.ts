export type CommandArguments = {
  createUser: [name: string, admin: boolean];
  deleteUser: [id: number];
  ping: [];
};

export type CommandName = keyof CommandArguments;

// TODO
export type AnyCommand = {
  name: CommandName;
  args: unknown[];
};

export function makeCommand<K extends CommandName>(
  name: K,
  ...args: CommandArguments[K]
): Extract<AnyCommand, { name: K }> {
  // TODO
  throw new Error("TODO");
}

export function executeCommand(command: AnyCommand): string {
  // TODO
  return "";
}
