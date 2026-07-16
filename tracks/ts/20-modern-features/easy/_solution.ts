export function traced(log: (message: string) => void) {
  return function <
    This,
    Args extends unknown[],
    Result,
  >(
    original: (this: This, ...args: Args) => Result,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Result
    >,
  ): (this: This, ...args: Args) => Result {
    const name = String(context.name);
    return function (this: This, ...args: Args): Result {
      log(`enter:${name}`);
      try {
        return original.call(this, ...args);
      } finally {
        log(`exit:${name}`);
      }
    };
  };
}
