import { createEmitter } from "./events.js";

export function createStore(initialState = {}) {
  let state = { ...initialState };
  const emitter = createEmitter();

  function setState(next, changedKey) {
    const prev = state;
    state = next;
    emitter.emit("change", state, prev, changedKey);
  }

  return {
    getState() {
      return state;
    },
    get(key) {
      return state[key];
    },
    set(key, value) {
      if (state[key] === value) return;
      setState({ ...state, [key]: value }, key);
    },
    update(key, updater) {
      const value = updater(state[key]);
      if (state[key] === value) return;
      setState({ ...state, [key]: value }, key);
    },
    subscribe(handler) {
      return emitter.on("change", handler);
    },
  };
}
