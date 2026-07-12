## Hint 1

`users.findIndex(...)` przechodzi całą tablicę dla każdego elementu — to pętla w pętli,
O(n²). Zamiast pytać „gdzie po raz pierwszy jest ten e-mail", pamiętaj **już widziane**
e-maile w `Set` i przejdź tablicę raz.

## Hint 2

```js
export function uniqueByEmail(users) {
  const seen = new Set();
  const result = [];
  for (const user of users) {
    if (!seen.has(user.email)) {
      seen.add(user.email);
      result.push(user);
    }
  }
  return result;
}
```

Dodajesz do wyniku tylko przy **pierwszym** napotkaniu e-maila — dlatego zostaje pierwsze
wystąpienie i zachowana jest kolejność.
