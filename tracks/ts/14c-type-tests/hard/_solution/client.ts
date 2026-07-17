type HandlerMap = Record<string, (input: never) => unknown>;

export function createClient<Handlers extends HandlerMap>(
  handlers: Handlers,
): {
  call<K extends keyof Handlers>(
    route: K,
    input: Parameters<Handlers[K]>[0],
  ): ReturnType<Handlers[K]>;
} {
  return {
    call<K extends keyof Handlers>(
      route: K,
      input: Parameters<Handlers[K]>[0],
    ): ReturnType<Handlers[K]> {
      const handler = handlers[route] as (
        value: Parameters<Handlers[K]>[0],
      ) => ReturnType<Handlers[K]>;
      return handler(input);
    },
  };
}
