export function solve(): {
  enter(): () => void;
  active(): number;
  drain(signal: AbortSignal): Promise<void>;
} {
  let active = 0;
  const waiters = new Set<() => void>();
  const flush = () => {
    if (active === 0) {
      for (const waiter of waiters) waiter();
      waiters.clear();
    }
  };
  return {
    enter() {
      active++;
      let left = false;
      return () => {
        if (left) return;
        left = true;
        active--;
        flush();
      };
    },
    active: () => active,
    drain(signal) {
      if (active === 0) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const done = () => {
          signal.removeEventListener("abort", aborted);
          resolve();
        };
        const aborted = () => {
          waiters.delete(done);
          reject(signal.reason);
        };
        waiters.add(done);
        signal.addEventListener("abort", aborted, { once: true });
      });
    },
  };
}
