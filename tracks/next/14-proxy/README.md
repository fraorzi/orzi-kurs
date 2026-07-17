# Proxy w Next.js 16

`proxy.ts` uruchamia kod przed dopasowaną trasą. W Next.js 16 zastępuje nazwę
`middleware`, ale nadal powinien pozostać cienką warstwą na brzegu aplikacji:
redirectem, rewrite'em, nagłówkiem albo tanim optimistic checkiem cookie.

Projekt ma jeden plik Proxy. `config.matcher` jest analizowany statycznie, dlatego
jego wartości muszą być stałe. Bez matchera kod obejmuje także zasoby statyczne,
optymalizację obrazów i pliki z `public`, co łatwo psuje stronę lub niepotrzebnie
zwiększa koszt każdego requestu.

## Kiedy używać

- Redirect niezalogowanego użytkownika przed renderem chronionej sekcji.
- Rewrite dla eksperymentu, wersji regionalnej albo migracji tras.
- Dodanie małego nagłówka requestu potrzebnego downstream.
- Szybkie odrzucenie na podstawie zweryfikowanego, minimalnego cookie.

## Kiedy unikać

- Wolnych zapytań do bazy i pobierania dużych danych.
- Traktowania Proxy jako jedynej warstwy authorization.
- Logiki domenowej, którą łatwiej testować w DAL, Action lub Route Handler.
- Dużych nagłówków — serwer pośredni może odpowiedzieć `431`.

## Pułapki

- Pozostawienie nazwy `middleware.ts` po migracji do Next.js 16.
- Matcher blokujący `_next/static`, `_next/image` albo metadata files.
- Utrata pierwotnego URL po redirect do logowania.
- Zaufanie samej obecności cookie przy operacji na konkretnym zasobie.
- Założenie, że reguły Proxy ochronią Server Action będący publicznym endpointem.

## Źródła

- <https://nextjs.org/docs/app/api-reference/file-conventions/proxy>
- <https://nextjs.org/docs/app/guides/authentication#optimistic-checks-with-proxy-optional>
- <https://nextjs.org/docs/app/guides/testing/vitest#unit-testing-nextjs-functions>
