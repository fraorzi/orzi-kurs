## Hint 1

Jeden wzorzec sticky, który dopasowuje **albo token, albo białe znaki**. Białe znaki wrzuć do
grupy przechwytującej, żeby je rozpoznać i pominąć:

```js
const re = /\d+|[+\-*/()]|(\s+)/y;
```

Gdy `match[1]` jest zdefiniowane, dopasowałeś białe znaki (pomiń); w przeciwnym razie to token.

## Hint 2

Pętla idzie, dopóki `lastIndex` nie dojdzie do końca. Pozycję błędu zapamiętaj **przed**
`exec` (bo nieudany `exec` zeruje `lastIndex`):

```js
while (re.lastIndex < expr.length) {
  const pos = re.lastIndex;
  const match = re.exec(expr);
  if (match === null) {
    throw new SyntaxError(`nieoczekiwany znak na pozycji ${pos}`);
  }
  if (match[1] === undefined) {
    tokens.push(match[0]);
  }
}
```

## Hint 3

Dla `"   "` pętla wejdzie raz, dopasuje białe znaki (`match[1]` zdefiniowane), nic nie doda,
`lastIndex` dojdzie do końca → zwrócisz `[]`. Dla `"1 + @"` po `"1"`, `"+"` i spacjach
`lastIndex` stanie na `4`, `exec` zwróci `null` → rzucisz błąd z pozycją `4` (dlatego
zapamiętujesz `pos` przed `exec`).
