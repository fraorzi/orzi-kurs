# Webhooki i rewalidacja cache

Strapi 5 wysyła webhook jako zwykłe żądanie HTTP `POST` do skonfigurowanego
URL-a przy zdarzeniach cyklu życia treści (`entry.publish`,
`entry.unpublish`, `entry.update`, `media.create`...). To żądanie **nie
jest podpisane** — nagłówek z sekretem trzeba dodać samodzielnie w
konfiguracji webhooka i zweryfikować po stronie odbiorcy, zanim
jakikolwiek efekt (rewalidacja, powiadomienie) się wykona. Zwykłe `===`
na sekretach jest podatne na atak czasowy: różnica w czasie odpowiedzi
ujawnia, ile początkowych znaków się zgadza — porównanie musi być
stałoczasowe (`node:crypto`'s `timingSafeEqual`), z jawnym strażnikiem
długości przed nim, bo funkcja stałoczasowa wymaga buforów tej samej
długości.

Dostawa webhooka **nie jest gwarantowana dokładnie raz**. Strapi ponawia
próbę po błędzie sieci albo timeout na odbiorcy — ten sam `event.id`
może przyjść dwa razy. Endpoint musi być **idempotentny**: zapamiętać
przetworzone id i pominąć duplikat, a nowy event oznaczyć jako
przetworzony dopiero **po** udanym zakończeniu efektu, nie przed. Jeśli
efekt (np. wywołanie zewnętrznego API rewalidacji) zawodzi przejściowo,
odpowiedni wzorzec to **retry z rosnącym backoff** — kilka prób z
przerwą między nimi, zanim handler odda błąd i pozwoli Strapi ponowić
dostawę na wyższym poziomie.

Sam efekt webhooka — rewalidacja cache frontendu — powinien być
**precyzyjny**, nie globalny. Publikacja jednego artykułu nie powinna
unieważniać całego cache aplikacji; Next.js `revalidateTag` przyjmuje
konkretne tagi (dokument, lista danego locale, kategoria), więc webhook
handler powinien wyznaczyć dokładnie te tagi z payloadu zdarzenia, a nie
wywoływać generyczny `purge-all`.

## Kiedy używać

- Endpoint webhooka, który uruchamia efekt zewnętrzny (rewalidacja,
  powiadomienie, synchronizacja) na podstawie zdarzeń cyklu życia treści.
- Idempotentne przetwarzanie zdarzeń z zewnętrznych systemów w ogóle —
  ten sam wzorzec dotyczy nie tylko Strapi, ale każdego webhooka (Stripe,
  GitHub), który może dostarczyć zdarzenie więcej niż raz.
- Retry z backoff wokół wywołań, które bywają przejściowo zawodne
  (sieć, limit żądań zewnętrznego API), gdy koszt jednej dodatkowej
  próby jest niższy niż koszt utraty zdarzenia.

## Kiedy unikać

- Nie ufaj samej obecności nagłówka z sekretem jako dowodowi autentyczności
  — porównanie musi być jawne i stałoczasowe, nie `Boolean(header)`.
- Nie retry'uj bez ograniczenia liczby prób ani bez backoff — pętla bez
  limitu zamienia przejściowy błąd w blokadę całego przetwarzania kolejki.
- Nie czyść całego cache przy każdej zmianie „dla pewności” — precyzyjne
  tagi kosztują tyle samo pracy co ich wyznaczenie z payloadu, a globalny
  purge niszczy korzyść z cache dla ruchu, który nie dotyczy zmiany.

## Pułapki

- Oznaczenie eventu jako przetworzonego **przed** wywołaniem efektu
  wygląda jak poprawna deduplikacja, ale gubi zdarzenie na zawsze, gdy
  efekt zawiedzie — legalna retry dostawa trafia w `seen` i jest cicho
  odrzucana.
- Porównanie sekretów o różnej długości przez `timingSafeEqual` bez
  wcześniejszego sprawdzenia długości **rzuca błędem** zamiast zwrócić
  `false` — strażnik długości musi być pierwszy.
- Pusty sekret po obu stronach (`received === "" && expected === ""`)
  to zwykle brak konfiguracji, nie poprawna tożsamość — jawne odrzucenie
  tego przypadku zapobiega przypadkowemu „otwarciu” endpointu.
- Tag rewalidacji bez locale unieważnia niewłaściwą wersję listy w
  aplikacji wielojęzycznej — tag listy musi nieść locale zdarzenia.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)
- [Configuring webhooks](https://docs.strapi.io/cms/configurations/webhooks)
- [Node.js: `crypto.timingSafeEqual`](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b)
- [Next.js: `revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
