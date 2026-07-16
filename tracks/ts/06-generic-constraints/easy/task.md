# Easy — ograniczenia i domyślne parametry typu

Uzupełnij `starter.ts`.

## 1. `longest<T extends { length: number }>(a: T, b: T): T`

Zwraca dłuższy z argumentów. Przy remisie — pierwszy.

```ts
longest("kot", "pies");       // "pies"   (typ: string)
longest([1, 2], [1, 2, 3]);   // [1,2,3]  (typ: number[])
longest("aa", "bb");          // "aa"     (remis → pierwszy)
longest(10, 100);             // błąd typu: number nie ma pola length
```

## 2. `getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K]`

Odczyt pola. Typ wyniku ma być **typem tego pola**, nie unią wszystkich.

```ts
const user = { name: "Ala", age: 30 };
getProp(user, "name");  // "Ala"  (typ: string, nie string | number)
getProp(user, "wiek");  // błąd typu: nie ma takiego klucza
```

## 3. `ApiResponse<T = null>`

Typ odpowiedzi. Domyślnie ciało jest puste (`null`).

```ts
type Empty = ApiResponse;              // { status: number; body: null }
type Users = ApiResponse<string[]>;    // { status: number; body: string[] }
```

## 4. `ok<T>(body: T): ApiResponse<T>` i `noContent(): ApiResponse`

```ts
ok(["Ala"]);   // { status: 200, body: ["Ala"] }   (typ body: string[])
noContent();   // { status: 204, body: null }      (typ body: null)
```
