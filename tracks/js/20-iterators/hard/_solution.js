export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  push(value) {
    const node = { value, next: null };
    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }
    this.#tail = node;
    this.#size += 1;
    return this;
  }

  get size() {
    return this.#size;
  }

  [Symbol.iterator]() {
    let node = this.#head;
    return {
      next() {
        if (node === null) {
          return { value: undefined, done: true };
        }
        const value = node.value;
        node = node.next;
        return { value, done: false };
      },
    };
  }
}
