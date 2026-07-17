# Kryptografia i sekrety

## Kiedy

Gdy generujesz tokeny, porównujesz podpisy albo przechowujesz pochodne sekretów z użyciem prymitywów platformy zamiast domowej kryptografii.

## Pułapki

`Math.random` nie jest CSPRNG; zwykłe `===` ujawnia timing; hash bez losowej soli i kosztu nie nadaje się do haseł.

## Źródła

- [Node.js 24 API: crypto](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
