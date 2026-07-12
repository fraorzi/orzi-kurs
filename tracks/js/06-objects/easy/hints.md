## Hint 1

`countProps`: `Object.keys(obj).length`. `sumSalaries`: `Object.values` +
`reduce` z wartością startową 0. `renameKey`: destrukturyzacja z dynamicznym
kluczem albo spread + jedno przypisanie + usunięcie starego klucza z KOPII.

## Hint 2

`renameKey` najeleganciej przez destrukturyzację z resztą:

```js
if (!(from in obj)) return { ...obj };
const { [from]: value, ...rest } = obj;
return { ...rest, [to]: value };
```
