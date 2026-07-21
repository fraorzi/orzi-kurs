# Track MySQL — wymagana lokalna baza

Zadania tego tracka wykonują prawdziwy SQL na MySQL **8.4 LTS**. Harness
tworzy dla każdego testu izolowaną bazę (`orzi_<pid>_<uuid>`) i kasuje ją po
teście — Twoje dane są bezpieczne, ale serwer musi działać.

## Setup (macOS / Homebrew)

```sh
brew install mysql@8.4
```

Wariant A — usługa w tle (najprostszy):

```sh
brew services start mysql@8.4
export ORZI_MYSQL_URL="mysql://root@127.0.0.1:3306"
```

Wariant B — jednorazowa instancja w katalogu tymczasowym (nic nie zostaje
w systemie):

```sh
DATA=/tmp/orzi-mysql-data
/opt/homebrew/opt/mysql@8.4/bin/mysqld --initialize-insecure --datadir="$DATA"
/opt/homebrew/opt/mysql@8.4/bin/mysqld --datadir="$DATA" --port=33061 \
  --bind-address=127.0.0.1 --socket=/tmp/orzi_mysql.sock &
export ORZI_MYSQL_URL="mysql://root@127.0.0.1:33061"
```

Uwaga: ścieżka socketa musi być krótka (limit ~100 znaków).

## Weryfikacja

```sh
ORZI_MYSQL_URL=... pnpm submit mysql/01-query-basics-null/easy
ORZI_MYSQL_URL=... pnpm verify:solutions mysql   # wzorce, 68/68
```

Bez ustawionego `ORZI_MYSQL_URL`/`MYSQL_URL` testy tracka mysql zgłaszają
czytelny błąd i nie dotykają żadnej bazy.

## Dlaczego 8.4, skoro Homebrew ma nowszy MySQL

Track celuje w 8.4 LTS (wsparcie do 2032) — to wersja, którą spotkasz w
produkcji. Podstawy są zgodne z nowszymi wydaniami; materiał wersjozależny
(np. domyślne sql_mode, Cache'e planów) wskazuje wersję w README tematu.
