# Hard - izoluj stan testu integracyjnego

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Testy integracyjne przez prawdziwy HTTP dzielą zasoby (magazyn w
pamięci, port serwera) między przypadkami - bez jawnej izolacji dane z
jednego testu przeciekają do następnego. Zaimplementuj `solve(setup,
run, cleanup)`:

- wykonaj `setup()`, potem `run()`, potem zawsze `cleanup()` -
  niezależnie od tego, czy `run()` rzuci;
- gdy `run()` rzuci, `cleanup()` **musi** się mimo to wykonać (posprząta
  stan przed kolejnym testem), a błąd `run()` ma polecieć dalej po
  zakończeniu `cleanup()`;
- gdy **zarówno** `run()`, jak i `cleanup()` rzucą, `solve` rzuca błąd z
  `run()` - to on jest przyczyną, błąd sprzątania nie może go przykryć;
- gdy `setup()` rzuci, `run()` i `cleanup()` w ogóle się nie wykonują -
  nie ma czego testować ani sprzątać po nieudanym przygotowaniu stanu.
