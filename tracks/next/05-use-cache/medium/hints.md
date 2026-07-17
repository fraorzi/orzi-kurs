## Hint 1

`ProfilePage` odczytuje `(await cookies()).get("session")?.value` przed wejściem do
cached component.

## Hint 2

`CachedProfile` przyjmuje wyłącznie `{ sessionId: string }`, więc wartość staje się
serializowalną częścią klucza.

## Hint 3

Dyrektywę i `cacheLife("minutes")` umieść wewnątrz `CachedProfile`, nie w stronie.
