## Hint 1

`Store<State>` ma metody generyczne `K extends keyof State`.

## Hint 2

Typ wartości to indexed access `State[K]`.

## Hint 3

`createStore<State extends object>(initial: State): Store<State>` zachowuje cały
kontrakt. `createSettings` może po prostu zwrócić wynik tego wywołania.
