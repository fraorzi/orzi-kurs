# Draft & Publish oraz i18n

Draft & Publish daje każdemu dokumentowi dwie równoległe wersje: **draft**
(robocza, widoczna tylko w panelu i w preview) i **published** (publiczna).
Internationalization (i18n) dodaje drugi wymiar niezależności: każdy
`locale` tego samego `documentId` ma **własny** cykl draft/publish.
Publikacja polskiej wersji artykułu nie publikuje automatycznie angielskiej
— redakcja może mieć `pl` opublikowane i `en` wciąż w draft tygodniami.

Te dwa wymiary razem dają trzy stany, w jakich może być dana wersja
językowa dokumentu względem czytelnika: **new** (nigdy niepublikowana),
**published** (draft identyczny z opublikowaną wersją — nic do wglądu),
**modified** (draft rozjechał się z opublikowaną wersją — są niezatwierdzone
zmiany). Panel administracyjny pokazuje ten stan jako badge przy każdej
lokalizacji.

Granica bezpieczeństwa: publiczny endpoint bez jawnego `status: "published"`
odziedziczy domyślne zachowanie Document Service i może zwrócić draft.
Preview (podgląd niepublikowanej treści) wymaga więc świadomej autoryzacji
— sama obecność parametru `preview=true` w URL-u nie wystarcza, musi iść w
parze z rolą uprawnioną do oglądania draftów.

## Kiedy używać

- Endpoint preview dla redakcji: draft widoczny tylko dla zalogowanej roli
  edytorskiej, z jawnym uwierzytelnieniem żądania.
- Planowanie publikacji wielojęzycznej treści: lista locale do publikacji
  ograniczona do tych, które faktycznie istnieją dla danego dokumentu.
- Panel/dashboard redakcyjny pokazujący, które lokalizacje mają
  niepublikowane zmiany (`modified`) i wymagają uwagi.

## Kiedy unikać

- Nie traktuj parametru `preview`/`draft` z query stringa jako
  wystarczającej autoryzacji — musi być powiązany z uwierzytelnioną rolą,
  inaczej każdy zgadnie `?preview=true`.
- Nie publikuj `*` (wszystkich locale) jako domyślnej ścieżki w kodzie
  wywoływanym automatycznie — wildcard powinien być jawną, świadomą
  decyzją redaktora, nie fallbackiem.
- Nie licz stanu workflow dokumentu z samego faktu istnienia rekordu
  published — porównuj rzeczywistą treść draftu i published w danym
  locale.

## Pułapki

- Publikacja jednej lokalizacji nie publikuje pozostałych — brak
  odpowiedniego `published` dla `en`, gdy opublikowano tylko `pl`, to
  normalny stan, nie błąd.
- Publiczny endpoint bez jawnego `status: "published"` może odziedziczyć
  domyślne zachowanie Document Service (odczyt draftu).
- `*` w liście lokalizacji do publikacji nie jest zwykłą wartością do
  przefiltrowania przez listę istniejących locale — to osobna, wyłączna
  gałąź logiki.
- Stan `modified` wymaga porównania treści, nie samej obecności wersji
  published — dokument może mieć published i wciąż być identyczny z
  draftem (żadnych niezatwierdzonych zmian).

## Źródła (audyt 2026-07-20, Strapi 5)

- [Draft & Publish](https://docs.strapi.io/cms/features/draft-and-publish)
- [Internationalization (i18n)](https://docs.strapi.io/cms/features/internationalization)
- [Document Service — status](https://docs.strapi.io/cms/api/document-service/status)
