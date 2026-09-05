# Easy - ograniczenia i domyślne parametry typu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Uzupełnij `starter.ts`.

## 1. `longest`

Generyczna funkcja zwraca dłuższy z argumentów. Przy remisie - pierwszy. Typ ma odrzucać
wartości, dla których nie można odczytać długości, i zachowywać typ argumentów w wyniku.

```ts
longest("kot", "pies");       // "pies"   (typ: string)
longest([1, 2], [1, 2, 3]);   // [1,2,3]  (typ: number[])
longest("aa", "bb");          // "aa"     (remis → pierwszy)
longest(10, 100);             // błąd typu: number nie ma pola length
```

## 2. `getProp`

Odczyt pola z obiektu. Nieistniejący klucz ma być błędem typu, a typ wyniku ma być
**typem wybranego pola**, nie unią wszystkich.

```ts
const user = { name: "Ala", age: 30 };
getProp(user, "name");  // "Ala"  (typ: string, nie string | number)
getProp(user, "wiek");  // błąd typu: nie ma takiego klucza
```

## 3. `ApiResponse`

Typ odpowiedzi. Domyślnie ciało jest puste (`null`).

```ts
type Empty = ApiResponse;              // { status: number; body: null }
type Users = ApiResponse<string[]>;    // { status: number; body: string[] }
```

## 4. `ok` i `noContent`

```ts
ok(["Ala"]);   // { status: 200, body: ["Ala"] }   (typ body: string[])
noContent();   // { status: 204, body: null }      (typ body: null)
```
