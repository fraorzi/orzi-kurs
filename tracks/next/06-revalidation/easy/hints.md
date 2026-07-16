## Hint 1

Najpierw obsłuż target `path`, bo nie zależy od źródła ani trybu świeżości.

## Hint 2

Dla targetu `tag` rozgałęź `freshness`, a dopiero dla `immediate` sprawdź `origin`.

## Hint 3

Argument natychmiastowej rewalidacji z Route Handlera to obiekt `{ expire: 0 }`,
nie string `"max"`.
