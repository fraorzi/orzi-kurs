# Hard — wymuś deadline zamykania

Sprzątanie potrafi zawisnąć, a orkiestrator i tak zaraz przyśle SIGKILL.
Zaimplementuj `solve(cleanup, timeoutMs, force)`:

- gdy `cleanup` zakończy się przed upływem `timeoutMs` → zwróć `"clean"`,
  `force` nie może zostać wywołane;
- gdy deadline minie pierwszy → wywołaj `force()` i zwróć `"forced"`;
- timer deadline'u ma być `unref()` — watchdog nie może sam podtrzymywać
  procesu przy życiu — i posprzątany (`clearTimeout`) po rozstrzygnięciu.
