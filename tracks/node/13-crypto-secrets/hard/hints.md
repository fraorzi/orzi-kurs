## Hint 1

`const derive = promisify(scrypt)` — wywołanie
`(await derive(secret, salt, 32)) as Buffer`.

## Hint 2

`verify` używa soli **z domknięcia** (albo sparsowanej z `encoded`) — nowa sól
w weryfikacji nigdy nie da tego samego klucza.

## Hint 3

Porównanie wyprowadzonych kluczy to `timingSafeEqual(key, candidateKey)` —
oba mają z definicji 32 bajty, więc warunek długości jest spełniony.
