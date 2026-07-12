# Obsługa błędów (try/catch/finally, throw, custom errors)

Błąd w trakcie działania to nie koniec programu — JS pozwala **przechwycić** wyjątek,
zareagować i działać dalej. Narzędzia: `throw` (zgłoś błąd), `try/catch` (przechwyć),
`finally` (posprzątaj zawsze), oraz własne klasy błędów dziedziczące po `Error`.

## try / catch

`try` opakowuje kod, który może rzucić. Gdy rzuci — sterowanie przeskakuje do `catch`
z obiektem błędu; reszta `try` się nie wykona:

```js
try {
  const user = JSON.parse(str); // rzuca SyntaxError przy złym JSON-ie
  return user;
} catch (err) {
  console.log(err.name);    // "SyntaxError"
  console.log(err.message); // opis, np. "Unexpected token ..."
  return null;              // reagujemy zamiast się wywalić
}
```

`try/catch` działa **synchronicznie**. Nie złapie błędu rzuconego później, np. w
`setTimeout` — bo `try` już się wtedy zakończył. Kod asynchroniczny łapie się przez
`try/catch` wokół `await` (patrz zagadnienie async).

## throw i obiekt Error

Rzucać można cokolwiek, ale **rzucaj obiekty `Error`** — mają `name`, `message` i `stack`:

```js
function getAge(user) {
  if (user.age === undefined) {
    throw new Error("brak pola: age");
  }
  return user.age;
}
```

`throw` natychmiast kończy funkcję i „wyrzuca" błąd w górę stosu, aż trafi na `catch`.

## finally

Blok `finally` wykona się **zawsze** — po udanym `try`, po `catch`, a nawet gdy w `try`
jest `return` albo niezłapany `throw`. Służy do sprzątania (zamknięcie pliku, zwolnienie
zasobu):

```js
function withResource(fn, close) {
  try {
    return fn();     // nawet jeśli tu jest return...
  } finally {
    close();         // ...to close() i tak się wykona przed oddaniem wartości
  }
}
```

Pułapka: `return` w `finally` **nadpisuje** `return`/`throw` z `try`. Prawie zawsze błąd.

## Własne klasy błędów

Dziedzicz po `Error`, żeby rozróżniać rodzaje błędów przez `instanceof` (odporne na
refaktor, w przeciwieństwie do porównywania `err.message`):

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // "ValidationError", nie "Error"
  }
}

const e = new ValidationError("złe dane");
e instanceof ValidationError; // true
e instanceof Error;           // true — łańcuch dziedziczenia
```

Hierarchia (jak w javascript.info): baza `ValidationError`, liść
`PropertyRequiredError extends ValidationError` z dodatkowym polem `property`.

## Zawijanie błędów i `cause`

Kod niskiego poziomu rzuca techniczne błędy (`SyntaxError`, `ValidationError`).
Funkcja wyższego poziomu łapie je i rzuca **jeden** błąd abstrakcyjny (`ReadError`),
zachowując oryginał w `cause` (ES2022) — dzięki temu wywołujący ma prosty kontrakt,
a przyczyna nie ginie:

```js
class ReadError extends Error {
  constructor(message, cause) {
    super(message, { cause }); // drugi argument z cause
    this.name = "ReadError";
  }
}

try {
  JSON.parse(badJson);
} catch (err) {
  throw new ReadError("nie udało się wczytać", err); // err trafia do .cause
}
```

## Rethrow (przerzucanie)

W `catch` obsłuż tylko błędy, które znasz — resztę **rzuć dalej**, żeby nieoczekiwane
problemy nie ginęły po cichu:

```js
try {
  return JSON.parse(str);
} catch (err) {
  if (err instanceof SyntaxError) return null; // to obsługujemy
  throw err;                                    // to nie nasze — przerzuć
}
```

## Kiedy używać

- Parsowanie danych z zewnątrz (JSON, wejście użytkownika) — `try/catch`.
- Walidacja: rzuć `ValidationError` z opisowym `message`, złap wyżej.
- Sprzątanie zasobów niezależnie od wyniku — `finally`.
- Rozróżnianie rodzajów błędów — własne klasy + `instanceof`.
- Budowanie warstw: zawijaj niskopoziomowe błędy w `cause`.

## Kiedy unikać

- Nie używaj wyjątków do **normalnego** przepływu sterowania (np. „element nie znaleziony"
  → zwróć `null`/`undefined`, nie rzucaj).
- Nie łap błędu, którego nie umiesz obsłużyć — lepiej niech propaguje.
- Nie opakowuj `try/catch` wokół całych modułów „na wszelki wypadek" — maskuje bugi.

## Pułapki

- **Puste `catch`** (`catch {}`) — połyka błąd, program działa dalej w złym stanie.
  Najgorszy antywzorzec. Zawsze zaloguj albo przerzuć.
- **`return` w `finally`** nadpisuje wynik z `try` (i połyka rzucony błąd).
- `try/catch` **nie łapie** błędów asynchronicznych spoza `await` (np. w `setTimeout`).
- Rzucanie stringów/liczb zamiast `Error` — tracisz `stack` i `name`.
- Zapomniany `this.name` w custom errorze → `err.name === "Error"`, mylące logi.
- Sprawdzanie `err.message === "..."` zamiast `instanceof` — kruche przy zmianie tekstu.
