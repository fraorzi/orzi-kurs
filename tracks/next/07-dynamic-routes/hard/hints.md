## Hint 1

`generateStaticParams` mapuje każdy wpis na oba pola o nazwach zgodnych z segmentami.

## Hint 2

Type guard może użyć `SUPPORTED_LOCALES.some((locale) => locale === value)`.

## Hint 3

Po `const { locale, slug } = await params` najpierw zawęź locale, potem odczytaj
produkt i wywołaj `notFound()` dla `null`.
