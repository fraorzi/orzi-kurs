# Hard - skomponuj middleware w poprawnej kolejności

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Strapi wykonuje middleware jako stos onion: każdy wpis owija kolejny,
robi coś **przed** `next()` i coś **po** nim, w odwrotnej kolejności.
Zaimplementuj `solve(middlewares, handler)`, który zwraca gotowy do
wywołania runner złożony z listy `Middleware`.

Wymagania:

- dla `[a, b]` i `handler` kolejność wywołań to: `before-a`, `before-b`,
  `handler`, `after-b`, `after-a` - dokładnie onion, nie kolejka;
- pusta lista middleware ma po prostu wywołać `handler` bez żadnego
  opakowania;
- middleware, który **nie wywołuje** `next()` (świadomy short-circuit,
  np. odrzucenie żądania), musi przerwać cały dalszy łańcuch - żaden
  kolejny middleware ani `handler`, ani „after” wcześniejszych warstw
  nie mogą się wykonać;
- błąd rzucony przez `handler` albo przez dowolny middleware ma
  propagować się na zewnątrz `solve(...)()` - bez łykania go i bez
  wykonania „after” warstw, które jeszcze czekały na `next()`.
