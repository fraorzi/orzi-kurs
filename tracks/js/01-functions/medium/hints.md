## Hint 1

`sumAll`: parametr rest w sygnaturze — `function sumAll(...nums)` — zbiera wszystkie
argumenty w prawdziwą tablicę. `applyEach`: funkcje z tablicy to zwykłe wartości,
wywołujesz je jak każdą inną: `fn(x)`. `compose2`: ma **zwrócić nową funkcję**
(jak `sum(a)` z zagadnienia o domknięciach — funkcja zwracająca funkcję).

## Hint 2

`sumAll`: na tablicy rest działa `reduce`: `nums.reduce((total, n) => total + n, 0)` —
`0` jako wartość startowa załatwia przypadek bez argumentów.
`applyEach`: `fns.map((fn) => fn(x))`.

## Hint 3

`compose2`: `return (x) => f(g(x));` — wewnętrzna funkcja pamięta `f` i `g`,
a `g(x)` liczy się jako pierwsze, bo jest argumentem `f`.
