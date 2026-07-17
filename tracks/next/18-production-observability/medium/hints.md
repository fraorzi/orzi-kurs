## Hint 1

Warunek runtime powinien otaczać sam dynamiczny loader, aby nie importować obu adapterów.

## Hint 2

`new URL(input.url).pathname` odcina query; obiekt wyniku zbuduj przez allow-listę pól.
