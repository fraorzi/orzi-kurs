# [O] Hard — zawęź rewalidację cache

Po każdej edycji artykułu handler unieważnia globalny tag `content`, przez
co CDN wyrzuca cały cache strony przy każdej drobnej zmianie.

Starter jest funkcjonalnie poprawny (unieważnia właściwe rzeczy), ale robi to
zbyt szeroko. Zaimplementuj `solve(documentId, locale, category?)`:

- zwróć precyzyjne tagi: `article:<documentId>`, `articles:<locale>` oraz —
  jeśli podano — `category:<category>:<locale>`;
- **nie** dodawaj globalnego `content`;
- brak kategorii = brak jej tagu.

Bramka `[quality]`: wynik nie zawiera globalnego purge.
