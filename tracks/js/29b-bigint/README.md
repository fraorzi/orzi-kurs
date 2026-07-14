# BigInt — liczby całkowite dowolnej wielkości

`number` to IEEE-754 double — całkowite reprezentuje **dokładnie** tylko do
`Number.MAX_SAFE_INTEGER` (2⁵³−1 = `9007199254740991`). Powyżej gubi precyzję:

```js
9007199254740993 === 9007199254740992; // true (!) — obie to ta sama liczba double
```

`BigInt` (ES2020) to osobny typ dla całkowitych **bez limitu wielkości** — dla id, kwot
(w groszach), liczników, kryptografii, wszędzie gdzie „dokładnie" > „szybko".

```js
9007199254740993n + 1n; // 9007199254740994n — dokładnie
typeof 10n;             // "bigint"
```

## Tworzenie

- Literał z sufiksem `n`: `10n`, `0xffn`.
- Konwersja: `BigInt(123)`, `BigInt("123")`. **`BigInt(1.5)` rzuca `RangeError`**
  (tylko całkowite), `BigInt("1.5")`/`BigInt("abc")` → `SyntaxError`.

## Zakaz mieszania z `number`

Arytmetyka **nie** miesza `bigint` i `number` — dostaniesz `TypeError`:

```js
1n + 1; // ❌ TypeError: Cannot mix BigInt and other types, use explicit conversions
1n + BigInt(1); // ✅ 2n   — najpierw skonwertuj
Number(2n) + 1; // ✅ 3    — albo w drugą stronę (uwaga na precyzję)
```

Za to **porównania** mieszają się swobodnie:

```js
1n == 1;  // true  (luźne — porównuje wartość)
1n === 1; // false (ścisłe — różne typy)
2n > 1;   // true
```

## Czego brakuje

- **Dzielenie obcina** do całkowitych: `5n / 2n === 2n` (nie `2.5`). Reszta: `5n % 2n === 1n`.
- **`Math.*` nie działa** z BigInt (`Math.max(1n, 2n)` rzuca). Brak ułamków, `NaN`, `Infinity`.
- **`JSON.stringify(1n)` rzuca `TypeError`** — BigInt nie ma reprezentacji w JSON. Serializuj
  jako string (`toJSON`/replacer: `value.toString()`).

## Kiedy używać

- Identyfikatory i liczby > 2⁵³ (id z baz, Twitter/Discord snowflake, liczniki).
- Kwoty pieniężne w najmniejszej jednostce (grosze/centy) — dokładność bez błędów floata.
- Kryptografia, kombinatoryka (silnie, duże potęgi), gdzie liczby rosną bez ograniczeń.

## Kiedy unikać

- Zwykłe obliczenia mieszczące się w bezpiecznym zakresie — `number` jest szybszy i wygodny
  (masz `Math`, ułamki).
- Wartości ułamkowe — BigInt jest wyłącznie całkowity.
- Gorące pętle numeryczne — BigInt bywa wolniejszy niż `number`.

## Pułapki

- **Mieszanie typów w arytmetyce → `TypeError`.** Konwertuj jawnie (`BigInt(x)` / `Number(x)`).
- `Number(bigIntPozaZakresem)` **traci precyzję po cichu** — konwersja w dół jest stratna.
- `JSON.stringify` na BigInt **rzuca** — pamiętaj o serializacji do stringa.
- Dzielenie obcina — jeśli potrzebujesz reszty/ułamka, BigInt to zła struktura.
- `BigInt(1.5)` rzuca — konwertuj tylko wartości całkowite.
