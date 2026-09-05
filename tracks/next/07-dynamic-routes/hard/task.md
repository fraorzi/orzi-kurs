# Zbuduj bezpieczną trasę produktu z próbkami statycznymi

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Trasa `app/[locale]/products/[slug]` ma generować próbki dla wyróżnionych produktów,
ale obecny kod zwraca klucz `lang` zamiast `locale` i rzutuje dowolną lokalizację.

Popraw `generateStaticParams`, aby zwracał `{ locale, slug }`. W stronie zaczekaj na
params, sprawdź lokalizację przez `isLocale`, a następnie odczytaj produkt. Dla
nieobsługiwanej lokalizacji i braku produktu wywołaj `notFound()`.
