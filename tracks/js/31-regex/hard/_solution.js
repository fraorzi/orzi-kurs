export function parseDate(str) {
  const match = str.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/);
  if (!match) {
    return null;
  }
  const { year, month, day } = match.groups;
  return { year: Number(year), month: Number(month), day: Number(day) };
}

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
