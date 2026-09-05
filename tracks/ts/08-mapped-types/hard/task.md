# Hard - rekurencyjne mapped types: DeepReadonly i DeepPartial

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Mapped type może wołać sam siebie. Tak powstają „głębokie” warianty typów - i tak samo
powstają pułapki, o których trzeba wiedzieć.

## 1. `DeepReadonly<T>`

Rekurencyjnie `readonly` - na każdym poziomie zagnieżdżenia.

```ts
interface Settings {
  theme: { color: string; density: { rows: number } };
  tags: string[];
  version: number;
}

type Frozen = DeepReadonly<Settings>;
// {
//   readonly theme: { readonly color: string; readonly density: { readonly rows: number } };
//   readonly tags: readonly string[];
//   readonly version: number;
// }
```

Tablica sama zamienia się w `readonly string[]` - mapped type homomorficzny (czyli taki
z `[K in keyof T]`) przechodzi przez tablice i zachowuje ich kształt.

## 2. `deepFreeze<T>(value: T): DeepReadonly<T>`

Runtime'owy odpowiednik: `Object.freeze` **rekurencyjnie**, w głąb obiektów i tablic.

```ts
const frozen = deepFreeze({ theme: { color: "iris" } });
Object.isFrozen(frozen.theme);  // true
frozen.theme.color = "red";     // błąd typu; w runtime po prostu nie zadziała
```

## 3. `DeepPartial<T>` - i jej pułapka

```ts
type Patch = DeepPartial<Settings>;
// theme?: { color?: string; density?: { rows?: number } }
// version?: number
// tags?: (string | undefined)[]    ← UWAGA
```

Na tablicy `DeepPartial` robi opcjonalne **elementy**, nie samą tablicę - bo pole `?` nakłada
się na każdy indeks. Tak działa homomorficzne mapowanie i tak też ma być w tym zadaniu
(test to sprawdza). Naprawienie tego wymaga typów warunkowych - zagadnienie 09.

## 4. `deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T`

Scala patch z bazą **bez mutacji** żadnego z nich.

```ts
const base = { theme: { color: "iris", density: { rows: 3 } }, version: 1 };

deepMerge(base, { theme: { color: "amber" } });
// { theme: { color: "amber", density: { rows: 3 } }, version: 1 }
```

Zasady scalania:

- obiekt w patchu **scala się** z obiektem w bazie (rekurencyjnie),
- wartość prymitywna nadpisuje,
- **tablica nadpisuje w całości** (nie scala się element po elemencie),
- pole o wartości `undefined` w patchu jest ignorowane (zostaje wartość z bazy),
- `null` w patchu jest **wartością** i nadpisuje.
