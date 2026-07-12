# Liczby i precyzja

W JS jest **jeden** typ liczbowy: `number` — 64-bitowy float (IEEE-754). To wygodne, ale
ma konsekwencje: część ułamków dziesiętnych nie ma dokładnej reprezentacji binarnej,
więc arytmetyka bywa „prawie dokładna".

## Słynny przykład

```js
0.1 + 0.2;            // 0.30000000000000004
0.1 + 0.2 === 0.3;    // false !
```

`0.1` i `0.2` nie mają skończonego zapisu binarnego (jak `1/3` dziesiętnie). Dlatego liczb
zmiennoprzecinkowych **nie porównuj przez `===`** — porównuj z tolerancją.

## Porównanie z tolerancją

```js
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true
```

`Number.EPSILON` (~2.2e-16) to najmniejsza różnica wokół `1`. Dla większych liczb tolerancja
powinna skalować się z ich wielkością; w praktyce często używa się stałej typu `1e-9`.

## toFixed zwraca STRING

```js
(3.14159).toFixed(2); // "3.14"  — to string, nie number!
Number((3.14159).toFixed(2)); // 3.14
```

Do zaokrąglenia z zachowaniem typu liczbowego: `Math.round(x * 100) / 100`
(albo `Number(x.toFixed(2))`).

## isInteger / isNaN / isFinite — wersje z Number

Globalne `isNaN`/`isFinite` **konwertują** argument (`isNaN("abc") === true`, bo `"abc"`→`NaN`).
Wersje `Number.isNaN`/`Number.isFinite`/`Number.isInteger` **nie konwertują** — są bezpieczne:

```js
Number.isInteger(5);    // true
Number.isInteger(5.5);  // false
Number.isInteger("5");  // false — brak konwersji
Number.isNaN("abc");    // false (to string, nie NaN)
```

## parseInt / parseFloat vs Number

- `Number("12px")` → `NaN` (całość musi być liczbą),
- `parseInt("12px")` → `12` (czyta z początku, ile się da),
- `parseInt("0xFF", 16)` — drugi argument to **podstawa** (zawsze ją podawaj!),
- `parseFloat("3.14abc")` → `3.14`.

## Bezpieczne całkowite i pieniądze

Liczby całkowite są dokładne tylko do `Number.MAX_SAFE_INTEGER` (2⁵³−1). Powyżej — `BigInt`.
Pieniądze **trzymaj w groszach jako liczby całkowite** — `19.99 zł` → `1999`. Unikasz
dryfu zmiennoprzecinkowego przy dodawaniu kwot.

## Kiedy używać czego

- Zaokrąglanie do wyświetlenia → `toFixed` (string) albo `Math.round(x*10**n)/10**n` (number).
- Porównania float → tolerancja, nigdy `===`.
- Sprawdzanie „czy to liczba całkowita/NaN" → warianty `Number.*` (bez konwersji).
- Kwoty pieniężne → liczby całkowite (grosze), nie floaty.

## Pułapki

- **`0.1 + 0.2 !== 0.3`** — nigdy nie porównuj floatów przez `===`.
- **`toFixed` zwraca string** — `(0.1).toFixed(2) + 1` → `"0.101"` (konkatenacja!).
- Globalny `isNaN(x)` konwertuje — użyj `Number.isNaN`.
- `parseInt` bez podstawy bywa zwodniczy — podawaj `parseInt(s, 10)`.
- Sumowanie kwot jako floatów kumuluje błąd — licz w groszach.
- `Math.max()` bez argumentów → `-Infinity`, `Math.min()` → `Infinity`.
