# Medium — normalizuj powtarzalne komponenty

Redaktor edytuje FAQ jako repeatable komponent w panelu; zanim treść
trafi na stronę, warstwa odczytu musi ją oczyścić z artefaktów edycji.
Zaimplementuj `solve(items)`:

- usuń techniczne `id` nadane przez Strapi każdemu elementowi komponentu —
  nie jest częścią modelu domenowego;
- przytnij białe znaki z `question` i `answer`;
- odrzuć element, którego `question` **lub** `answer` po przycięciu jest
  puste — pół-wypełniony wpis nie trafia na stronę;
- zachowaj kolejność pozostałych elementów taką, jak w wejściu.
