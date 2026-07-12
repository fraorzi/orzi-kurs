## Hint 1

Ustal kolejność sprawdzeń zgodnie z regułami z task.md: najpierw para
null/undefined (obie strony nullish → true, jedna → false), potem ten sam
`typeof` → `===`, a dopiero potem konwersje. Po każdej konwersji wywołaj
`looseEq` rekurencyjnie — algorytm sam „dojdzie" do porównania liczb.

## Hint 2

Konwersja obiektu na prymityw (uproszczone ToPrimitive z hintem "default"):

```js
function toPrimitive(obj) {
  const value = obj.valueOf();
  if (typeof value !== "object" && typeof value !== "function") return value;
  return String(obj);
}
```

## Hint 3

Szkielet gałęzi po obsłudze nullish i identycznych typów:

```js
if (typeof a === "boolean") return looseEq(Number(a), b);
if (typeof b === "boolean") return looseEq(a, Number(b));
if (typeof a === "object") return looseEq(toPrimitive(a), b);
if (typeof b === "object") return looseEq(a, toPrimitive(b));
if (typeof a === "number" && typeof b === "string") return a === Number(b);
if (typeof a === "string" && typeof b === "number") return Number(a) === b;
return false;
```
