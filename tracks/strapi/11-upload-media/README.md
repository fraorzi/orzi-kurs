# Upload i Media Library

Media Library w Strapi 5 przyjmuje obrazy, wideo, audio i dokumenty, ale
walidacja bezpieczna opiera się na **rzeczywistym** MIME pliku, nie na
rozszerzeniu ani deklarowanym `Content-Type` — oba pochodzą od klienta
i można je sfałszować. Middleware `strapi::body` (koa-body + formidable)
odpowiada za parsowanie multipart i limity rozmiaru (`formLimit`,
`jsonLimit`, `formidable.maxFileSize`); domyślny limit samego uploadu
(`sizeLimit` w konfiguracji pluginu) to 1 GB, ale endpoint aplikacyjny
zwykle chce dużo ciaśniejszej allow-listy niż to, co przepuści framework.

Kolejność operacji ma znaczenie ekonomiczne i bezpieczeństwa: autoryzacja
**zawsze przed** zapisem pliku — upload nieautoryzowanego żądania to
zmarnowany storage. Gdy plik już trafił na dysk/CDN, ale kolejny krok
(powiązanie z dokumentem, encode, thumbnail) zawiedzie, musisz go usunąć
— inaczej Media Library gromadzi osierocone pliki bez właściciela.

Role z pluginu Users & Permissions (`Public`, `Authenticated`, role
własne) domyślnie **nie mają** żadnych uprawnień — trzeba je jawnie
włączyć w panelu. Rola `Public` nie powinna dziedziczyć szerokich
uprawnień do uploadu tylko dlatego, że rola `Authenticated` je ma.

## Kiedy używać

- Walidacja MIME/rozmiaru: na każdym endpoincie przyjmującym plik, przed
  jakimkolwiek zapisem.
- Sanityzacja nazwy pliku: zawsze, gdy oryginalna nazwa od klienta trafia
  choćby do logów, systemu plików albo URL-a.
- Cleanup po częściowej awarii: gdy upload i powiązanie z encją to dwa
  osobne kroki, które mogą się rozjechać.

## Kiedy unikać

- Nie ufaj rozszerzeniu pliku jako dowodowi formatu — sprawdzaj
  zadeklarowany MIME względem allow-listy, a w produkcji rozważ
  sniffing zawartości.
- Nie wykonuj uploadu przed authz „bo częściej się uda” — to marnowanie
  zasobów przy każdym nieautoryzowanym żądaniu.
- Nie zwiększaj globalnie `sizeLimit`/`formLimit`, gdy tylko jeden
  endpoint potrzebuje większych plików — ustaw limit lokalnie.

## Pułapki

- `image/svg+xml` bywa wektorem XSS (SVG może nieść `<script>`) — jeśli
  nie masz sanitizera SVG, nie dopuszczaj go do allow-listy.
- Diakrytyki i znaki sterujące w nazwie pliku trzeba usunąć **przed**
  zapisaniem na dysku, nie tylko przed wyświetleniem.
- Błąd `upload()` przed uzyskaniem `id` nie ma czego czyścić — cleanup
  dotyczy wyłącznie kroków **po** udanym zapisie pliku.
- Domyślne permissions roli `Public` są wyłączone — brak zachowania
  after-request nie oznacza automatycznie odmowy na poziomie API.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Media Library](https://docs.strapi.io/cms/features/media-library)
- [Middleware configuration: strapi::body](https://docs.strapi.io/cms/configurations/middlewares#body)
- [Users & Permissions](https://docs.strapi.io/cms/features/users-permissions)
