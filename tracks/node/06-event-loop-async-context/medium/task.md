# Ogranicz starvation

Kolejkuj maksymalnie `budget` zadań przez microtask, a kolejne przenieś na `setImmediate`.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
