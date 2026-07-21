## Hint 1

`mkdtemp(join(tmpdir(), "prefiks-"))` — sufiks losowy dokleja system,
stąd unikalność katalogów.

## Hint 2

Kształt to try/finally: `try { return await run(directory); } finally
{ await rm(...); }` — bez `catch`, błąd ma lecieć dalej.

## Hint 3

`rm(directory, { recursive: true, force: true })` — recursive dla zawartości,
force żeby sprzątanie nie wybuchło przy nietypowych stanach.
