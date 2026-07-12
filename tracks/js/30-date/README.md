# Date i czas

`Date` reprezentuje moment w czasie jako liczbę **milisekund od 1 stycznia 1970 UTC**
(timestamp). Na tej liczbie opiera się cała arytmetyka dat. Uwaga: `Date` jest
**mutowalny**, a metody bez `UTC` działają w strefie lokalnej — źródło wielu bugów.

## Tworzenie i timestamp

```js
new Date();                       // teraz
new Date(2020, 0, 1);             // 1 stycznia 2020, czas LOKALNY (miesiące od 0!)
new Date(Date.UTC(2020, 0, 1));   // 1 stycznia 2020 UTC
new Date("2020-01-01T00:00:00Z"); // z ISO stringa
date.getTime();                   // ms od epoki (do arytmetyki)
```

Miesiące są indeksowane od **0** (styczeń = 0, grudzień = 11) — klasyczna pułapka.

## Arytmetyka przez timestamp

Różnice i przesunięcia licz na milisekundach:

```js
const DAY = 24 * 60 * 60 * 1000;
const later = new Date(date.getTime() + 5 * DAY); // +5 dni
const days = (b.getTime() - a.getTime()) / DAY;   // ile dni między a i b
```

To odporne na strefy, bo `getTime` zawsze zwraca UTC. (Dla precyzyjnych operacji
kalendarzowych z DST używa się bibliotek jak `date-fns`/`Temporal`.)

## Lokalne vs UTC

Każdy getter ma wariant UTC: `getHours`/`getUTCHours`, `getDay`/`getUTCDay` (dzień
tygodnia, 0 = niedziela). W testach i przy zapisie danych preferuj UTC — wynik nie zależy
wtedy od strefy maszyny.

```js
date.toISOString();          // "2020-01-01T00:00:00.000Z" (zawsze UTC)
date.toISOString().slice(0, 10); // "2020-01-01" (sama data)
```

## Date jest mutowalny

Settery **zmieniają** obiekt w miejscu — to pułapka przy współdzieleniu:

```js
const d = new Date(2020, 0, 1);
d.setDate(d.getDate() + 1); // MUTUJE d
```

Dla niemutowalności twórz nowy `Date` z przeliczonego timestampu, zamiast używać setterów
na współdzielonym obiekcie.

## Formatowanie względne (Intl.RelativeTimeFormat)

Do „2 dni temu" / „za 3 godziny" służy `Intl.RelativeTimeFormat`. Podajesz **wartość
i jednostkę**, on daje zlokalizowany tekst:

```js
new Intl.RelativeTimeFormat("pl", { numeric: "auto" }).format(-2, "day"); // "2 dni temu"
new Intl.RelativeTimeFormat("pl", { numeric: "auto" }).format(3, "hour"); // "za 3 godziny"
```

Trudna część to **wybór jednostki** (sekundy? minuty? dni?) na podstawie różnicy czasu —
to policzysz sam, a formatowanie zostawisz `Intl`.

## Kiedy używać

- Timestampy i różnice → `getTime()` i arytmetyka na ms.
- Zapis/porównania niezależne od strefy → metody i konstrukcja UTC (`Date.UTC`, `toISOString`).
- Formatowanie dla użytkownika → `Intl.DateTimeFormat` / `Intl.RelativeTimeFormat`.

## Kiedy unikać

- Ręczne operacje kalendarzowe z DST/strefami (dodaj miesiąc, „ten sam czas lokalny") →
  biblioteka (`date-fns`, `Luxon`) albo nadchodzące `Temporal`.
- Parsowanie dowolnych formatów stringiem — `new Date("13/01/2020")` bywa zależne od
  przeglądarki; trzymaj się ISO.

## Pułapki

- **Miesiące od 0** — `new Date(2020, 1, 1)` to **luty**, nie styczeń.
- **Date mutowalny** — settery zmieniają obiekt; nie współdziel bez kopii.
- Metody lokalne zależą od strefy maszyny — testy używające `getHours`/`getDay` bywają
  flaky; używaj wariantów UTC.
- `new Date("2020-01-01")` parsuje jako UTC, ale `new Date("2020-01-01T00:00")` (bez `Z`)
  jako lokalny — subtelna różnica.
- Odejmowanie `Date - Date` działa (daje ms), ale `Date + Date` konkatenuje stringi.
