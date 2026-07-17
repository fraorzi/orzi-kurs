# Easy — rozdziel stdout i stderr

Zaimplementuj mapowanie wyniku komendy na kontrakt procesu:
`solve(result, json)`:

- sukces: wynik na **stdout** (JSON gdy `json === true`, inaczej
  `String(data)`), `stderr` pusty, `exitCode: 0`;
- błąd użycia (`kind: "usage"`): komunikat na **stderr**, `stdout` pusty,
  `exitCode: 2`;
- błąd wewnętrzny (`kind: "internal"`): jak wyżej, ale `exitCode: 1`;
- w trybie `json` błąd też jest JSON-em (`{ error, code }`);
- każdy niepusty strumień kończy się `\n`.
