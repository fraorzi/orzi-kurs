## Hint 1

Szkielet to jedna pętla: `for await (const chunk of chunks)` z zapisem
i warunkowym czekaniem.

## Hint 2

`if (!writable.write(chunk)) await once(writable, "drain")` — `once`
z `node:events` zwraca promise jednego zdarzenia.

## Hint 3

Jeżeli timeline w teście pokazuje `write:b` przed `drain`, twoja pętla nie
zatrzymała się po `false` — dokładnie to jest bug backpressure.
