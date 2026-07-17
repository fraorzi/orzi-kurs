# Easy — iteruj po liniach z chunków

Chunki streamu nie respektują granic linii. Zaimplementuj async generator
`solve(chunks)`:

- z `AsyncIterable<string>` yielduj **pełne linie** bez znaku `\n`;
- linia przecięta między chunkami ma wyjść w całości; kilka linii w jednym
  chunku — jako osobne yieldy;
- końcówkę `\r` (CRLF) utnij;
- po wyczerpaniu chunków wydaj ostatnią linię, nawet jeśli nie kończy się
  znakiem nowej linii; pustej końcówki nie wydawaj.
