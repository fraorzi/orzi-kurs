## Hint 1

- `parseDate`: `str.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/)`. Gdy `null` →
  zwróć `null`. Inaczej weź `match.groups` i zamień pola na liczby.
- `extractHashtags`: `text.matchAll(/#(?<tag>\w+)/g)` daje iterator dopasowań; dla każdego
  weź `match.groups.tag`, zmniejsz litery i dodawaj do wyniku, pomijając duplikaty (Set).

## Hint 2

```js
export function extractHashtags(text) {
  const seen = new Set();
  const tags = [];
  for (const match of text.matchAll(/#(?<tag>\w+)/g)) {
    const tag = match.groups.tag.toLowerCase();
    if (!seen.has(tag)) {
      seen.add(tag);
      tags.push(tag);
    }
  }
  return tags;
}
```

`#(?<tag>\w+)` — literał `#`, potem nazwana grupa `tag` łapiąca znaki słowa. `matchAll`
(z flagą `g`) zwraca wszystkie dopasowania wraz z grupami.
