## Hint 1

Replacer jest wołany dla każdej wartości. Dla obiektów sprawdzaj `WeakSet` odwiedzonych:
jeśli obiekt już tam jest → zwróć `"[Circular]"`; w przeciwnym razie dodaj go i zwróć bez
zmian, by `stringify` mógł zejść głębiej.

## Hint 2

```js
export function safeStringify(value) {
  const seen = new WeakSet();
  return JSON.stringify(value, (key, val) => {
    if (val !== null && typeof val === "object") {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);
    }
    return val;
  });
}
```

To kanoniczny wzorzec „getCircularReplacer" (MDN). Uwaga: ten sam obiekt użyty dwa razy
niecyklicznie też zostanie oznaczony jako `[Circular]` — to znana granica tej metody.
