## Hint 1

Konto usługowe nie powinno móc delegować uprawnień dalej — `WITH GRANT
OPTION` ze starteru trzeba po prostu pominąć, nie "wyłączyć" osobną
instrukcją.

## Hint 2

Transport (`REQUIRE SSL`), limit połączeń (`WITH MAX_USER_CONNECTIONS 5`)
i wygasanie hasła (`PASSWORD EXPIRE INTERVAL 90 DAY`) to klauzule
`CREATE USER`, nie `GRANT` — wszystkie trzy mieszczą się w jednej
instrukcji tworzącej konto.

## Hint 3

Kształt: `CREATE USER ... REQUIRE SSL WITH MAX_USER_CONNECTIONS 5
PASSWORD EXPIRE INTERVAL 90 DAY;` osobno, potem `GRANT SELECT, INSERT,
UPDATE ON app_data.* TO ...` bez `WITH GRANT OPTION` i bez `ON *.*`.
