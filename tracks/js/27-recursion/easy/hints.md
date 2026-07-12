## Hint 1

Każda z funkcji ma przypadek bazowy (warunek stopu) i krok schodzący na mniejszy argument:
- `factorial`: baza `n <= 1 → 1`, krok `n * factorial(n - 1)`.
- `pow`: baza `exp === 0 → 1`, krok `base * pow(base, exp - 1)`.

## Hint 2

```js
export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function pow(base, exp) {
  if (exp === 0) return 1;
  return base * pow(base, exp - 1);
}
```

W `pow` potęgę budujesz mnożeniem w kroku rekurencyjnym — dlatego nie potrzeba `**`
ani `Math.pow`.
