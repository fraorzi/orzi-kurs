export type CommandArguments = {
  createUser: [name: string, admin: boolean];
  deleteUser: [id: number];
  ping: [];
};

export type CommandName = keyof CommandArguments;
export type AnyCommand = {
  [K in CommandName]: { name: K; args: CommandArguments[K] };
}[CommandName];

export function makeCommand<K extends CommandName>(
  name: K,
  ...args: CommandArguments[K]
): Extract<AnyCommand, { name: K }> {
  return { name, args } as Extract<AnyCommand, { name: K }>;
}

export function executeCommand(command: AnyCommand): string {
  switch (command.name) {
    case "createUser": {
      const [name, admin] = command.args;
      return `create:${name}:${admin ? "admin" : "user"}`;
    }
    case "deleteUser": {
      const [id] = command.args;
      return `delete:${id}`;
    }
    case "ping":
      return "pong";
  }
}
