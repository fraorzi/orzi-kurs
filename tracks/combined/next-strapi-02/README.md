# Upload Strapi i Next Image

## Kontekst

Frontend wysyła obraz do CMS, ale musi ograniczyć format i rozmiar, a otrzymany asset zamienić na bezpieczny kontrakt `Image`.

## Decyzje

Walidacja jest przed uploadem; wynik używa jawnych width/height/alt oraz zaufanego originu media.

## Źródła

- [Dokumentacja](https://docs.strapi.io/cms/features/media-library)
- [Dokumentacja](https://nextjs.org/docs/app/api-reference/components/image)

