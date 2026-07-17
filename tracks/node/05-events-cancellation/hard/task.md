# Zbuduj bezpieczny kanał zdarzeń

Fabryka emitera ma zawsze mieć listener `error`, logować Error bez sekretów i pozwalać subskrybentom na cleanup.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
