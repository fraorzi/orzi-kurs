# Testowalność kodu Node

Deterministyczny test to konsekwencja projektu kodu, nie sprytu w teście.
Trzy techniki z tego tematu wracają w każdej usłudze:

**Wstrzykiwanie granic niedeterminizmu.** Czas, losowość, sieć i zegar to
zależności. Funkcja przyjmująca `now: () => number` testuje TTL bez
`sleep` i bez fake timers — test po prostu podaje kolejne wartości czasu.
Reguła: im bliżej granicy systemu, tym bardziej parametr; logika w środku
zostaje czysta.

**Izolowane fixture'y.** Testy dotykające dysku dostają katalog z `mkdtemp`
(unikalny per test), a sprzątanie w `finally` gwarantuje czystość także po
wyjątku. Wzorzec `withTempDir(run)` — zasób otwierany, przekazywany
callbackowi, zamykany zawsze — to ten sam kształt co `withInitialArtifact`
w harnessie tego repo.

**Port 0 dla serwerów.** `listen(0)` prosi system o wolny port efemeryczny —
testy nie kolidują między sobą ani z niczym na maszynie. Prawdziwy adres
czytasz po nasłuchu z `server.address()`. Zamknięcie serwera w `finally`
jest częścią kontraktu — wiszący serwer to wyciek, który wysypuje dopiero
CI po setce testów.

## Kiedy używać

- TTL, backoff, harmonogramy — wszędzie tam wstrzykuj zegar.
- Testy integracyjne z dyskiem i siecią — fixture + port 0.
- Własne helpery `withX(run)` dla każdego zasobu wymagającego sprzątania.

## Kiedy unikać

- Nie mockuj tego, co możesz wstrzyknąć — mock globalnego `Date.now` działa,
  ale ukrywa zależność zamiast ją pokazać.
- Nie hardkoduj portów ani ścieżek `/tmp/test` — to kolizje i flaki.
- Nie testuj przez `sleep(50)` "bo zwykle zdąży" — to definicja flaka.

## Pułapki

- Cleanup bez `finally` nie wykonuje się po wyjątku — a właśnie testy
  z błędami najbardziej potrzebują sprzątania.
- `server.address()` przed `listen` zwraca `null`; po — obiekt albo string
  (unix socket); zawęź typ zanim sięgniesz po `port`.
- `rm(dir, { recursive: true, force: true })` — bez `force` sprzątanie
  wybucha, gdy katalog już zniknął.
- TTL "równo na granicy": ustal w kontrakcie, czy `now === expiresAt` to
  jeszcze cache, czy już odświeżenie — i przetestuj dokładnie granicę.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Test runner](https://nodejs.org/download/release/latest-v24.x/docs/api/test.html)
- [net.Server.listen](https://nodejs.org/download/release/latest-v24.x/docs/api/net.html#serverlisten)
- [fs.mkdtemp](https://nodejs.org/download/release/latest-v24.x/docs/api/fs.html#fspromisesmkdtempprefix-options)
