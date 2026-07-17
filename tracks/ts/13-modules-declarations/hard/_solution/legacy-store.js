export function createStore(initial) {
  const state = { ...initial };
  return {
    get(key) {
      return state[key];
    },
    set(key, value) {
      state[key] = value;
    },
    snapshot() {
      return Object.freeze({ ...state });
    },
  };
}
