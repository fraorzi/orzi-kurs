## Hint 1

`extractUser`: destrukturyzacja z defaultem: `const { name, years, isAdmin =
false } = user`. `topSalary`: pętla `for (const [name, salary] of
Object.entries(salaries))` z zapamiętywaniem maksimum. `mergeSettings`: spread
obu obiektów + jawne pole `flags` złożone z obu tablic.

## Hint 2

`topSalary`: startuj z `let top = null; let max = -Infinity`. `mergeSettings`:

```js
const merged = { ...defaults, ...overrides };
if (defaults.flags || overrides.flags) {
  merged.flags = [...(defaults.flags ?? []), ...(overrides.flags ?? [])];
}
return merged;
```

`?? []` zabezpiecza przed spreadem undefined (rzuciłby TypeError), a warunek
pilnuje, żeby nie doklejać `flags: []` do konfiguracji, która flag w ogóle
nie używa.
