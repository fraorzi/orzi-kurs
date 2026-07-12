## Hint 1

Klucz: **nie** licz `parseFloat(str) * 100` (float gubi grosze, np. `19.99 * 100`).
Operuj na częściach stringa i liczbach całkowitych.

- `parseMoney`: rozdziel `str.split(".")` na złote i grosze; grosze uzupełnij do 2 cyfr
  (`(frac + "00").slice(0, 2)`); zwróć `Number(whole) * 100 + Number(cents)`.
- `formatMoney`: `whole = Math.floor(cents / 100)`, `rem = cents % 100` wyrównane do 2 cyfr.

## Hint 2

```js
export function parseMoney(str) {
  const [whole, frac = ""] = str.split(".");
  const cents = (frac + "00").slice(0, 2);
  return Number(whole) * 100 + Number(cents);
}

export function formatMoney(cents) {
  const whole = Math.floor(cents / 100);
  const rem = cents % 100;
  return `${whole}.${String(rem).padStart(2, "0")}`;
}
```
