export interface Store<State extends object> {
  get<K extends keyof State>(key: K): State[K];
  set<K extends keyof State>(key: K, value: State[K]): void;
  snapshot(): Readonly<State>;
}

export function createStore<State extends object>(
  initial: State,
): Store<State>;
