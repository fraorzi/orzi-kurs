## Hint 1

Kluczowe: `try/catch` musi obejmować `await promise`. Bez `await` odrzucenie przeleci obok
i `catch` nic nie złapie.

## Hint 2

```js
export async function settle(promise) {
  try {
    return { ok: true, value: await promise };
  } catch (error) {
    return { ok: false, error };
  }
}
```
