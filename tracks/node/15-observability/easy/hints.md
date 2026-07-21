## Hint 1

Najpierw przygotuj `fields`: `Object.entries` → filtr `value !== undefined`
→ mapowanie redakcji → `Object.fromEntries`.

## Hint 2

Opcjonalny requestId doklej spreadem warunkowym:
`...(input.requestId ? { requestId: input.requestId } : {})`.

## Hint 3

Wynik to `JSON.stringify({...}) + "\n"` — nowa linia jest częścią kontraktu
NDJSON, testy jej pilnują.
