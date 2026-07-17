## Hint 1

Sklonuj `request.headers` i przekaż je w opcji `{ request: { headers } }` do `NextResponse.rewrite`.
## Hint 2

`request.nextUrl.clone()` zachowa query; zmień tylko `pathname`, a potem ustaw cookie na odpowiedzi.
