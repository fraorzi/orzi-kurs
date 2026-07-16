## Hint 1

W `money.js` zacznij od `export function formatMoney(...)`. W `order.js` potrzebujesz
`import { formatMoney } from "./money.js"`.

## Hint 2

Publiczne API w `index.js` może być wyłącznie re-eksportem:

```js
export { formatMoney } from "./money.js";
export { summarizeOrder } from "./order.js";
```
