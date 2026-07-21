## Hint 1

Zacznij od `const args = ["--permission"]` i dokładaj flagi pętlami po
`access.read ?? []` i `access.write ?? []`.

## Hint 2

Flagi zdolności to zwykłe `if (access.worker) args.push("--allow-worker")`.

## Hint 3

Zwróć `[...args, entry]` — entry po flagach, bo Node czyta uprawnienia
przed uruchomieniem skryptu.
