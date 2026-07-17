# NIO, selectory i kontrakt zdalny

## Grupa

TPO

## Kiedy

Gdy serwer rozproszony oddziela stan połączenia od selector loop, a zdalny kontrakt ma małe DTO.

## Pułapki

Operacja blokująca w selector thread zatrzymuje wszystkie kanały; zdalny wyjątek i częściowa awaria są normalnym wynikiem.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
