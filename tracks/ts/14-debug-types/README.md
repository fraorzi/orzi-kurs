# Debugowanie problemów typów

Najgroźniejsze błędy TypeScript nie zawsze wyglądają jak czerwone podkreślenie.
Często kod „przechodzi”, bo wcześniej utracono informację przez `any`, zbyt szeroki
generyk albo assertion.

## `any`-zatrucie

`any` przepływa przez odczyty i wywołania:

```ts
const data: any = sdk.read();
data.user.profile.name.toUpperCase(); // kompilator przestaje pomagać
```

Na granicy przypisz wynik do `unknown` i zawężaj. Jedno `any` w deklaracji zewnętrznej
nie musi zatruwać reszty modułu.

## Kłamliwy generyk

Ta funkcja obiecuje coś, czego nie może udowodnić:

```ts
function parse<T>(json: string): T {
  return JSON.parse(json);
}
```

Parametr typu wybiera wywołujący; `parse<User>` nie waliduje JSON-a. Poprawne API
przyjmuje parser lub schemat, który naprawdę tworzy `T`.

## Assertions

`value as User` zmienia wyłącznie opinię kompilatora. Dobry debugging pyta:

1. skąd przyszła wartość,
2. w którym miejscu typ stał się zbyt szeroki lub `any`,
3. jaki warunek runtime uzasadnia zawężenie,
4. czy assertion jest lokalną granicą implementacyjną, czy maskuje brak walidacji.

## Czytanie diagnostyki

Zacznij od pierwszego miejsca utraty kontraktu, nie od ostatniej linii błędu.
Rozwiń alias pomocniczy, zapisz typ pośredni, sprawdź `keyof`, `ReturnType` albo
`satisfies`. Minimalny przykład często ujawnia, że problem leży w sygnaturze API.

## Kiedy używać

- przy integracji SDK i JSON-a,
- podczas review generycznych helperów,
- gdy kod wymaga wielu `as` lub `!`.

## Kiedy unikać

- zamiany `any` na assertion do docelowego typu,
- dodawania parametru `<T>` tylko po to, by wywołujący wskazał oczekiwany wynik,
- naprawiania symptomów bez znalezienia pierwszego źródła utraty typu.

## Pułapki

- `JSON.parse` ma historycznie wynik `any`,
- `as unknown as T` bywa potrzebne we wnętrzu helpera, ale nie waliduje danych,
- `!` może ukryć pustą tablicę lub brak rekordu,
- zbyt szeroki return type może zniszczyć poprawną inferencję implementacji.

Źródła: TypeScript Handbook — The Basics, Unknown i Generics.
