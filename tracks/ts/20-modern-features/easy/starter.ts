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
    void log;
    void context;
    return original;
  };
}
