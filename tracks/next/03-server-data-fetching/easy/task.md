# Zbuduj bezpieczny loader produktów

`loadProducts` ufa statusowi HTTP i wynikowi `json()`. Uzupełnij loader tak, aby:

- odrzucał odpowiedź z `ok === false` i podawał status w komunikacie,
- traktował JSON jako `unknown`,
- akceptował wyłącznie tablicę produktów z niepustym `id`, niepustym `name` oraz
  skończoną, nieujemną ceną,
- zwracał nowe obiekty zgodne z `Product`.

Nie używaj rzutowania wyniku sieciowego na `Product[]`.
