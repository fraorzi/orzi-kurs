## Hint 1

- `deepClone`: to jednolinijkowiec — `return structuredClone(value)`. Wbudowana funkcja
  robi głęboką kopię i zachowuje typy (`Date`, `Map`, `Set`).
- `setIn`: rekurencja. Warunek bazowy: pusta ścieżka → zwróć nową wartość. Inaczej: skopiuj
  bieżący poziom spreadem i zejdź głębiej dla pierwszego klucza ścieżki.

## Hint 2

```js
export function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [key, ...rest] = path;
  return { ...obj, [key]: setIn(obj[key], rest, value) };
}
```

Każde wywołanie kopiuje **jeden** poziom (`{ ...obj }`) i podmienia tylko klucz z bieżącego
kroku ścieżki — dzięki temu gałęzie poza ścieżką pozostają współdzielone, a oryginał
nietknięty.
