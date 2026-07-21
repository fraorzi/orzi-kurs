## Hint 1

Fabryka to trzy linie: `new EventEmitter()`, `emitter.on("error", ...)`,
`return emitter`. Cała trudność siedzi w tym, **co** przekazujesz do report.

## Hint 2

Listener błędu ma sygnaturę `(error: Error) => report(error.message)` —
przekazanie całego obiektu oblewa test wycieku danych.

## Hint 3

Dlaczego to działa: emitter z co najmniej jednym listenerem `error` nie rzuca
przy emisji błędu, więc proces przeżywa awarie publikowane na kanale.
