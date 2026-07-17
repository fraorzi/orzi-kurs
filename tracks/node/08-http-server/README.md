# Serwer HTTP bez frameworka

## Kiedy

Gdy budujesz małą usługę, healthcheck albo adapter i chcesz rozumieć lifecycle żądania zanim framework ukryje routing, limity i statusy.

## Pułapki

Nieograniczone body prowadzi do wyczerpania pamięci; metoda jest częścią trasy; odpowiedź można zakończyć tylko raz, także po błędzie lub anulowaniu klienta.

## Źródła

- [Node.js 24 API: http](https://nodejs.org/download/release/latest-v24.x/docs/api/http.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
