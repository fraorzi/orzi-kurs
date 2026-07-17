# CI, migracje i bezpieczny rollout

## Kontekst

Release obejmuje kod, migrację bazy i kontener. Pipeline ma zatrzymać deploy przed bramkami i opisać healthcheck oraz rollback.

## Decyzje

Kroki mają zależności, migracja jest expand/contract, obraz jest niezmienny, a rollback nie cofa destrukcyjnie już używanych danych.

## Źródła

- [Dokumentacja](https://docs.github.com/en/actions/get-started/quickstart)
- [Dokumentacja](https://docs.docker.com/build/building/best-practices/)

