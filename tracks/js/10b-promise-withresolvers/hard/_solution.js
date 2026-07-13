export function createQueue() {
  const values = [];
  const pullers = [];

  return {
    push(value) {
      if (pullers.length > 0) {
        pullers.shift()(value);
      } else {
        values.push(value);
      }
    },
    pull() {
      if (values.length > 0) {
        return Promise.resolve(values.shift());
      }
      const { promise, resolve } = Promise.withResolvers();
      pullers.push(resolve);
      return promise;
    },
  };
}
