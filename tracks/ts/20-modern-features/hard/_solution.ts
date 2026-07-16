type DisposeCallback = () => void;

class PortableDisposableStack implements DisposableStack {
  #callbacks: DisposeCallback[] = [];
  #disposed = false;

  get disposed(): boolean {
    return this.#disposed;
  }

  get [Symbol.toStringTag](): string {
    return "DisposableStack";
  }

  #assertActive(): void {
    if (this.#disposed) throw new ReferenceError("DisposableStack is disposed");
  }

  use<Value extends Disposable | null | undefined>(value: Value): Value {
    this.#assertActive();
    if (value !== null && value !== undefined) {
      this.#callbacks.push(() => value[Symbol.dispose]());
    }
    return value;
  }

  adopt<Value>(value: Value, onDispose: (value: Value) => void): Value {
    this.#assertActive();
    this.#callbacks.push(() => onDispose(value));
    return value;
  }

  defer(onDispose: () => void): void {
    this.#assertActive();
    this.#callbacks.push(onDispose);
  }

  move(): DisposableStack {
    this.#assertActive();
    const moved = new PortableDisposableStack();
    moved.#callbacks = this.#callbacks;
    this.#callbacks = [];
    this.#disposed = true;
    return moved;
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    let failure: unknown;
    while (this.#callbacks.length > 0) {
      try {
        this.#callbacks.pop()?.();
      } catch (error) {
        failure ??= error;
      }
    }
    if (failure !== undefined) throw failure;
  }

  [Symbol.dispose](): void {
    this.dispose();
  }
}

export function createDisposableStack(): DisposableStack {
  return typeof globalThis.DisposableStack === "function"
    ? new globalThis.DisposableStack()
    : new PortableDisposableStack();
}
