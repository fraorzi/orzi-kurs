export function createClient(
  handlers: Record<string, (input: never) => unknown>,
) {
  return {
    // TODO: zachowaj mapę handlerów, klucz, input i wynik.
    call(route: string, input: unknown): unknown {
      return handlers[route](input as never);
    },
  };
}
