# Hints

## Hint 1

Odmowę authz i walidację wykonaj przed pierwszym efektem ubocznym.

## Hint 2

Zapamiętaj identyfikator uploadu, aby móc wykonać kompensujący cleanup w catch.

## Hint 3

Kolejność sukcesu to update draft → publish → sanitize → webhook. Publiczny body nie powinien zawierać surowego wyniku Document Service.

