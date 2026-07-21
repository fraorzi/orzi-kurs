# Przekrojowy security gate

## Kontekst

Endpoint przyjmuje token, payload i licznik prób i musi wydać jedną
decyzję dostępu, zanim jakikolwiek kosztowny handler zobaczy żądanie.
Realny incydent zaczyna się rzadko od jednej dużej dziury — częściej to
trzy niezależne, małe zaniedbania na styku warstw: pomylone authn z authz,
brak ochrony przed brute force i log, który po cichu zapisuje to, co miał
chronić. Projekt łączy te trzy warstwy (tożsamość, autoryzacja, telemetria)
w jednej funkcji decyzyjnej — dokładnie tam, gdzie w produkcyjnym kodzie
zwykle się mieszają.

## Decyzje

- **Authn i authz to osobne sprawdzenia, oba wymagane.** `Boolean(token)`
  odpowiada tylko "czy to ktoś", nie "czy wolno mu to zrobić" — `allowed`
  wymaga jednocześnie tokenu i roli `"editor"`.
- **Odmowa jest domyślna.** Brak jawnego dopasowania (brak tokenu, zła
  rola, przekroczony limit) nigdy nie kończy się `allowed: true` — kod nie
  ma "otwartej" gałęzi na wypadek nieprzewidzianego stanu.
- **Rate limit ma najwyższy priorytet w wyniku.** Sprawdzany jest przed
  authz, więc nawet poprawnie uwierzytelniony i uprawniony editor dostaje
  `429`, gdy przekroczył budżet prób — limiter chroni handler, nie tylko
  nieautoryzowanych.
- **Log to nowy obiekt z allow-listą, nie kopia wejścia.** `{ ...input }`
  jest wygodne i zdradliwe: kopiuje też pola, które nigdy nie powinny
  trafić do logu. Allow-lista (`requestId`, `role`, `outcome`) eliminuje tę
  klasę błędu strukturalnie, nie przez pamiętanie o redakcji.

## Pułapki

- `{ ...input }` w logu przechodzi każdy test, który nie sprawdza treści
  loga wprost — sekret wycieka po cichu, bez błędu, bez ostrzeżenia lintera.
- Zagnieżdżony ternary (`limited ? 429 : allowed ? 200 : ...`) koduje ten
  sam priorytet co łańcuch `if`, ale `sonarjs/no-nested-conditional`
  słusznie go odrzuca — czytelność priorytetu ma znaczenie tam, gdzie
  kolejność decyduje o bezpieczeństwie.
- Sprawdzanie roli dopiero po zwróceniu `200` dla samego tokenu to typowy
  "authn zamiast authz" — działa dla happy path, myli testera, bo pierwszy
  test z poprawną rolą i tak przechodzi.
- Rate limit liczony po autoryzacji zamiast przed nią wciąż pozwala
  nieautoryzowanym próbom obciążać system aż do odmowy — limiter powinien
  być tani i wczesny.

## Źródła (audyt 2026-07-20)

- [OWASP ASVS — Authentication i Access Control](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Logging Cheat Sheet — czego nie logować](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [SonarSource: no-nested-conditional](https://sonarsource.github.io/rspec/#/rspec/S3358)
